import { Pencil } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";

const MainPage = () => {
  const {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    setSelectedTemplate,
  } = useContext(AppContext);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setInvoiceTitle(e.target.value);
    setInvoiceData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleTemplateClick = (templateId) => {
    const hasInvalidItem = invoiceData.items.some(
      (item) => !item.name && !item.quantity && !item.amount
    );
    if (hasInvalidItem) {
      toast.error(
        "Please fill in all item details before changing the template."
      );
      return;
    }

    setSelectedTemplate(templateId);
  };

  const handleTitleEdit = () => setIsEditingTitle(true);
  const handleTitleBlur = () => setIsEditingTitle(false);

  return (
    <div className="min-h-screen py-6 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <div className="bg-white shadow-sm border rounded-xl p-5 mb-8">
          <div className="flex items-center">
            {isEditingTitle ? (
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
                autoFocus
                onBlur={handleTitleBlur}
                onChange={handleTitleChange}
                value={invoiceTitle}
              />
            ) : (
              <>
                <h5 className="text-xl font-semibold text-slate-800">
                  {invoiceTitle}
                </h5>

                <button
                  className="p-2 rounded-full hover:bg-blue-50 transition border border-transparent"
                  onClick={handleTitleEdit}
                >
                  <Pencil className="text-blue-600" size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — FORM */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <h4 className="text-lg font-semibold text-slate-800 mb-1">
              Invoice Form
            </h4>
            <div className="pr-2">
              <InvoiceForm />
            </div>
          </div>

          {/* RIGHT — TEMPLATE GRID */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <h4 className="text-lg font-semibold text-slate-800 mb-1">
              Templates
            </h4>
            <div className="pr-2">
              <TemplateGrid onTemplateClick={handleTemplateClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
