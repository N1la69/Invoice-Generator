const Template3 = ({ data }) => {
  return (
    <div className="mx-auto my-6 w-full max-w-4xl bg-white border border-slate-100 rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          {data.companyLogo && (
            <div className="shrink-0">
              <img
                src={data.companyLogo}
                alt="logo"
                width={84}
                className="object-contain rounded-sm border border-slate-100"
              />
            </div>
          )}

          <div>
            <div className="text-base font-semibold text-slate-900">
              {data.companyName}
            </div>
            <div className="text-sm text-slate-600">{data.companyAddress}</div>
            <div className="text-sm text-slate-600">
              Phone: {data.companyPhone}
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-lg text-right">
            <div className="text-lg font-bold">{data.title}</div>
            <div className="mt-2 text-sm">
              <div>
                <span className="text-slate-300">Invoice #</span>
                <span className="ml-2 font-medium">{data.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-slate-300">Invoice Date</span>
                <span className="ml-2 font-medium">{data.invoiceDate}</span>
              </div>
              <div>
                <span className="text-slate-300">Due Date</span>
                <span className="ml-2 font-medium">{data.paymentDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping / Billing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data.shippingName && data.shippingPhone && data.shippingAddress ? (
          <div className="p-3 border border-slate-100 rounded-md bg-slate-50">
            <div className="text-sm font-semibold text-slate-800 mb-2">
              Shipped To
            </div>
            <div className="text-sm text-slate-700 font-medium">
              {data.shippingName}
            </div>
            <div className="text-sm text-slate-600">{data.shippingAddress}</div>
            <div className="text-sm text-slate-600">
              Phone: {data.shippingPhone}
            </div>
          </div>
        ) : null}

        <div className="p-3 border border-slate-100 rounded-md bg-slate-50">
          <div className="text-sm font-semibold text-slate-800 mb-2">
            Billed To
          </div>
          <div className="text-sm text-slate-700 font-medium">
            {data.billingName}
          </div>
          <div className="text-sm text-slate-600">{data.billingAddress}</div>
          <div className="text-sm text-slate-600">
            Phone: {data.billingPhone}
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full border-separate [border-spacing:0]">
          <thead>
            <tr>
              <th className="bg-slate-100 text-left px-4 py-3 text-sm font-semibold text-slate-700 rounded-tl-md">
                Item / Description
              </th>
              <th className="bg-slate-100 text-center px-4 py-3 text-sm font-semibold text-slate-700">
                Qty
              </th>
              <th className="bg-slate-100 text-right px-4 py-3 text-sm font-semibold text-slate-700">
                Rate
              </th>
              <th className="bg-slate-100 text-right px-4 py-3 text-sm font-semibold text-slate-700 rounded-tr-md">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item, i) => {
              const qty = Number(item.quantity) || 0;
              const rate = Number(item.amount) || 0;
              const lineTotal = qty * rate;

              return (
                <tr key={i} className="even:bg-white odd:bg-slate-50">
                  <td className="px-4 py-3 align-top text-sm text-slate-700">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-center align-top text-sm text-slate-700">
                    {qty}
                  </td>
                  <td className="px-4 py-3 text-right align-top text-sm text-slate-700">
                    {data.currencySymbol}
                    {rate.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right align-top text-sm text-slate-700">
                    {data.currencySymbol}
                    {lineTotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals centered */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-sm bg-slate-50 border border-slate-100 rounded-md p-4">
          <div className="flex justify-between text-sm text-slate-700 mb-2">
            <span>Subtotal</span>
            <span className="font-medium">
              {data.currencySymbol}
              {Number(data.subtotal || 0).toFixed(2)}
            </span>
          </div>

          {data.tax > 0 && (
            <div className="flex justify-between text-sm text-slate-700 mb-2">
              <span>Tax ({data.tax}%)</span>
              <span className="font-medium">
                {data.currencySymbol}
                {Number(data.taxAmount || 0).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-base font-semibold text-slate-900 border-t border-slate-100 pt-3 mt-3">
            <span>Total</span>
            <span>
              {data.currencySymbol}
              {Number(data.total || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Bank & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data.accountName || data.accountNumber || data.accountIfscCode) && (
          <div className="p-4 border border-slate-100 rounded-md">
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

        {data.notes && (
          <div className="p-4 border border-slate-100 rounded-md">
            <div className="text-sm font-semibold text-slate-800 mb-2">
              Remarks
            </div>
            <div className="text-sm text-slate-700">{data.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template3;
