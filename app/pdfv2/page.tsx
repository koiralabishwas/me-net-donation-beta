"use client";
import React from "react";
import dynamic from "next/dynamic";
import DonationCertificate from "./DonationCertificate";

// import pdfViewer to render only in client side
// SSR is not supported and leads to error
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <PDFViewer width="100%" height="100%" style={{ margin: 0 }}>
        <DonationCertificate />
      </PDFViewer>
    </div>
  );
};

export default page;
