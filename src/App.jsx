import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

// Lazy-loaded pages
const Versions = lazy(() => import("./Versions/Version1"));
const Dashboard = lazy(() => import("./DashBoard"));
const AdminDashboard = lazy(() => import("./Admindashboard/AdminDashboard"));
const SingleVerify = lazy(() => import("./SingleVerify"));

const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Suspense Loader */}
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Versions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/single-verify" element={<SingleVerify />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
