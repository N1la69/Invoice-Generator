import { Pencil } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import InvoiceForm from "../components/InvoiceForm";

const MainPage = () => {
  const { invoiceTitle, setInvoiceTitle } = useContext(AppContext);

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleChange = (e) => {
    e.preventDefault();

    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="min-h-screen py-4">
      <div className="container max-w-6xl mx-auto">
        {/* TITLE */}
        <div className="border rounded-lg shadow-sm p-4 mb-6 bg-white">
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
                <h5 className="mb-0 me-2 text-lg font-semibold text-slate-800">
                  {invoiceTitle}
                </h5>

                <button
                  className="p-2 rounded-full hover:bg-blue-50 transition border border-transparent"
                  onClick={handleTitleEdit}
                >
                  <Pencil className="text-blue-600 cursor-pointer" size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* INVOICE FORM and TEMPLATE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* INVOICE */}
          <div className="">
            <div className="border rounded shadow-sm p-4">
              <InvoiceForm />
            </div>
          </div>
          {/* TEMPLATE GRID */}
          <div className="">
            <div className="border rounded shadow-sm p-4">grid</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
