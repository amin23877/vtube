"use client";
import { Dispatch, SetStateAction, useState } from "react";
import CustomInput from "@/components/base/customInput";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { sendCode } from "@/api/auth";

function PhoneNumber({
  setNumber,
  setStep,
}: {
  setNumber: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: (values) => {
      setLoading(true);

      sendCode(values.phoneNumber)
        .then(() => {
          setStep(1);
          setNumber(values.phoneNumber);
        })
        .catch((e) => {
          setError(e?.data?.details);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
      {error && <>{error}</>}
      <CustomInput
        label="شماره همراه"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
      />

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

export default PhoneNumber;
