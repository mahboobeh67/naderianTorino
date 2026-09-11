"use client";

import toast from "react-hot-toast";
import { useAddToBasket } from "../../../core/services/mutations";
import { useRouter } from "next/navigation";
import styles from "./ReserveButton.module.css";


function ReserveButton({ id }: { id: string }) {
  const { isPending, mutate } = useAddToBasket();
  const router = useRouter();

  const cartHandler = () => {
    if (isPending) return;

    mutate(id, {
      onSuccess: (data) => {
        toast.success(data?.data?.message || "تور با موفقیت رزرو شد!");
        router.push("/checkout");
      },
      onError: (error: any) => {
        console.error(error);
        toast.error("خطا در رزرو تور، دوباره تلاش کنید.");
      },
    });
  };

  return (
    
    <button 
      onClick={cartHandler} 
      disabled={isPending}
      className={styles.reserveBtn}
    >
      {isPending ? "در حال ثبت..." : "خرید و ثبت نام در تور"}
    </button>
    
   
    
  );
}

export default ReserveButton;

