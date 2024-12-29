"use client";

import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

export default function CustomInput({
  label,
  value,
  onChange,
  name,
  type,
}: {
  value?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  type?: string;
}) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      value={value || ""}
      onChange={onChange}
      name={name}
      type={type}
    />
  );
}
