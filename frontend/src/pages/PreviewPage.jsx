import { useContext, useRef, useState } from "react";
import { templates } from "../assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { deleteInvoice, saveInvoice } from "../service/InvoiceService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { uploadInvoiceThumbnail } from "../service/CloudinaryService";

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, invoiceData, baseUrl } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveAndExit = async () => {
    try {
      setLoading(true);

      if (!previewRef.current) {
        throw new Error("Preview element not found");
      }

      const imgData = await toPng(previewRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });
      const thumbnailUrl = await uploadInvoiceThumbnail(imgData);

      const payload = {
        ...invoiceData,
        thumbnailUrl,
        template: selectedTemplate,
      };
      const response = await saveInvoice(baseUrl, payload);
      if (response.status === 200) {
        toast.success("Invoice saved successfully");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong while saving the invoice.");
      }
    } catch (error) {
      console.error("Error saving invoice:", error.message);
      if (
        error &&
        error.message &&
        error.message.toLowerCase().includes("tainted")
      ) {
        toast.error(
          "Cannot capture preview due to cross-origin images. Serve images with CORS or host them locally."
        );
      } else {
        toast.error("Error saving invoice. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvoice = async () => {
    try {
      const res = await deleteInvoice(baseUrl, invoiceData.id);
      if (res.status === 200) {
        toast.success("Invoice deleted successfully");
        navigate("/dashboard");
      } else {
        toast.error("Error deleting invoice. Please try again.");
      }
    } catch (error) {
      toast.error("Error deleting invoice. Please try again.", error.message);
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col p-4 space-y-6">
      {/* CTA BUTTONS */}
      <div className="flex flex-col items-center gap-4">
        {/* LIST OF TEMPLATE BUTTONS */}
        <div className="flex gap-2 flex-wrap justify-center overflow-x-auto py-1 px-2">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-shadow ${
                selectedTemplate === `template${template.id}`
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-slate-700 border border-slate-200 hover:shadow-sm"
              }`}
              onClick={() => setSelectedTemplate(`template${template.id}`)}
            >
              {template.label}
            </button>
          ))}
        </div>

        {/* LIST OF ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleSaveAndExit}
            disabled={loading}
            className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:shadow transition"
          >
            {loading && <Loader2 className="ml-2 animate-spin" size={18} />}
            {loading ? "Saving..." : "Save & Exit"}
          </button>
          {invoiceData.id && (
            <button
              onClick={handleDeleteInvoice}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition"
            >
              Delete Invoice
            </button>
          )}
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:shadow transition">
            Back to Dashboard
          </button>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-100 transition">
            Send Email
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Download PDF
          </button>
        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex grow overflow-auto justify-center items-start py-4">
        <div
          ref={previewRef}
          className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-inner p-6"
        >
          <InvoicePreview
            invoiceData={invoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
