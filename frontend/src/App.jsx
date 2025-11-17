import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Toaster />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<MainPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
