import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import SalaryBenchmarking from "./pages/SalaryBenchmarking";
import PayScaleDesign from "./pages/PayScaleDesign";
import RemunerationStructure from "./pages/RemunerationStructure";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/benchmarking" element={<SalaryBenchmarking />} />
          <Route path="/payscale" element={<PayScaleDesign />} />
          <Route path="/remuneration" element={<RemunerationStructure />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
