const Template4 = ({ data }) => {
  return (
    <div
      className="mx-auto my-0 bg-white rounded-lg shadow-md border border-slate-100 print:shadow-none overflow-hidden"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      <div style={{ padding: "16mm" }}>
        <div className="md:flex md:items-stretch">
          {/* SIDEBAR */}
          <aside className="md:w-80 bg-indigo-50 p-6 shrink-0 break-inside-avoid">
            <div className="flex flex-col items-start gap-4">
              {data.companyLogo && (
                <img
                  src={data.companyLogo}
                  alt="logo"
                  width={84}
                  className="object-contain rounded-md border border-indigo-100"
                />
              )}

              <div>
                <div className="text-lg font-bold text-indigo-800">
                  {data.companyName}
                </div>
                <div className="text-sm text-indigo-700 mt-1">
                  {data.companyAddress}
                </div>
                <div className="text-sm text-indigo-700 mt-1">
                  Phone: {data.companyPhone}
                </div>
              </div>

              <div className="mt-4 w-full">
                <div className="text-xs text-indigo-600 font-semibold">
                  Invoice
                </div>
                <div className="mt-2 text-sm font-medium text-indigo-900">
                  {data.title}
                </div>

                <div className="mt-3 text-xs text-slate-600 space-y-2">
                  <div>
                    <span className="block text-slate-500">Invoice #</span>
                    <span className="font-medium">{data.invoiceNumber}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Invoice Date</span>
                    <span className="font-medium">{data.invoiceDate}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Due Date</span>
                    <span className="font-medium">{data.paymentDate}</span>
                  </div>
                </div>
              </div>

              {/* Totals condensed for sidebar (mobile fallback shown) */}
              <div className="mt-6 bg-white border border-indigo-100 rounded-md p-3 w-full hidden md:block break-inside-avoid">
                <div className="text-xs text-slate-500">Summary</div>
                <div className="mt-2 text-sm text-slate-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {data.currencySymbol}
                      {Number(data.subtotal || 0).toFixed(2)}
                    </span>
                  </div>
                  {data.tax > 0 && (
                    <div className="flex justify-between mt-1">
                      <span>Tax ({data.tax}%)</span>
                      <span>
                        {data.currencySymbol}
                        {Number(data.taxAmount || 0).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between mt-3 border-t border-indigo-100 pt-2 font-semibold text-indigo-900">
                    <span>Total</span>
                    <span>
                      {data.currencySymbol}
                      {Number(data.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6">
            {/* Header top (on mobile show invoice meta) */}
            <div className="mb-6 md:hidden">
              <div className="text-xl font-bold text-indigo-800">
                {data.title}
              </div>
              <div className="mt-2 text-sm text-slate-600">
                <div>
                  Invoice#:{" "}
                  <span className="font-medium">{data.invoiceNumber}</span>
                </div>
                <div>
                  Invoice Date:{" "}
                  <span className="font-medium">{data.invoiceDate}</span>
                </div>
                <div>
                  Due Date:{" "}
                  <span className="font-medium">{data.paymentDate}</span>
                </div>
              </div>
            </div>

            {/* Billing / Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 break-inside-avoid">
              {data.shippingName &&
                data.shippingPhone &&
                data.shippingAddress && (
                  <div className="p-4 rounded-md border border-slate-100 bg-indigo-50">
                    <div className="text-sm font-semibold text-indigo-800 mb-2">
                      Shipped To
                    </div>
                    <div className="text-sm font-medium text-slate-800">
                      {data.shippingName}
                    </div>
                    <div className="text-sm text-slate-600">
                      {data.shippingAddress}
                    </div>
                    <div className="text-sm text-slate-600">
                      Phone: {data.shippingPhone}
                    </div>
                  </div>
                )}

              <div className="p-4 rounded-md border border-slate-100 bg-slate-50">
                <div className="text-sm font-semibold text-slate-800 mb-2">
                  Billed To
                </div>
                <div className="text-sm font-medium text-slate-800">
                  {data.billingName}
                </div>
                <div className="text-sm text-slate-600">
                  {data.billingAddress}
                </div>
                <div className="text-sm text-slate-600">
                  Phone: {data.billingPhone}
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6 overflow-x-auto break-inside-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      Item / Description
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 w-20">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 w-32">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 w-32">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {data.items.map((item, idx) => {
                    const qty = Number(item.quantity) || 0;
                    const rate = Number(item.amount) || 0;
                    const line = qty * rate;
                    return (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        } break-inside-avoid`}
                      >
                        <td className="px-4 py-3 align-top text-sm text-slate-800">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-center align-top text-sm text-slate-700">
                          {qty}
                        </td>
                        <td className="px-4 py-3 text-right align-top text-sm text-slate-700">
                          {data.currencySymbol}
                          {rate.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right align-top text-sm text-slate-800">
                          {data.currencySymbol}
                          {line.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals (mobile & main content) */}
            <div className="md:hidden mb-6 break-inside-avoid">
              <div className="bg-slate-50 border border-slate-100 rounded-md p-4 max-w-md ml-auto">
                <div className="flex justify-between text-sm text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {data.currencySymbol}
                    {Number(data.subtotal || 0).toFixed(2)}
                  </span>
                </div>
                {data.tax > 0 && (
                  <div className="flex justify-between text-sm text-slate-700 mt-2">
                    <span>Tax ({data.tax}%)</span>
                    <span className="font-medium">
                      {data.currencySymbol}
                      {Number(data.taxAmount || 0).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-slate-900 mt-3 border-t border-slate-100 pt-3">
                  <span>Total</span>
                  <span>
                    {data.currencySymbol}
                    {Number(data.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 break-inside-avoid">
              {(data.accountName ||
                data.accountNumber ||
                data.accountIfscCode) && (
                <div className="p-4 border border-slate-100 rounded-md break-inside-avoid">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    Bank Account Details
                  </div>
                  {data.accountName && (
                    <div className="text-sm text-slate-700 mb-1">
                      <strong className="text-slate-800">
                        Account Holder:{" "}
                      </strong>
                      {data.accountName}
                    </div>
                  )}
                  {data.accountNumber && (
                    <div className="text-sm text-slate-700 mb-1">
                      <strong className="text-slate-800">
                        Account Number:{" "}
                      </strong>
                      {data.accountNumber}
                    </div>
                  )}
                  {data.accountIfscCode && (
                    <div className="text-sm text-slate-700">
                      <strong className="text-slate-800">IFSC Code: </strong>
                      {data.accountIfscCode}
                    </div>
                  )}
                </div>
              )}

              {data.notes && (
                <div className="p-4 border border-slate-100 rounded-md">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    Remarks
                  </div>
                  <div className="text-sm text-slate-700">{data.notes}</div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Template4;
