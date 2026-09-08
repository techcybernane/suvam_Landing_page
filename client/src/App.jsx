import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/site/PublicLayout.jsx";
import Page from "./pages/Page.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import SectionsEditor from "./pages/admin/SectionsEditor.jsx";
import MediaLibrary from "./pages/admin/MediaLibrary.jsx";
import FaqManager from "./pages/admin/FaqManager.jsx";
import LeadsManager from "./pages/admin/LeadsManager.jsx";
import SettingsPage from "./pages/admin/SettingsPage.jsx";
import SiteSettingsPage from "./pages/admin/SiteSettingsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Page slug="home" />} />
        <Route path="/about" element={<Page slug="about" />} />
        <Route path="/solutions" element={<Page slug="solutions" />} />
        <Route path="/solutions/cybersecurity" element={<Page slug="cybersecurity" />} />
        <Route path="/solutions/network-infrastructure" element={<Page slug="network-infrastructure" />} />
        <Route path="/solutions/software-development" element={<Page slug="software-development" />} />
        <Route path="/solutions/it-consulting" element={<Page slug="it-consulting" />} />
        <Route path="/solutions/managed-it" element={<Page slug="managed-it" />} />
        <Route path="/solutions/training-certifications" element={<Page slug="training-certifications" />} />
        <Route path="/industries" element={<Page slug="industries" />} />
        <Route path="/insights" element={<Page slug="insights" />} />
        <Route path="/contact" element={<Page slug="contact" />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="sections" element={<SectionsEditor />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="faqs" element={<FaqManager />} />
        <Route path="leads" element={<LeadsManager />} />
        <Route path="email" element={<SettingsPage />} />
        <Route path="site" element={<SiteSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
