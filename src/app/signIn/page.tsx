"use client";

import CustomInput from "@/components/customInput";
import { Button } from "@mui/material";

export default function SignIn() {
  return (
    <>
      <CustomInput label="نام کاربری" />
      <CustomInput label="رمز عبور" />
      <Button variant="contained">ورود به حساب کاربری</Button>
    </>
  );
}
