"use client";

import { sessionKey } from "@/api";
import { signUp } from "@/api/auth";
import CustomInput from "@/components/base/customInput";
import Loading from "@/components/Loading";
import { Button } from "@mui/material";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Register({ clientID, number }: { clientID: string; number: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      phone_number: number,
    },
    onSubmit: (values) => {
      setLoading(true);

      signUp(values, clientID)
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
      {error && <>{error}</>}
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
      <CustomInput
        label="تکرار رمز عبور"
        name="passwordConfirm"
        type="password"
        value={values.passwordConfirm}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" fullWidth disabled={loading}>
        {loading ? <Loading /> : <> تایید </>}
      </Button>
    </form>
  );
}

export default Register;
