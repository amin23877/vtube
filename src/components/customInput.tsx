"use client";

import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

export default function CustomInput({
  label,
  value,
  onChange,
}: {
  value?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value || undefined}
      onChange={onChange}
    />
  );
}
