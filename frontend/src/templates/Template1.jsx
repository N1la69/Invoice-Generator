const Template1 = ({ data }) => {
  return (
    <div className="mx-auto my-4 px-4 py-5 w-full max-w-4xl bg-white border border-orange-100 rounded-lg shadow-sm">
      {/* HEADER */}
      <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex items-start gap-4">
          {data.companyLogo && (
            <div className="shrink-0">
              <img
                src={data.companyLogo}
                alt="logo"
                width={98}
                className="object-contain rounded-md border border-slate-100"
              />
            </div>
          )}

          <div>
            <h2 className="mb-1 text-lg md:text-xl font-semibold text-orange-700">
              {data.companyName}
            </h2>
            <p className="mb-1 text-sm text-slate-600">{data.companyAddress}</p>
            <p className="mb-0 text-sm text-slate-600">
              Phone: {data.companyPhone}
            </p>
          </div>
        </div>

        <div className="text-start md:text-right">
          <h1 className="mb-2 text-xl md:text-2xl font-bold text-orange-600">
            {data.title}
          </h1>

          <div className="flex flex-col md:flex-row md:justify-end gap-2 md:gap-6 text-sm text-slate-700">
            <div>
              <p className="mb-1">
                <strong className="text-slate-800">Invoice#:</strong>{" "}
                <span className="text-slate-700">{data.invoiceNumber}</span>
              </p>
              <p className="mb-1">
                <strong className="text-slate-800">Invoice Date:</strong>{" "}
                <span className="text-slate-700">{data.invoiceDate}</span>
              </p>
              <p className="mb-1">
                <strong className="text-slate-800">Due Date:</strong>{" "}
                <span className="text-slate-700">{data.paymentDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-3 border-orange-200" />

      {/* BILLING */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.shippingName && data.shippingPhone && data.shippingAddress && (
          <div>
            <div className="p-3 rounded bg-orange-50 border border-orange-100">
              <h3 className="mb-2 text-sm font-semibold text-orange-700">
                Shipped To
              </h3>
              <p className="mb-1 text-sm">
                <strong className="text-slate-800">{data.shippingName}</strong>
              </p>
              <p className="mb-1 text-sm text-slate-600">
                {data.shippingAddress}
              </p>
              <p className="mb-0 text-sm text-slate-600">
                Phone: {data.shippingPhone}
              </p>
            </div>
          </div>
        )}

        <div>
          <div className="p-3 rounded bg-orange-50 border border-orange-100">
            <h3 className="mb-2 text-sm font-semibold text-orange-700">
              Billed To
            </h3>
            <p className="mb-1 text-sm">
              <strong className="text-slate-800">{data.billingName}</strong>
            </p>
            <p className="mb-1 text-sm text-slate-600">{data.billingAddress}</p>
            <p className="mb-0 text-sm text-slate-600">
              Phone: {data.billingPhone}
            </p>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mb-4 overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-orange-100">
              <th className="p-3 text-left text-sm text-slate-700">
                Item # / Item description
              </th>
              <th className="p-3 text-center text-sm text-slate-700 w-20">
                Qty.
              </th>
              <th className="p-3 text-right text-sm text-slate-700 w-32">
                Rate
              </th>
              <th className="p-3 text-right text-sm text-slate-700 w-32">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-white"}
              >
                <td className="p-3 align-top text-sm text-slate-700">
                  {item.name}
                </td>
                <td className="p-3 text-center align-top text-sm text-slate-700">
                  {Number(item.quantity)}
                </td>
                <td className="p-3 text-right align-top text-sm text-slate-700">
                  {data.currencySymbol}
                  {Number(item.amount)?.toFixed(2)}
                </td>
                <td className="p-3 text-right align-top text-sm text-slate-700">
                  {data.currencySymbol}
                  {(Number(item.quantity) * Number(item.amount)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTALS */}
      <div className="mb-4">
        <div className="flex justify-end">
          <div className="p-3 max-w-[320px] w-full bg-orange-50 border border-orange-100 rounded-md">
            <div className="flex justify-between mb-2 text-sm text-slate-700">
              <span>Subtotal:</span>
              <span className="font-medium">
                {data.currencySymbol}
                {Number(data.subtotal).toFixed(2)}
              </span>
            </div>

            {data.tax > 0 && (
              <div className="flex justify-between mb-2 text-sm text-slate-700">
                <span>Tax ({data.tax}%)</span>
                <span className="font-medium">
                  {data.currencySymbol}
                  {Number(data.taxAmount).toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between font-bold text-slate-800 border-t border-orange-100 pt-2 mt-2">
              <span>Total:</span>
              <span>
                {data.currencySymbol}
                {Number(data.total).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BANK ACC */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-orange-700">
            Bank Account Details
          </h3>
          {data.accountName && (
            <p className="mb-1 text-sm text-slate-700">
              <strong className="text-slate-800">Account Holder: </strong>
              {data.accountName}
            </p>
          )}
          {data.accountNumber && (
            <p className="mb-1 text-sm text-slate-700">
              <strong className="text-slate-800">Account Number: </strong>
              {data.accountNumber}
            </p>
          )}
          {data.accountIfscCode && (
            <p className="mb-0 text-sm text-slate-700">
              <strong className="text-slate-800">IFSC Code: </strong>
              {data.accountIfscCode}
            </p>
          )}
        </div>
      )}

      {/* NOTES */}
      {data.notes && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-orange-700">
            Remarks:
          </h3>
          <p className="mb-0 text-sm text-slate-700">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template1;
