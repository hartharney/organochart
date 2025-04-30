"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
