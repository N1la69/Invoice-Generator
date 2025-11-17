const CTASection = () => {
  return (
    <section className="py-16 bg-blue-500 text-white">
      <div className="container mx-auto px-6 text-center max-w-3xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Ready to Streamline Your Invoicing?
        </h2>

        <p className="text-blue-50 text-lg md:text-xl leading-relaxed">
          Join thousands of freelancers and small businesses who trust
          QuickInvoice. Start creating professional invoices today — it&apos;s
          fast, easy, and effective!
        </p>

        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-50 transition">
          Start Generating Invoices Now
        </button>

        <p className="text-blue-100 text-sm">
          (This will lead to the invoice generation interface)
        </p>
      </div>
    </section>
  );
};

export default CTASection;
