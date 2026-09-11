"use client";

import { Plane, MapPin, ShieldCheck, Headphones } from "lucide-react";
import Image from "next/image";

export default function TourismLanding() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-10 z px-4 rounded-2xl max-w-[720px] m-auto mt-2">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl font-bold mb-6">
            با تورینو دنیا را راحت‌تر کشف کنید
          </h1>

          <p className="max-w-2xl mx-auto mb-8 text-lg">
            رزرو بلیط، تورهای گردشگری و برنامه‌ریزی سفر در یک پلتفرم ساده و مطمئن
          </p>

          <button className="bg-white text-green-600 px-7 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            شروع سفر
          </button>

        </div>
      </section>


      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-2xl font-bold text-center mb-12">
          خدمات گردشگری تورینو
        </h2>

        <div className="grid md:grid-cols-3 gap-8 ">

          <div className="border rounded-xl p-6 border-none shadow-2xl text-center hover:shadow-lg transition">
            <Plane className="mx-auto text-green-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">رزرو بلیط</h3>
            <p className="text-gray-600 text-sm">
              خرید سریع بلیط هواپیما برای مسیرهای داخلی و خارجی
            </p>
          </div>

          <div className="border rounded-xl p-6 border-none shadow-2xl text-center hover:shadow-lg transition">
            <MapPin className="mx-auto text-green-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">تورهای گردشگری</h3>
            <p className="text-gray-600 text-sm">
              تورهای متنوع داخلی و خارجی با بهترین برنامه سفر
            </p>
          </div>

          <div className="border rounded-xl p-6 border-none shadow-2xl text-center hover:shadow-lg transition">
            <Headphones className="mx-auto text-green-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">پشتیبانی سفر</h3>
            <p className="text-gray-600 text-sm">
              تیم پشتیبانی تورینو در تمام مراحل سفر همراه شماست
            </p>
          </div>

        </div>

      </section>


      {/* WHY US */}
      <section className="bg-gray-50 py-16 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-bold text-center mb-12">
            چرا تورینو؟
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <ShieldCheck className="mx-auto text-green-600 mb-3" size={30} />
              <h3 className="font-bold mb-2">رزرو مطمئن</h3>
              <p className="text-gray-600 text-sm">
                پرداخت امن و تضمین کیفیت خدمات گردشگری
              </p>
            </div>

            <div>
              <Plane className="mx-auto text-green-600 mb-3" size={30} />
              <h3 className="font-bold mb-2">تنوع مقصد</h3>
              <p className="text-gray-600 text-sm">
                دسترسی به مقصدهای متنوع داخلی و خارجی
              </p>
            </div>

            <div>
              <Headphones className="mx-auto text-green-600 mb-3" size={30} />
              <h3 className="font-bold mb-2">پشتیبانی سریع</h3>
              <p className="text-gray-600 text-sm">
                پاسخگویی سریع تیم پشتیبانی در هر زمان
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* DESTINATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-2xl font-bold text-center mb-12">
          مقاصد محبوب
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
             <Image
              src="/images/gheshm.jpg"
              alt="kish"
              width={400}
              height={400}
              className="h-48 w-full object-cover"
            ></Image>
            <div className="p-4">
              <h3 className="font-bold">استانبول</h3>
              <p className="text-sm text-gray-600">تورهای ویژه استانبول</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <Image
              src="/images/dobay.jpg"
              alt="kish"
              width={400}
              height={400}
              className="h-48 w-full object-cover"
            ></Image>
            <div className="p-4">
              <h3 className="font-bold">دبی</h3>
              <p className="text-sm text-gray-600">تورهای جذاب دبی</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src="/images/kish.jpg"
              alt="kish"
              width={400}
              height={400}
              className="h-48 w-full object-cover"
            ></Image>
            <div className="p-4">
              <h3 className="font-bold">کیش</h3>
              <p className="text-sm text-gray-600">تورهای داخلی کیش</p>
            </div>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-green-600 text-white py-8 px-3 text-center rounded-2xl max-w-[720px] m-auto mb-2">

        <h2 className="text-2xl font-bold mb-4">
          سفر بعدی خود را با تورینو شروع کنید
        </h2>

        <p className="mb-6">
          بهترین تورها و خدمات گردشگری در یک پلتفرم ساده
        </p>

        <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
          مشاهده تورها
        </button>

      </section>

    </div>
  );
}
