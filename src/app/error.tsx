"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
  
    console.error("Server connection error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        <div className={styles.imageWrapper}>
          <Image
            src="/images/Error Lamp Robot.png" 
            alt="اتصال با سرور برقرار نیست"
            width={380}
            height={300}
            priority
            unoptimized
          />
        </div>

      
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>اتصال با سرور برقرار نیست!</h1>
          <p className={styles.subtitle}>لطفا بعدا دوباره امتحان کنید.</p>
          
          <button onClick={() => reset()} className={styles.retryButton}>
            تلاش مجدد
          </button>
        </div>
      </div>
    </div>
  );
}
