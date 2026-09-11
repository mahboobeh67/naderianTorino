// import Link from "next/link";

// function TourList({ toursData }) {
//   if (!toursData) return <p>نتجه ای وجود ندارد</p>;

//   return (
//     <main>
//       {toursData?.map((tour) => (
//         <section key={tour?.id}>
//           <h2>{tour?.title}</h2>
//           <Link href={`/tours/${tour?.id}`}>رزرو</Link>
//         </section>
//       ))}
//     </main>
//   );
// }

// export default TourList;
import TourCard from "../../TourCard"; // یا 


import styles from "./TourList.module.css";

function TourList({ toursData }: { toursData: any }) {
  const tours = Array.isArray(toursData) ? toursData : toursData?.data || [];

  if (!tours || tours.length === 0) {
    return <div className={styles.empty}>نتیجه‌ای وجود ندارد</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>همه تور ها</h2>
      <main className={styles.grid}>
        {tours.map((tour: any) => (
          <TourCard key={tour.id || tour._id} tour={tour} />
        ))}
      </main>
    </div>
  );
}

export default TourList;
