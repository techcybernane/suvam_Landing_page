"use client";

import { AuthProvider } from "../../context/AuthContext.jsx";

export default function AdminRootLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
