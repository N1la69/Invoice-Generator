import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";
import UserSyncHandler from "./components/UserSyncHandler";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <BrowserRouter>
      <UserSyncHandler />
      <NavBar />
      <Toaster />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/generate"
          element={
            <>
              <SignedIn>
                <MainPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/preview"
          element={
            <>
              <SignedIn>
                <PreviewPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
