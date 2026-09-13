import { Suspense } from "react";
import SearchFormContent from "./SearchFormContent";

function SearchFormSkeleton() {
  return (
    <div
      style={{
        height: 72,
        width: "100%",
        borderRadius: 12,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
      }}
      aria-label="در حال بارگذاری جستجو..."
    />
  );
}

export default function SearchForm() {
  return (
    <Suspense fallback={<SearchFormSkeleton />}>
      <SearchFormContent />
    </Suspense>
  );
}


 


 


 
 