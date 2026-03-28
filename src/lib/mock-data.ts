export interface Supplier {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Contract {
  id: number;
  supplier_id: number;
  supplier_name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'terminated';
  total_value: number;
  items: ContractItem[];
}

export interface ContractItem {
  id: number;
  contract_id: number;
  item_id: number;
  item_name: string;
  unit_price: number;
  quantity: number;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  unit: string;
}

export interface PurchaseOrder {
  id: number;
  supplier_id: number;
  supplier_name: string;
  order_date: string;
  expected_delivery: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total_amount: number;
  items: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  order_id: number;
  item_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
}

export interface Invoice {
  id: number;
  order_id: number;
  supplier_name: string;
  invoice_date: string;
  due_date: string;
  total_amount: number;
  status: 'unpaid' | 'paid' | 'overdue';
}

export interface Payment {
  id: number;
  invoice_id: number;
  supplier_name: string;
  payment_date: string;
  amount: number;
  method: string;
  reference: string;
}

export interface Receipt {
  id: number;
  payment_id: number;
  supplier_name: string;
  receipt_date: string;
  amount: number;
  receipt_number: string;
}

export interface SupplierApplication {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
}

// Mock data
export const mockSuppliers: Supplier[] = [
  { id: 1, name: "TechSupply Co.", contact_person: "John Smith", email: "john@techsupply.com", phone: "+1-555-0101", address: "123 Tech Ave, Silicon Valley", status: "approved", created_at: "2024-01-15" },
  { id: 2, name: "Office Essentials Ltd", contact_person: "Jane Doe", email: "jane@officeess.com", phone: "+1-555-0102", address: "456 Office Blvd, New York", status: "approved", created_at: "2024-01-20" },
  { id: 3, name: "Lab Equipment Inc.", contact_person: "Bob Wilson", email: "bob@labequip.com", phone: "+1-555-0103", address: "789 Lab St, Boston", status: "pending", created_at: "2024-02-01" },
  { id: 4, name: "Furniture World", contact_person: "Alice Brown", email: "alice@furnworld.com", phone: "+1-555-0104", address: "321 Furnish Rd, Chicago", status: "approved", created_at: "2024-01-10" },
  { id: 5, name: "Clean Solutions", contact_person: "Tom Green", email: "tom@cleansol.com", phone: "+1-555-0105", address: "654 Clean Way, Houston", status: "rejected", created_at: "2024-02-05" },
];

export const mockItems: Item[] = [
  { id: 1, name: "Laptop Computer", description: "15-inch business laptop", category: "Electronics", unit: "piece" },
  { id: 2, name: "Office Chair", description: "Ergonomic office chair", category: "Furniture", unit: "piece" },
  { id: 3, name: "Printer Paper", description: "A4 white paper, 500 sheets", category: "Stationery", unit: "ream" },
  { id: 4, name: "Microscope", description: "Binocular lab microscope", category: "Lab Equipment", unit: "piece" },
  { id: 5, name: "Whiteboard Marker", description: "Set of 4 colors", category: "Stationery", unit: "set" },
  { id: 6, name: "Desk Lamp", description: "LED desk lamp", category: "Furniture", unit: "piece" },
  { id: 7, name: "Cleaning Supplies Kit", description: "All-purpose cleaning kit", category: "Maintenance", unit: "kit" },
  { id: 8, name: "Projector", description: "4K portable projector", category: "Electronics", unit: "piece" },
];

export const mockContracts: Contract[] = [
  { id: 1, supplier_id: 1, supplier_name: "TechSupply Co.", start_date: "2024-01-01", end_date: "2024-12-31", status: "active", total_value: 250000, items: [
    { id: 1, contract_id: 1, item_id: 1, item_name: "Laptop Computer", unit_price: 1200, quantity: 100 },
    { id: 2, contract_id: 1, item_id: 8, item_name: "Projector", unit_price: 800, quantity: 50 },
  ]},
  { id: 2, supplier_id: 2, supplier_name: "Office Essentials Ltd", start_date: "2024-02-01", end_date: "2024-12-31", status: "active", total_value: 45000, items: [
    { id: 3, contract_id: 2, item_id: 3, item_name: "Printer Paper", unit_price: 15, quantity: 2000 },
    { id: 4, contract_id: 2, item_id: 5, item_name: "Whiteboard Marker", unit_price: 8, quantity: 500 },
  ]},
  { id: 3, supplier_id: 4, supplier_name: "Furniture World", start_date: "2024-03-01", end_date: "2024-09-30", status: "expired", total_value: 80000, items: [
    { id: 5, contract_id: 3, item_id: 2, item_name: "Office Chair", unit_price: 350, quantity: 200 },
  ]},
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 1, supplier_id: 1, supplier_name: "TechSupply Co.", order_date: "2024-03-15", expected_delivery: "2024-04-01", status: "delivered", total_amount: 14400, items: [
    { id: 1, order_id: 1, item_id: 1, item_name: "Laptop Computer", quantity: 10, unit_price: 1200 },
    { id: 2, order_id: 1, item_id: 8, item_name: "Projector", quantity: 3, unit_price: 800 },
  ]},
  { id: 2, supplier_id: 2, supplier_name: "Office Essentials Ltd", order_date: "2024-04-01", expected_delivery: "2024-04-10", status: "pending", total_amount: 3150, items: [
    { id: 3, order_id: 2, item_id: 3, item_name: "Printer Paper", quantity: 150, unit_price: 15 },
    { id: 4, order_id: 2, item_id: 5, item_name: "Whiteboard Marker", quantity: 75, unit_price: 8 },
  ]},
  { id: 3, supplier_id: 4, supplier_name: "Furniture World", order_date: "2024-05-10", expected_delivery: "2024-05-25", status: "pending", total_amount: 7000, items: [
    { id: 5, order_id: 3, item_id: 2, item_name: "Office Chair", quantity: 20, unit_price: 350 },
  ]},
];

