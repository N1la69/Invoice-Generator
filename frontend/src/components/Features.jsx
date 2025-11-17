const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-blue-500">
          Why Choose QuickInvoice?
        </h2>

        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="h-60 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-6xl font-bold shadow-inner">
              📝
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-slate-800">
              Easy to Fill Invoice Details
            </h3>
            <p className="text-slate-600">
              Create invoices effortlessly with our intuitive, beginner-friendly
              interface. No learning curve—just fill in the essential details
              and you&apos;re ready to go.
            </p>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>Curated list of templates from gallery.</li>
              <li>Add your logo and invoice information.</li>
              <li>Tailor invoice fields to your needs.</li>
            </ul>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="h-60 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-6xl font-bold shadow-inner">
              📊
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-slate-800">
              Beautiful Dashboard
            </h3>
            <p className="text-slate-600">
              Stay organized with a clean dashboard that helps you manage past
              and upcoming invoices effortlessly.
            </p>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>View all previous invoices in one place.</li>
              <li>Reuse and duplicate invoices instantly.</li>
              <li>Track invoice status with ease.</li>
            </ul>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="h-60 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-6xl font-bold shadow-inner">
              👀
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-slate-800">
              Invoice Preview with Action Buttons
            </h3>
            <p className="text-slate-600">
              Get a real-time preview of your invoice as you build it. Make
              edits instantly and switch between versions smoothly.
            </p>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>Live preview while editing.</li>
              <li>Switch between multiple invoices.</li>
              <li>One click to Save, Download, and Delete.</li>
            </ul>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="w-full lg:w-1/2">
            <div className="h-60 bg-red-100 rounded-xl flex items-center justify-center text-red-600 text-6xl font-bold shadow-inner">
              📩
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-slate-800">
              Send Invoices Instantly
            </h3>
            <p className="text-slate-600">
              Deliver invoices directly to your clients without ever leaving the
              app. Fast, reliable, and always available.
            </p>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>Send invoices instantly without leaving the application.</li>
              <li>One-click email sending option.</li>
              <li>Send unlimited invoices, anytime.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
