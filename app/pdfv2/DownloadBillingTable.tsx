import { PDFDownloadLink } from "@react-pdf/renderer";
import { BillingTable } from "./BillingTable";

const DownloadBillingTable= () => (
  <div>
    <PDFDownloadLink document={<BillingTable />} fileName="billing_table.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'PDFをダウンロード'
      }
    </PDFDownloadLink>
  </div>
);

export default DownloadBillingTable;