import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import AppSidebar from "@/components/AppSidebar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SuppliersPage from "./pages/SuppliersPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ItemsPage from "./pages/ItemsPage";
import ContractsPage from "./pages/ContractsPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import InvoicesPage from "./pages/InvoicesPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import ActiveContractsReport from "./pages/reports/ActiveContractsReport";
import InvoiceTotalsReport from "./pages/reports/InvoiceTotalsReport";
import ItemUsageReport from "./pages/reports/ItemUsageReport";
import MonthlyExpenditureReport from "./pages/reports/MonthlyExpenditureReport";
import OpenOrdersReport from "./pages/reports/OpenOrdersReport";
import UnpaidInvoicesReport from "./pages/reports/UnpaidInvoicesReport";
import SupplierPerformanceReport from "./pages/reports/SupplierPerformanceReport";
import PaymentHistoryReport from "./pages/reports/PaymentHistoryReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/receipts" element={<ReceiptsPage />} />
        <Route path="/reports/active-contracts" element={<ActiveContractsReport />} />
        <Route path="/reports/invoice-totals" element={<InvoiceTotalsReport />} />
        <Route path="/reports/item-usage" element={<ItemUsageReport />} />
        <Route path="/reports/monthly-expenditure" element={<MonthlyExpenditureReport />} />
        <Route path="/reports/open-orders" element={<OpenOrdersReport />} />
        <Route path="/reports/unpaid-invoices" element={<UnpaidInvoicesReport />} />
        <Route path="/reports/supplier-performance" element={<SupplierPerformanceReport />} />
        <Route path="/reports/payment-history" element={<PaymentHistoryReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
