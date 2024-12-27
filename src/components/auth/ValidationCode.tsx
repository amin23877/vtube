"use client";

import { sendCode, validateCode } from "@/api/auth";
import CustomInput from "@/components/customInput";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function ValidationCode({
  number,
  setStep,
  setClientID,
}: {
  number: string;
  setStep: Dispatch<SetStateAction<number>>;
  setClientID: Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      phone_number: number,
      code: "",
    },
    onSubmit: (values) => {
      setLoading(true);

      validateCode(values)
        .then((res) => {
          setClientID(res.client_id);
          setStep(2);
        })
        .catch((e) => {
          setError(e?.data?.details);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleSendAgain = async () => {
    setCanResend(false);
    setTimer(120);
    await sendCode(number);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
      {error && <>{error}</>}
      <>کد به شماره {number} ارسال شد</>
      <CustomInput
        label="کد تایید"
        name="code"
        value={values.code}
        onChange={handleChange}
      />

      <div>
        کد را دریافت نکردید؟{" "}
        {canResend ? (
          <span
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
            onClick={handleSendAgain}
          >
            ارسال مجدد
          </span>
        ) : (
          <> {timer} ثانیه صبر کنید</>
        )}
      </div>

      <Button variant="contained" type="submit" fullWidth disabled={loading}>
        {loading ? <Loading /> : <>تایید</>}
      </Button>
      <Link
        href="/signIn"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        بازگشت به صفحه ورود
      </Link>
    </form>
  );
}

export default ValidationCode;
