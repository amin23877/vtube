"use client";

import { sessionKey } from "@/api";
import { login } from "@/api/auth";
import CustomInput from "@/components/customInput";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);

      login(values.username, values.password)
        .then(async (res) => {
          if (res.access_token) {
            await setCookie(sessionKey, res.access_token);
            router.push("/");
          }
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
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 items-center"
      >
        {error && <>نام کاربری یا رمز عبور اشتباه است</>}
        <CustomInput
          label="نام کاربری"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <CustomInput
          label="رمز عبور"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" fullWidth disabled={loading}>
          {loading ? <Loading /> : <>ورود به حساب کاربری</>}
        </Button>
      </form>
    </>
  );
}
