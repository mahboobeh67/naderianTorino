"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import styles from "./Profile.module.css";
import { getProfile, updateProfile, UserProfile } from "../core/services/profile.service";

// ایمپورت ۳ ماژول
import AccountInfoCard from "./AccountInfoCard";
import PersonalInfoCard from "./PersonalInfoCard";
import BankInfoCard from "./BankInfoCard";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfile();
      setProfile(data);
    } catch (err: any) {
      console.error("خطا در دریافت پروفایل:", err);
      setError(err?.response?.data?.message || "خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdate = async (payload: Partial<UserProfile>) => {
    try {
      await updateProfile(payload);
      await fetchProfileData(); 
    } catch (err: any) {
      alert(err?.response?.data?.message || "خطا در ثبت اطلاعات در سرور");
      throw err;
    }
  };

  if (loading) {
    return (
      <div className={styles.layoutContainer} style={{ justifyContent: "center", padding: "4rem 0" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.layoutContainer}>
        <div style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
          <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>
          <button onClick={fetchProfileData} className={styles.saveBtn} style={{ margin: "0 auto" }}>
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
