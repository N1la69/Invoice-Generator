import { Trash2 } from "lucide-react";

const InvoiceForm = () => {
  return (
    <div className="container py-6">
      {/* COMPANY LOGO */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-2">
          Company Logo
        </h5>

        <div className="flex items-center gap-4">
          <label
            htmlFor="image"
            className="cursor-pointer bg-slate-100 border border-slate-300 rounded-lg p-3 flex items-center justify-center h-28 w-28 hover:bg-slate-200 transition"
          >
            <img src="" alt="img_ip" width={98} className="object-contain" />
          </label>

          <input type="file" name="logo" id="image" hidden accept="image/*" />
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">
          Your Company
        </h5>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company Name"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company Phone"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company Address"
          />
        </div>
      </div>

      {/* BILL TO */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">Bill To</h5>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Phone No."
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
          />
        </div>
      </div>

      {/* SHIP TO */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-semibold text-slate-700">Ship To</h5>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="sameAsBilling" />
            <label htmlFor="sameAsBilling" className="text-slate-600">
              Same as Billing
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Phone No."
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Shipping Address"
          />
        </div>
      </div>

      {/* INVOICE INFO */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">
          Invoice Information
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="invoiceNumber" className="text-slate-600 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              disabled
              className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500"
              placeholder="Invoice Number"
              id="invoiceNumber"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="invoiceDate" className="text-slate-600 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="invoiceDate"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="invoiceDueDate" className="text-slate-600 mb-1">
              Invoice Due Date
            </label>
            <input
              type="date"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="invoiceDueDate"
            />
          </div>
        </div>
      </div>

      {/* ITEM DETAILS */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">
          Item Details
        </h5>

        <div className="p-4 mb-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              placeholder="Item Name"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Total"
              className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-100"
            />
          </div>

          <div className="flex gap-3">
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
            ></textarea>

            <button
              type="button"
              className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Item
        </button>
      </div>

      {/* BANK ACC INFO */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">
          Bank Details
        </h5>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Account Name"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Account No."
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Branch/IFSC Code"
          />
        </div>
      </div>

      {/* TOTALS */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">Totals</h5>

        <div className="flex justify-start w-full">
          <div className="w-full bg-slate-50 p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">₹{1000.0}</span>
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="taxInput" className="text-slate-600">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="taxInput"
                className="px-2 py-1 w-20 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 ml-2"
                placeholder="5"
              />
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Tax Amount</span>
              <span className="font-medium">₹{50.0}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-700">Grand Total</span>
              <span className="font-semibold text-slate-800">₹{1050.0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-2">Notes</h5>

        <textarea
          name="notes"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};

export default InvoiceForm;
