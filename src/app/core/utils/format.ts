// تبدیل عدد به فارسی
export const toPersianNumber = (value: number | string) => {
  return new Intl.NumberFormat("fa-IR").format(Number(value));
};


// فرمت قیمت
export const formatPrice = (price: number) => {
  if (!price) return "۰";
  return new Intl.NumberFormat("fa-IR").format(price);
};


// تبدیل تاریخ میلادی به شمسی
export const formatDate = (date: string) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};


// تاریخ + ساعت
export const formatDateTime = (date: string) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};
export function getDuration(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diff = end.getTime() - start.getTime()

  const days = diff / (1000 * 60 * 60 * 24)

  return days
}
type VehicleType =
  | "Bus"
  | "Van"
  | "SUV"
  | "Airplane"
  | "Train"

export function getVehicleFa(vehicle: VehicleType) {

  const map: Record<VehicleType, string> = {
    Bus: "اتوبوس",
    Van: "ون",
    SUV: "شاسی بلند",
    Airplane: "هواپیما",
    Train: "قطار"
  }

  return map[vehicle]
}



