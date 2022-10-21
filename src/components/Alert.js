import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Alert() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
  );
}
