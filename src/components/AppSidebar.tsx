import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Package, ShoppingCart,
  Receipt, CreditCard, FileCheck, ClipboardList, BarChart3,
  ChevronDown, LogOut, GraduationCap, Menu, X
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navSections = [
  {
    label: "Main",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Management",
    items: [
      { path: "/suppliers", label: "Suppliers", icon: Users },
      { path: "/applications", label: "Applications", icon: ClipboardList },
      { path: "/items", label: "Items", icon: Package },
      { path: "/contracts", label: "Contracts", icon: FileText },
      { path: "/purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
      { path: "/invoices", label: "Invoices", icon: Receipt },
      { path: "/payments", label: "Payments", icon: CreditCard },
      { path: "/receipts", label: "Receipts", icon: FileCheck },
    ],
  },
  {
    label: "Reports",
    items: [
      { path: "/reports/active-contracts", label: "Active Contracts", icon: BarChart3 },
      { path: "/reports/invoice-totals", label: "Invoice Totals", icon: BarChart3 },
      { path: "/reports/item-usage", label: "Item Usage", icon: BarChart3 },
      { path: "/reports/monthly-expenditure", label: "Monthly Expenditure", icon: BarChart3 },
      { path: "/reports/open-orders", label: "Open Orders", icon: BarChart3 },
      { path: "/reports/unpaid-invoices", label: "Unpaid Invoices", icon: BarChart3 },
      { path: "/reports/supplier-performance", label: "Supplier Performance", icon: BarChart3 },
      { path: "/reports/payment-history", label: "Payment History", icon: BarChart3 },
    ],
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-active">
          <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-fg">UniPurchase</h1>
          <p className="text-xs text-sidebar-fg/60">Procurement System</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {navSections.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggle(section.label)}
              className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-fg/50 hover:text-sidebar-fg/80 transition-colors"
            >
              {section.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${collapsed[section.label] ? "-rotate-90" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {!collapsed[section.label] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-active text-sidebar-primary-foreground font-medium"
                            : "text-sidebar-fg/80 hover:bg-sidebar-hover hover:text-sidebar-fg"
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-active flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-fg truncate">{user?.full_name}</p>
            <p className="text-xs text-sidebar-fg/60 capitalize">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-sidebar-fg/70 hover:bg-sidebar-hover hover:text-sidebar-fg rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-primary text-primary-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AppSidebar;
