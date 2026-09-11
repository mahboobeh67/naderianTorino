"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./FQA.module.css";

const faqData = [
  {
    question: "چند روز قبل از پرواز بلیط هواپیما بخرم؟",
    answer: "بهتر است ۱ تا ۲ هفته قبل از پرواز بلیط تهیه کنید تا قیمت مناسب‌تری داشته باشید."
  },
  {
    question: "چطور می‌توانم استرداد بلیط انجام بدهم؟",
    answer: "از طریق پنل کاربری و بخش سفرهای من می‌توانید درخواست استرداد ثبت کنید."
  },
  {
    question: "نرخ بلیط هواپیما برای نوزادان و کودکان زیر ۱۲ سال چقدر است؟",
    answer: "نرخ بلیط کودکان و نوزادان بسته به ایرلاین متفاوت است."
  },
  {
    question: "چگونه می‌توانم مدل هواپیما را متوجه شوم؟",
    answer: "در اطلاعات پرواز هنگام خرید بلیط مدل هواپیما نمایش داده می‌شود."
  },
  {
    question: "بعد از خرید بلیط پرواز داخلی از مبدا تهران به کدام فرودگاه برویم؟",
    answer: "بیشتر پروازهای داخلی از فرودگاه مهرآباد انجام می‌شوند."
  },
  {
    question: "آیا خرید آنلاین بلیط هواپیما هزینه بیشتری نسبت به خرید حضوری دارد؟",
    answer: "خیر، معمولاً خرید آنلاین حتی ارزان‌تر نیز هست."
  },
  {
    question: "بعد از تکمیل مراحل خرید، بلیط چگونه به دست من می‌رسد؟",
    answer: "بلیط به صورت الکترونیکی صادر و از طریق ایمیل یا پنل کاربری در دسترس قرار می‌گیرد."
  },
  {
    question: "شرایط پذیرش مسافران ویلچری در هنگام پرواز چیست؟",
    answer: "باید هنگام خرید بلیط درخواست خدمات ویلچر ثبت شود."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className={styles.pageWrapper}>
      {/* تیتر و توضیحات بخش سوالات متداول */}
      <div className={styles.headerWrapper}>
       
        <p className={styles.subTitle}>
          پاسخ پرتکرارترین سوالات شما درباره رزرو پرواز و خدمات سفر
        </p>
      </div>

      {/* لیست آکاردئون */}
      <div className={styles.container}>
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className={styles.item}>
              <button
                onClick={() => toggle(index)}
                className={styles.button}
                type="button"
                aria-expanded={isOpen}
              >
                <span className={styles.questionTitle}>{item.question}</span>

                <ChevronDown
                  className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                  size={20}
                />
              </button>

              <div
                className={`${styles.contentWrapper} ${
                  isOpen ? styles.contentWrapperOpen : ""
                }`}
              >
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}


