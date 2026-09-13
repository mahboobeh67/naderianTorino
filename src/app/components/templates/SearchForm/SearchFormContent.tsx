"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "zaman";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import Image from "next/image";

import { useGetTours } from "../../../core/services/queries";
import { flattenObject } from "../../../core/utils/helper";
import useQuery from "../../../core/hooks/query";
import styles from "./SearchForm.module.css";

interface City {
  id: string;
  name: string;
}

interface SearchFormValues {
  originId?: string;
  destinationId?: string;
  date?: {
    startDate?: Date | string;
    endDate?: Date | string;
  };
}

interface ZamanChangeEvent {
  from?: Date | string;
  to?: Date | string;
}

const CITIES: City[] = [
  { id: "1", name: "تهران" },
  { id: "2", name: "سنندج" },
];

function SearchForm() {
  const [query, setQuery] = useState<Record<string, unknown> | undefined>();
  const [openOriginDropdown, setOpenOriginDropdown] = useState<boolean>(false);
  const [openDestDropdown, setOpenDestDropdown] = useState<boolean>(false);

  const router = useRouter();
  const { handleSubmit, control, reset, setValue, watch } = useForm<SearchFormValues>();
  const { getQuery } = useQuery();

  const selectedOriginId = watch("originId");
  const selectedDestId = watch("destinationId");

  const { isPending, data, refetch } = useGetTours(query);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useEffect(() => {
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");
    if (originId && destinationId) reset({ originId, destinationId });
  }, [getQuery, reset]);

  const submitHandler = (formData: SearchFormValues): void => {
    const flattened = flattenObject(formData as Record<string, any>);
    const queryString = QueryString.stringify(flattened);
    router.push(`/?${queryString}`);
  };

  const getCityName = (id: string): string | undefined => {
    return CITIES.find((city: City) => city.id === id)?.name;
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
          <Image src="/images/location.png" alt="location" width={20} height={20} />
          
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
            {CITIES.map((city: City) => (
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
          <Image src="/images/global-search.svg" alt="location" width={20} height={20} />
          
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
            {CITIES.map((city: City) => (
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
        <Image src="/images/calendar.svg" alt="calendar" width={20} height={20} />
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
                onChange={(e: ZamanChangeEvent) =>
                  onChange({ startDate: e.from, endDate: e.to })
                }
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


