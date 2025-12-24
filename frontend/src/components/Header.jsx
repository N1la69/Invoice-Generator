import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate("/generate");
  };

  return (
    <header className="h-[80vh] bg-blue-500 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Effortless Invoicing. Professional Results.
          </h1>

          <p className="text-lg md:text-xl text-blue-50 leading-relaxed">
            Stop wrestling with spreadsheets. QuickInvoice helps you create,
            send, and track professional invoices in minutes, so you get paid
            faster.
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* PRIMARY CTA */}
          <button
            onClick={handleGenerateClick}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-50 transition"
          >
            Generate Your First Invoice
          </button>

          {/* SECONDARY CTA */}
          <button className="px-6 py-3 border border-white/70 text-white font-semibold rounded-xl hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
