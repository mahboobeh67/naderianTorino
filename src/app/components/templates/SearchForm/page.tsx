"use client";

import { useEffect, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "zaman";
import { useRouter } from "next/navigation";
import QueryString from "qs";

import { useGetTours } from "../../../core/services/queries";
import { flattenObject } from "../../../core/utils/helper";
import useQuery from "../../../core/hooks/query";
import styles from "./SearchForm.module.css";


import { FiMapPin, FiCalendar } from "react-icons/fi";
import Image from "next/image";

const CITIES = [
  { id: "1", name: "تهران" },
  { id: "2", name: "سنندج" },
];

function SearchForm() {
  const [query, setQuery] = useState();
  const [openOriginDropdown, setOpenOriginDropdown] = useState(false);
  const [openDestDropdown, setOpenDestDropdown] = useState(false);

  const router = useRouter();
  const { handleSubmit, control, reset, setValue, watch } = useForm();
  const { getQuery } = useQuery();

  const selectedOriginId = watch("originId");
  const selectedDestId = watch("destinationId");

  const { isPending, data, refetch } = useGetTours(query);

  useEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");
    if (originId && destinationId) reset({ originId, destinationId });
  }, []);

  const submitHandler = (data: any) => {
    const query = QueryString.stringify(flattenObject(data));
    router.push(`/?${query}`);
  };

  const getCityName = (id: string) => {
    return CITIES.find((city) => city.id === id)?.name;
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit(submitHandler)}>
      {/* فیلد مبدا */}
      <div className={styles.field}>
        <button
          type="button"
          className={styles.fieldBtn}
          onClick={() => {
            setOpenOriginDropdown((prev) => !prev);
            setOpenDestDropdown(false);
          }}
        >
          <Image src="/images/location.png" alt="location" width={20} height={20}/>
          
          <span
            className={
              selectedOriginId ? styles.activeText : styles.placeholderText
            }
          >
            {selectedOriginId ? getCityName(selectedOriginId) : "مبدا"}
          </span>
        </button>

        {openOriginDropdown && (
          <ul className={styles.dropdown}>
            {CITIES.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setValue("originId", city.id);
                  setOpenOriginDropdown(false);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* فیلد مقصد */}
      <div className={styles.field}>
        <button
          type="button"
          className={styles.fieldBtn}
          onClick={() => {
            setOpenDestDropdown((prev) => !prev);
            setOpenOriginDropdown(false);
          }}
        >
           <Image src="/images/global-search.svg" alt="location" width={20} height={20}/>
          
          <span
            className={
              selectedDestId ? styles.activeText : styles.placeholderText
            }
          >
            {selectedDestId ? getCityName(selectedDestId) : "مقصد"}
          </span>
        </button>

        {openDestDropdown && (
          <ul className={styles.dropdown}>
            {CITIES.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setValue("destinationId", city.id);
                  setOpenDestDropdown(false);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.divider}></div>

      {/* فیلد تاریخ (Zaman) */}
      <div className={styles.field}>
         <Image src="/images/calendar.svg" alt="location" width={20} height={20}/>
<span>تاریخ</span>
        <div className={styles.datePickerContainer}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              <DatePicker
                range
                round="x2"
                inputClass={styles.zamanInput}
                onChange={(e) => onChange({ startDate: e.from, endDate: e.to })}
              />
            )}
          />
        </div>
      </div>

      {/* دکمه جستجو */}
      <button type="submit" className={styles.searchBtn}>
        جستجو
      </button>
    </form>
  );
}

export default SearchForm;
