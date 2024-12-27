"use client";
import PhoneNumber from "@/components/auth/PhoneNumber";
import Register from "@/components/auth/Register";
import ValidationCode from "@/components/auth/ValidationCode";
import { useState } from "react";

function SignUp() {
  const [step, setStep] = useState(0);
  const [number, setNumber] = useState("");
  const [clientID, setClientID] = useState("");

  return (
    <>
      {step === 0 && <PhoneNumber setNumber={setNumber} setStep={setStep} />}
      {step === 1 && (
        <ValidationCode
          number={number}
          setStep={setStep}
          setClientID={setClientID}
        />
      )}
      {step === 2 && <Register number={number} clientID={clientID} />}
    </>
  );
}

export default SignUp;