export const mockInvoices: Invoice[] = [
  { id: 1, order_id: 1, supplier_name: "TechSupply Co.", invoice_date: "2024-04-02", due_date: "2024-05-02", total_amount: 14400, status: "paid" },
  { id: 2, order_id: 2, supplier_name: "Office Essentials Ltd", invoice_date: "2024-04-12", due_date: "2024-05-12", total_amount: 3150, status: "unpaid" },
  { id: 3, order_id: 3, supplier_name: "Furniture World", invoice_date: "2024-05-26", due_date: "2024-06-26", total_amount: 7000, status: "overdue" },
];

export const mockPayments: Payment[] = [
  { id: 1, invoice_id: 1, supplier_name: "TechSupply Co.", payment_date: "2024-04-28", amount: 14400, method: "Bank Transfer", reference: "PAY-2024-001" },
];

export const mockReceipts: Receipt[] = [
  { id: 1, payment_id: 1, supplier_name: "TechSupply Co.", receipt_date: "2024-04-29", amount: 14400, receipt_number: "REC-2024-001" },
];

export const mockApplications: SupplierApplication[] = [
  { id: 1, company_name: "NewTech Solutions", contact_person: "Sarah Lee", email: "sarah@newtech.com", phone: "+1-555-0201", description: "IT solutions provider specializing in university systems", status: "pending", submitted_at: "2024-06-01" },
  { id: 2, company_name: "Green Supplies Co.", contact_person: "Mike Davis", email: "mike@greensup.com", phone: "+1-555-0202", description: "Eco-friendly office and cleaning supplies", status: "approved", submitted_at: "2024-05-15" },
  { id: 3, company_name: "BookWorld Publishers", contact_person: "Emma White", email: "emma@bookworld.com", phone: "+1-555-0203", description: "Academic textbooks and research materials", status: "rejected", submitted_at: "2024-05-20" },
];

export const dashboardStats = {
  totalSuppliers: 5,
  activeContracts: 2,
  pendingOrders: 2,
  unpaidInvoices: 2,
  totalSpent: 14400,
  monthlyExpenditure: [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 5200 },
    { month: "Apr", amount: 14400 },
    { month: "May", amount: 7000 },
    { month: "Jun", amount: 3150 },
  ],
  ordersByStatus: [
    { status: "Delivered", count: 1 },
    { status: "Pending", count: 2 },
    { status: "Cancelled", count: 0 },
  ],
  topSuppliers: [
    { name: "TechSupply Co.", total: 14400 },
    { name: "Furniture World", total: 7000 },
    { name: "Office Essentials Ltd", total: 3150 },
  ],
};
