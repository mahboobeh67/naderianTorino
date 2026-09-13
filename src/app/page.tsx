import Image from "next/image";
import SearchFormContent from "./components/templates/SearchForm/SearchFormContent";
import TourList from "./components/templates/TourList/page";
import { serverFetch } from "./core/services/http";
import WhyTorino from "./why-torino/page";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Home({ searchParams }: PageProps) {
  const data = await serverFetch("/tour", await searchParams, {
    cache: "no-store",
  });

  return (
    <div>
      <Image
        src="/images/fly.png"
        alt="بنر تورینو"
        width={1440}
        height={350}
        className="w-full h-auto"
        priority
      />
      {/* <div className="text-center w-600 text-color-{#595959}"> */}

      <div className="text-center w[600px] text-[#595959]">
        <h1>
          <span className="text-[#28A745]">تورینو</span> برگزار کننده بهترین تور
          های داخلی و خارجی
        </h1>
      </div>

      <SearchFormContent />
      <TourList toursData={data} />
      <WhyTorino />
    </div>
  );
}
