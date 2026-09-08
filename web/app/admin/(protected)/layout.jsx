"use client";

import ProtectedRoute from "../../../components/admin/ProtectedRoute.jsx";
import AdminLayout from "../../../components/admin/AdminLayout.jsx";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
