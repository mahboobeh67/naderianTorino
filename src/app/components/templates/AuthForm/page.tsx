"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import ModalContainer from "../../../components/partials/containers/page";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useGetUserData } from "../../../core/services/queries";
import styles from "./AuthForm.module.css";
import UserDropdown from "../../UserDropdown";

function AuthForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  const { data, isPending } = useGetUserData();

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
  };

  // اگر کاربر لاگین بود، فقط و فقط UserDropdown نمایش داده شود (بدون Link اضافی)
  if (data?.data) {
    return <UserDropdown mobile={data.data.mobile} />;
  }

  return (
    <div>
      {isPending ? (
        <div className={styles.skeleton}></div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.loginButton}
        >
          <FaUser className={styles.loginIcon} />
          <span>ورود | ثبت‌نام</span>
        </button>
      )}

      <ModalContainer isOpen={isOpen} onClose={closeModal}>
        {step === 1 ? (
          <SendOTPForm
            mobile={mobile}
            setMobile={setMobile}
            setStep={setStep}
            onClose={closeModal}
          />
        ) : (
          <CheckOTPForm
            mobile={mobile}
            setStep={setStep}
            setIsOpen={setIsOpen}
          />
        )}
      </ModalContainer>
    </div>
  );
}

export default AuthForm;

