import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { openSignIn } = useClerk();

  const openLogin = () => {
    openSignIn({});
  };

  return (
    <nav className="h-16 px-4 flex items-center justify-between border-b border-slate-200 shadow-sm bg-white">
      {/* LEFT */}
      <div className="flex items-center space-x-2">
        <Link className="flex space-x-2 items-center" to="/">
          <img src="" alt="logo" height={48} width={48} />
          <span className="text-xl text-blue-600 font-semibold tracking-tight">
            QuickInvoice
          </span>
        </Link>
      </div>

      {/* MOBILE BUTTON */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-5 flex flex-col space-y-4 md:hidden z-50 rounded-b-xl border-t border-slate-200">
          <Link
            to="/"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <button className="text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Generate
          </button>

          <button className="text-left px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
            Login/SignUp
          </button>
        </div>
      )}

      {/* RIGHT - DESKTOP MENU */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/"
          className="text-slate-700 hover:text-blue-600 font-medium transition"
        >
          Home
        </Link>

        <SignedIn>
          <Link
            to="/dashboard"
            className="text-slate-700 hover:text-blue-600 font-medium transition"
          >
            Dashboard
          </Link>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Generate
          </button>

          <UserButton />
        </SignedIn>

        <SignedOut>
          <button
            onClick={openLogin}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Login/SignUp
          </button>
        </SignedOut>
      </div>
    </nav>
  );
};

export default NavBar;
