import { Trash2 } from "lucide-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);

  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          number: randomNumber,
        },
      }));
    }
  }, []);

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", quantity: "", amount: "", description: "", total: 0 },
      ],
    }));
  };

  const deleteItem = (index) => {
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAsBilling = () => {
    setInvoiceData((prev) => ({
      ...prev,
      shipping: { ...prev.billing },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    if (field === "quantity" || field === "amount") {
      items[index].total =
        (items[index].quantity || 0) * (items[index].amount || 0);
    }
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    const taxRate = Number(invoiceData.tax) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

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
            <img
              src={invoiceData.logo ? invoiceData.logo : assets.placeholder}
              alt="img_ip"
              width={98}
              className="object-contain"
            />
          </label>

          <input
            type="file"
            name="logo"
            id="image"
            hidden
            accept="image/*"
            onChange={handleLogoUpload}
          />
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
            onChange={(e) => handleChange("company", "name", e.target.value)}
            value={invoiceData.company.name}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company Phone"
            onChange={(e) => handleChange("company", "phone", e.target.value)}
            value={invoiceData.company.phone}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Company Address"
            onChange={(e) => handleChange("company", "address", e.target.value)}
            value={invoiceData.company.address}
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
            onChange={(e) => handleChange("billing", "name", e.target.value)}
            value={invoiceData.billing.name}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Phone No."
            onChange={(e) => handleChange("billing", "phone", e.target.value)}
            value={invoiceData.billing.phone}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
            onChange={(e) => handleChange("billing", "address", e.target.value)}
            value={invoiceData.billing.address}
          />
        </div>
      </div>

      {/* SHIP TO */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-semibold text-slate-700">Ship To</h5>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsBilling"
              onChange={handleSameAsBilling}
            />
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
            onChange={(e) => handleChange("shipping", "name", e.target.value)}
            value={invoiceData.shipping.name}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Phone No."
            onChange={(e) => handleChange("shipping", "phone", e.target.value)}
            value={invoiceData.shipping.phone}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Shipping Address"
            onChange={(e) =>
              handleChange("shipping", "address", e.target.value)
            }
            value={invoiceData.shipping.address}
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
              id="invoiceNumber"
              onChange={(e) =>
                handleChange("invoice", "number", e.target.value)
              }
              value={invoiceData.invoice.number}
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
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
              value={invoiceData.invoice.date}
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
              onChange={(e) =>
                handleChange("invoice", "dueDate", e.target.value)
              }
              value={invoiceData.invoice.dueDate}
            />
          </div>
        </div>
      </div>

      {/* ITEM DETAILS */}
      <div className="mb-8">
        <h5 className="text-lg font-semibold text-slate-700 mb-3">
          Item Details
        </h5>

        {invoiceData.items.map((item, index) => (
          <div
            className="p-4 mb-3 bg-slate-50 border border-slate-200 rounded-lg"
            key={index}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
              <input
                type="text"
                placeholder="Item Name"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Amount"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, "amount", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Total"
                className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-100"
                value={item.total}
                disabled
              />
            </div>

            <div className="flex gap-3">
              <textarea
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              ></textarea>

              {invoiceData.items.length > 1 && (
                <button
                  type="button"
                  className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={addItem}
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
            onChange={(e) => handleChange("account", "name", e.target.value)}
            value={invoiceData.account.name}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Account No."
            onChange={(e) => handleChange("account", "number", e.target.value)}
            value={invoiceData.account.number}
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Branch/IFSC Code"
            onChange={(e) =>
              handleChange("account", "ifscCode", e.target.value)
            }
            value={invoiceData.account.ifscCode}
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
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
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
                onChange={(e) =>
                  setInvoiceData((prev) => ({
                    ...prev,
                    tax: e.target.value,
                  }))
                }
                value={invoiceData.tax}
              />
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Tax Amount</span>
              <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-700">Grand Total</span>
              <span className="font-semibold text-slate-800">
                ₹{grandTotal.toFixed(2)}
              </span>
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
          onChange={(e) =>
            setInvoiceData((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
          value={invoiceData.notes}
        ></textarea>
      </div>
    </div>
  );
};

export default InvoiceForm;
