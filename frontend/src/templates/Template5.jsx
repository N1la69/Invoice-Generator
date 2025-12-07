const Template5 = ({ data }) => {
  return (
    <div className="mx-auto my-6 w-full max-w-5xl bg-white border border-slate-100 rounded-lg shadow-sm p-6">
      {/* Top: Company + Meta */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div className="flex items-start gap-4">
          {data.companyLogo && (
            <div className="shrink-0">
              <img
                src={data.companyLogo}
                alt="Company logo"
                width={92}
                className="object-contain rounded-md border border-slate-100"
              />
            </div>
          )}

          <div>
            <div className="text-lg font-semibold text-slate-900">
              {data.companyName}
            </div>
            <div className="text-sm text-slate-600">{data.companyAddress}</div>
            <div className="text-sm text-slate-600">
              Phone: {data.companyPhone}
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3 text-sm">
            <div className="text-xs text-emerald-700 font-semibold">
              Invoice
            </div>
            <div className="font-medium text-slate-900">
              {data.invoiceNumber}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3 text-sm">
            <div className="text-xs text-emerald-700 font-semibold">
              Invoice Date
            </div>
            <div className="font-medium text-slate-900">{data.invoiceDate}</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3 text-sm">
            <div className="text-xs text-emerald-700 font-semibold">
              Due Date
            </div>
            <div className="font-medium text-slate-900">{data.paymentDate}</div>
          </div>
        </div>
      </div>

      {/* Title / Big heading */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {data.title}
        </h1>
      </div>

      {/* Billing & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data.shippingName && data.shippingPhone && data.shippingAddress && (
          <div className="p-4 rounded-md border border-slate-100 bg-slate-50">
            <div className="text-sm font-semibold text-slate-800 mb-2">
              Shipped To
            </div>
            <div className="text-sm font-medium text-slate-900">
              {data.shippingName}
            </div>
            <div className="text-sm text-slate-600">{data.shippingAddress}</div>
            <div className="text-sm text-slate-600">
              Phone: {data.shippingPhone}
            </div>
          </div>
        )}

        <div className="p-4 rounded-md border border-slate-100 bg-white">
          <div className="text-sm font-semibold text-slate-800 mb-2">
            Billed To
          </div>
          <div className="text-sm font-medium text-slate-900">
            {data.billingName}
          </div>
          <div className="text-sm text-slate-600">{data.billingAddress}</div>
          <div className="text-sm text-slate-600">
            Phone: {data.billingPhone}
          </div>
        </div>
      </div>

      {/* Items: modern clean table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left pb-3 font-medium text-slate-700">
                Item / Description
              </th>
              <th className="text-center pb-3 font-medium text-slate-700 w-20">
                Qty
              </th>
              <th className="text-right pb-3 font-medium text-slate-700 w-32">
                Rate
              </th>
              <th className="text-right pb-3 font-medium text-slate-700 w-32">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item, idx) => {
              const qty = Number(item.quantity) || 0;
              const rate = Number(item.amount) || 0;
              const line = qty * rate;
              return (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="py-3 align-top text-slate-800">{item.name}</td>
                  <td className="py-3 text-center align-top text-slate-700">
                    {qty}
                  </td>
                  <td className="py-3 text-right align-top text-slate-700">
                    {data.currencySymbol}
                    {rate.toFixed(2)}
                  </td>
                  <td className="py-3 text-right align-top font-medium text-slate-900">
                    {data.currencySymbol}
                    {line.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="pt-4 text-sm text-slate-700">Subtotal</td>
              <td className="pt-4 text-right font-medium text-slate-900">
                {data.currencySymbol}
                {Number(data.subtotal || 0).toFixed(2)}
              </td>
            </tr>

            {data.tax > 0 && (
              <tr>
                <td colSpan={2}></td>
                <td className="pt-2 text-sm text-slate-700">
                  Tax ({data.tax}%)
                </td>
                <td className="pt-2 text-right font-medium text-slate-900">
                  {data.currencySymbol}
                  {Number(data.taxAmount || 0).toFixed(2)}
                </td>
              </tr>
            )}

            <tr>
              <td colSpan={2}></td>
              <td className="pt-3 text-base font-semibold text-slate-900 border-t border-slate-100">
                Total
              </td>
              <td className="pt-3 text-base font-semibold text-right text-emerald-700 border-t border-slate-100">
                {data.currencySymbol}
                {Number(data.total || 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Bank details & Notes side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {(data.accountName || data.accountNumber || data.accountIfscCode) && (
            <div className="p-4 rounded-md border border-slate-100 bg-slate-50">
              <div className="text-sm font-semibold text-slate-800 mb-2">
                Bank Account Details
              </div>
              {data.accountName && (
                <div className="text-sm text-slate-700 mb-1">
                  <strong className="text-slate-800">Account Holder: </strong>
                  {data.accountName}
                </div>
              )}
              {data.accountNumber && (
                <div className="text-sm text-slate-700 mb-1">
                  <strong className="text-slate-800">Account Number: </strong>
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
        </div>

        <div>
          {data.notes && (
            <div className="p-4 rounded-md border border-slate-100 bg-white">
              <div className="text-sm font-semibold text-slate-800 mb-2">
                Remarks
              </div>
              <div className="text-sm text-slate-700">{data.notes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template5;
