'use client'
import { PDFDownloadLink } from "@react-pdf/renderer";
import DonationCertificate from "./DonationCertificate";

const DownloadBillingTable= () => (
  <div>
    <PDFDownloadLink document={<DonationCertificate />} fileName="billing_table.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'PDFをダウンロード'
      }
    </PDFDownloadLink>
  </div>
);

export default DownloadBillingTable;