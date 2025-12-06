import { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1/template1";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
  const fromattedData = formatInvoiceData(invoiceData);

  return (
    <div ref={ref} className="container p-2 overflow-x-auto">
      <Template1 data={fromattedData} />
    </div>
  );
});

export default InvoicePreview;
