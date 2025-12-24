import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getAllInvoices } from "../service/InvoiceService";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";
import { formatDate } from "../util/formatInvoiceData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const {
    baseUrl,
    setInvoiceData,
    setSelectedTemplate,
    setInvoiceTitle,
    initialInvoiceData,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = await getToken();
        const res = await getAllInvoices(baseUrl, token);
        setInvoices(res.data);
      } catch (error) {
        toast.error("Failed to fetch invoices");
      }
    };
    fetchInvoices();
  }, [baseUrl]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "New Invoice");
    navigate("/preview");
  };

  const handleCreateNew = () => {
    setInvoiceTitle("New Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(initialInvoiceData);
    navigate("/generate");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
        Your Invoices
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CREATE INVOICE CARD */}
        <div
          role="button"
          onClick={handleCreateNew}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-white shadow-sm p-6 hover:shadow-md transition cursor-pointer min-h-[200px]"
        >
          <div className="rounded-full bg-blue-50 p-3">
            <Plus size={36} className="text-blue-600" />
          </div>
          <p className="mt-1 font-medium text-slate-800">Create New Invoice</p>
          <p className="text-xs text-slate-500">
            Start from scratch or use a template
          </p>
        </div>

        {/* EXISTING INVOICES */}
        {invoices.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 p-6 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-600">
              No invoices yet. Click “Create New Invoice” to get started.
            </p>
          </div>
        )}

        {invoices.map((invoice, idx) => (
          <div key={invoice.id ?? idx} className="w-full">
            <div
              onClick={() => handleViewClick(invoice)}
              className="flex flex-col bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer h-full"
            >
              {/* Thumbnail */}
              <div className="w-full h-40 bg-slate-50 flex items-center justify-center overflow-hidden">
                {invoice.thumbnailUrl ? (
                  <img
                    src={invoice.thumbnailUrl}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-sm text-slate-400">
                    No preview available
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="p-4 flex flex-col gap-2">
                <h6 className="text-md font-semibold text-slate-800 truncate">
                  {invoice.title || "Untitled Invoice"}
                </h6>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Updated</span>
                  <span>{formatDate(invoice.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
