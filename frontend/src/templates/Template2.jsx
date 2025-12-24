const Template2 = ({ data }) => {
  return (
    <div
      className="mx-auto my-0 bg-white shadow-md border border-slate-100 print:shadow-none"
      style={{ width: "210mm", minHeight: "297mm", padding: "16mm" }}
    >
      {/* TOP BAR */}
      <div className="mb-6 break-inside-avoid flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="logo"
              width={88}
              className="object-contain rounded-sm"
            />
          )}
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {data.companyName}
            </div>
            <div className="text-xs text-slate-600">{data.companyAddress}</div>
            <div className="text-xs text-slate-600">
              Phone: {data.companyPhone}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end text-sm text-slate-700">
          <div className="text-xl font-bold text-teal-700">{data.title}</div>
          <div className="mt-2 md:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-slate-500">Invoice #</div>
              <div className="font-medium text-slate-800">
                {data.invoiceNumber}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Invoice Date</div>
              <div className="font-medium text-slate-800">
                {data.invoiceDate}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Due Date</div>
              <div className="font-medium text-slate-800">
                {data.paymentDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* LEFT: Billing / Shipping */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.shippingName &&
              data.shippingPhone &&
              data.shippingAddress && (
                <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="text-xs text-teal-700 font-semibold mb-1">
                    Shipped To
                  </div>
                  <div className="text-sm font-medium text-slate-900">
                    {data.shippingName}
                  </div>
                  <div className="text-xs text-slate-600">
                    {data.shippingAddress}
                  </div>
                  <div className="text-xs text-slate-600">
                    Phone: {data.shippingPhone}
                  </div>
                </div>
              )}

            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <div className="text-xs text-teal-700 font-semibold mb-1">
                Billed To
              </div>
              <div className="text-sm font-medium text-slate-900">
                {data.billingName}
              </div>
              <div className="text-xs text-slate-600">
                {data.billingAddress}
              </div>
              <div className="text-xs text-slate-600">
                Phone: {data.billingPhone}
              </div>
            </div>
          </div>

          {/* ITEMS - compact list view */}
          <div className="bg-white border border-slate-100 rounded-md overflow-hidden break-inside-auto">
            <div className="px-4 py-3 bg-teal-50 border-b border-slate-100">
              <div className="text-sm font-semibold text-teal-700">Items</div>
            </div>

            <div className="divide-y divide-slate-100">
              {data.items.map((item, index) => {
                const lineTotal =
                  Number(item.quantity) * Number(item.amount || 0);
                return (
                  <div
                    key={index}
                    className="px-4 py-3 grid grid-cols-12 gap-2 items-center break-inside-avoid"
                  >
                    <div className="col-span-6 text-sm text-slate-800">
                      {item.name}
                    </div>
                    <div className="col-span-2 text-sm text-center text-slate-700">
                      {Number(item.quantity)}
                    </div>
                    <div className="col-span-2 text-sm text-right text-slate-700">
                      {data.currencySymbol}
                      {Number(item.amount || 0).toFixed(2)}
                    </div>
                    <div className="col-span-2 text-sm text-right font-medium text-slate-900">
                      {data.currencySymbol}
                      {lineTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NOTES */}
          {data.notes && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-md break-inside-avoid">
              <div className="text-xs text-teal-700 font-semibold mb-1">
                Remarks
              </div>
              <div className="text-sm text-slate-700">{data.notes}</div>
            </div>
          )}

          {/* BANK DETAILS */}
          {(data.accountName || data.accountNumber || data.accountIfscCode) && (
            <div className="mt-4 p-4 bg-white border border-slate-100 rounded-md break-inside-avoid">
              <div className="text-xs text-teal-700 font-semibold mb-2">
                Bank Account Details
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                {data.accountName && (
                  <div>
                    <strong className="text-slate-800">Account Holder:</strong>{" "}
                    {data.accountName}
                  </div>
                )}
                {data.accountNumber && (
                  <div>
                    <strong className="text-slate-800">Account Number:</strong>{" "}
                    {data.accountNumber}
                  </div>
                )}
                {data.accountIfscCode && (
                  <div>
                    <strong className="text-slate-800">IFSC Code:</strong>{" "}
                    {data.accountIfscCode}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Totals card */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-100 rounded-md p-4 shadow-sm break-inside-avoid print:static">
            <div className="text-xs text-slate-500">Summary</div>

            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal</span>
                <span className="font-medium">
                  {data.currencySymbol}
                  {Number(data.subtotal).toFixed(2)}
                </span>
              </div>

              {data.tax > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Tax ({data.tax}%)</span>
                  <span className="font-medium">
                    {data.currencySymbol}
                    {Number(data.taxAmount).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                <span className="text-sm font-semibold text-slate-900">
                  Grand Total
                </span>
                <span className="text-lg font-bold text-teal-700">
                  {data.currencySymbol}
                  {Number(data.total).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* small meta block */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm text-slate-700">
            <div className="mb-2 text-xs text-teal-700 font-semibold">
              Payment Terms
            </div>
            <div>
              Due Date:{" "}
              <span className="font-medium text-slate-900">
                {data.paymentDate}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Invoice generated by QuickInvoice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
