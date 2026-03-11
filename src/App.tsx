import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SalaryBenchmarking from "./pages/SalaryBenchmarking";
import PayScaleDesign from "./pages/PayScaleDesign";
import RemunerationStructure from "./pages/RemunerationStructure";
import TalentProfiles from "./pages/TalentProfiles";
import NotFound from "./pages/NotFound";
import { EmployeeProvider } from "./context/EmployeeContext";
import { JobProfilingProvider } from "./context/JobProfilingContext";
import AdminJobRoles from "./pages/AdminJobRoles";
import EditJobRole from "./pages/EditJobRole";

export default function App() {
  return (
    <EmployeeProvider>
      <JobProfilingProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/benchmarking" element={<SalaryBenchmarking />} />
              <Route path="/payscale" element={<PayScaleDesign />} />
              <Route path="/remuneration" element={<RemunerationStructure />} />
              <Route path="/profiles" element={<TalentProfiles />} />
              <Route path="/job-roles" element={<AdminJobRoles />} />
              <Route path="/job-roles/new" element={<EditJobRole />} />
              <Route path="/job-roles/edit/:id" element={<EditJobRole />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </JobProfilingProvider>
    </EmployeeProvider>
  );
}
