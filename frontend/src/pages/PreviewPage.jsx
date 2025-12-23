import { useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import {
  deleteInvoice,
  saveInvoice,
  sendInvoice,
} from "../service/InvoiceService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { uploadInvoiceThumbnail } from "../service/CloudinaryService";
import { generatePdfFromElement } from "../util/pdfUtils";
import { useAuth, useUser } from "@clerk/clerk-react";

const PreviewPage = () => {
  const previewRef = useRef();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const { selectedTemplate, setSelectedTemplate, invoiceData, baseUrl } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailing, setEmailing] = useState(false);

  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is empty");
      navigate("/dashboard");
    }
  }, [invoiceData, navigate]);

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
        clerkId: user.id,
        thumbnailUrl,
        template: selectedTemplate,
      };
      const token = await getToken();
      const response = await saveInvoice(baseUrl, payload, token);
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
      const token = await getToken();
      const res = await deleteInvoice(baseUrl, invoiceData.id, token);
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

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Error generating PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!previewRef.current || !customerEmail) {
      return toast.error("Please provide a valid email address.");
    }

    try {
      setEmailing(true);
      const pdfBlob = await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`,
        true
      );

      const formData = new FormData();
      formData.append("file", pdfBlob, `invoice_${Date.now()}.pdf`);
      formData.append("email", customerEmail);

      const token = await getToken();
      const res = await sendInvoice(baseUrl, formData, token);
      if (res.status === 200) {
        toast.success("Email sent successfully");
        setShowModal(false);
        setCustomerEmail("");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send email. Please try again.", error.message);
      console.error("Email Sending Error:", error);
    } finally {
      setEmailing(false);
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
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:shadow transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-100 transition"
          >
            Send Email
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading && <Loader2 className="ml-2 animate-spin" size={18} />}
            {downloading ? "Downloading..." : "Download PDF"}
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

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md mx-4" role="document">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <h5 className="text-lg font-semibold text-slate-800">
                  Send Invoice
                </h5>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 transition"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="px-5 py-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="customer@email.com"
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  value={customerEmail}
                />
              </div>

              {/* MODAL FOOTER */}
              <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-200">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={handleSendEmail}
                  disabled={emailing}
                >
                  {emailing ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
