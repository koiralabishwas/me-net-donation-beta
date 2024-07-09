import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
// template
import License from "./License";
import jsPDF from "jspdf";
import { Button } from "../components/ui/button";

const Certificate = () => {
  const [download, setDownload] = useState();
  const [generateCertificated, setGenerateCertificated] = useState();
  const licenseCirtificatedRef = useRef(null);

  const handleGeneratePdf = async () => {
    const inputData = licenseCirtificatedRef.current;
    try {
      const canvas = await html2canvas(inputData!);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("certificate.pdf");
    } catch (error) {}
  };
  return (
    <div >
      <div className="text-center box-content table-fixed">
        <Button className="m-4" onClick={() => handleGeneratePdf()}>
          Download PDF
        </Button>
      </div>
      <p className=" justify-center flex text-center text-3xl">寄付控除証明書</p>
      <div ref={licenseCirtificatedRef} className="box-content table-fixed fixed bg-fixed p-4">
        <License />
      </div>
    </div>
  );
};

export default Certificate;
