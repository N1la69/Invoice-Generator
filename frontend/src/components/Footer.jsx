const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10">
      <div className="container mx-auto px-6 text-center space-y-4">
        {/* Brand */}
        <p className="text-xl font-semibold text-white">QuickInvoice</p>

        {/* Copyright */}
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} QuickInvoice. All Rights Reserved.
        </p>

        {/* Crafted with love */}
        <p className="text-sm text-slate-400">
          Crafted with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-medium text-white">Nilanjan Saha</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
