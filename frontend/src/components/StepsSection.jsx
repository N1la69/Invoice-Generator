const stepsData = [
  {
    id: 1,
    title: "Enter Details",
    desc: "Quickly fill in your client&apos;s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.",
  },
  {
    id: 2,
    title: "Choose Template",
    desc: "Browse our gallery of professionally designed templates. Pick one that matches your brand and style.",
  },
  {
    id: 3,
    title: "Preview Invoice",
    desc: "See exactly how your invoice will look before sending it. Make any last minute adjustments with ease.",
  },
  {
    id: 4,
    title: "Download & Save",
    desc: "Download your invoice as PDF, send it via email, or save it for future reference.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-800">
          Get Started in 4 Simple Steps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepsData.map((step) => (
            <div
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md hover:translate-2 transition-all border border-slate-200"
              key={step.id}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-2xl font-bold">
                  {step.id}
                </div>
                <div>
                  <h5 className="text-xl font-semibold mb-2 text-slate-800">
                    {step.title}
                  </h5>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
