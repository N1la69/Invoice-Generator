import { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import { templateComponents } from "../util/invoiceTemplates";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
  const formattedData = formatInvoiceData(invoiceData);

  const SelectedTemplate =
    templateComponents[template] || templateComponents["template1"];

  return (
    <div ref={ref} className="container p-2 overflow-x-auto">
      <SelectedTemplate data={formattedData} />
    </div>
  );
});

export default InvoicePreview;
