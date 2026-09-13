"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import styles from "./Profile.module.css";
import {
  getProfile,
  updateProfile,
  UserProfile,
} from "../core/services/profile.service";

import AccountInfoCard from "./AccountInfoCard";
import PersonalInfoCard from "./PersonalInfoCard";
import BankInfoCard from "./BankInfoCard";

interface ApiErrorResponse {
  message?: string;
}

export default function ProfilePage(): React.JSX.Element | null {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data: UserProfile = await getProfile();
      setProfile(data);
    } catch (err: unknown) {
      console.error("خطا در دریافت پروفایل:", err);

      let errorMsg = "خطا در برقراری ارتباط با سرور";
      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ApiErrorResponse;
        if (errorData.message) {
          errorMsg = errorData.message;
        }
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProfileData();
  }, []);

  const handleUpdate = async (payload: Partial<UserProfile>): Promise<void> => {
    try {
      await updateProfile(payload);
      await fetchProfileData();
    } catch (err: unknown) {
      let errorMsg = "خطا در ثبت اطلاعات در سرور";
      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ApiErrorResponse;
        if (errorData.message) {
          errorMsg = errorData.message;
        }
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      alert(errorMsg);
      throw err;
    }
  };

  if (loading) {
    return (
      <div
        className={styles.layoutContainer}
        style={{ justifyContent: "center", padding: "4rem 0" }}
      >
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.layoutContainer}>
        <div style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
          <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>
          <button
            type="button"
            onClick={(): void => {
              void fetchProfileData();
            }}
            className={styles.saveBtn}
            style={{ margin: "0 auto" }}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={styles.layoutContainer}>
      <main className={styles.mainContent}>
        <AccountInfoCard profile={profile} onUpdate={handleUpdate} />
        <PersonalInfoCard profile={profile} onUpdate={handleUpdate} />
        <BankInfoCard profile={profile} onUpdate={handleUpdate} />
      </main>
    </div>
  );
}

