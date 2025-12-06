const Template1 = ({ data }) => {
  return (
    <div className="border rounded mx-auto my-4 px-4 py-3 w-full">
      {/* HEADER */}
      <div className="mb-4">
        <div className="mb-3">
          {data.companyLogo && (
            <div className="mb-2">
              <img src={data.companyLogo} alt="logo" width={98} />
            </div>
          )}
          <h2 className="mb-1">{data.companyName}</h2>
          <p className="mb-1">{data.companyAddress}</p>
          <p className="mb-0">Phone: {data.companyPhone}</p>
        </div>
        <div className="text-start md:text-end">
          <h1 className="mb-2">{data.title}</h1>
          <div className="flex flex-col md:flex-row md:justify-end gap-2 md:gap-4">
            <div className="">
              <p className="mb-1">
                <strong>Invoice#:</strong> {data.invoiceNumber}
              </p>
              <p className="mb-1">
                <strong>Invoice Date:</strong> {data.invoiceDate}
              </p>
              <p className="mb-1">
                <strong>Due Date:</strong> {data.paymentDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-3 border-orange-400" />

      {/* BILLING */}
      <div className="mb-4">
        {data.shippingName && data.shippingPhone && data.shippingAddress && (
          <div className="">
            <div className="p-3 rounded bg-orange-200">
              <h3 className="mb-2">Shipped To</h3>
              <p className="mb-1">
                <strong>{data.shippingName}</strong>
              </p>
              <p className="mb-1">{data.shippingAddress}</p>
              <p className="mb-0">Phone: {data.shippingPhone}</p>
            </div>
          </div>
        )}

        <div className="">
          <div className="p-3 rounded bg-orange-200">
            <h3 className="mb-2">Billed To</h3>
            <p className="mb-1">
              <strong>{data.billingName}</strong>
            </p>
            <p className="mb-1">{data.billingAddress}</p>
            <p className="mb-0">Phone: {data.billingPhone}</p>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mb-4">
        <div className="">
          <table className="">
            <thead>
              <tr>
                <th className="p-2">Item #/Item description</th>
                <th className="p-2 text-center">Qty.</th>
                <th className="p-2 text-end">Rate</th>
                <th className="p-2 text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{Number(item.quantity)}</td>
                  <td className="p-2 text-end">
                    {data.currencySymbol}
                    {Number(item.amount)?.toFixed(2)}
                  </td>
                  <td className="p-2">
                    {data.currencySymbol}
                    {(Number(item.quantity) * Number(item.amount)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOTALS */}
      <div className="mb-4">
        <div className="flex justify-end">
          <div className="p-3 max-w-[300px]">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{data.subtotal.toFixed(2)}</span>
            </div>
            {data.tax > 0 && (
              <div className="flex justify-between mb-2">
                <span>Tax ({data.tax}%)</span>
                <span>{data.taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BANK ACC */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="mt-4">
          <h3 className="mb-2">Bank Account Details</h3>
          {data.accountName && (
            <p className="mb-1">
              <strong>Account Holder: </strong>
              {data.accountName}
            </p>
          )}
          {data.accountNumber && (
            <p className="mb-1">
              <strong>Account Number: </strong>
              {data.accountNumber}
            </p>
          )}
          {data.accountIfscCode && (
            <p className="mb-0">
              <strong>IFSC Code: </strong>
              {data.accountIfscCode}
            </p>
          )}
        </div>
      )}

      {/* NOTES */}
      {data.notes && (
        <div className="mt-4">
          <h3 className="mb-2">Remarks:</h3>
          <p className="mb-0">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template1;
