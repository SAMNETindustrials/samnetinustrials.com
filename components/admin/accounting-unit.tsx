"use client"

import { useState, useEffect } from "react"
import { Printer, Plus, Trash2, DollarSign, TrendingUp, Calendar, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  description: string
  purpose: string
  amount: number
  currency: string
  date: string
  dueDate: string
  status: "draft" | "pending" | "paid" | "overdue"
  items: InvoiceItem[]
  stampApprovalSpace?: boolean
}

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export function AccountingUnit({ userRole }: { userRole: string }) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState<Partial<Invoice>>({
    clientName: "",
    description: "",
    purpose: "",
    amount: 0,
    currency: "USD",
    status: "draft",
    items: [],
    stampApprovalSpace: true,
  })

  useEffect(() => {
    const savedInvoices = localStorage.getItem("samnet_invoices")
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices))
    } else {
      const defaultInvoices: Invoice[] = [
        {
          id: "1",
          invoiceNumber: "INV-2025-001",
          clientName: "Tech Solutions Ltd",
          description: "Software Development",
          purpose: "Q1 Development Services",
          amount: 5000,
          currency: "USD",
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
          dueDate: new Date(Date.now() + 604800000).toISOString().split("T")[0],
          status: "paid",
          items: [{ description: "Software Development Services", quantity: 40, unitPrice: 125, total: 5000 }],
          stampApprovalSpace: true,
        },
      ]
      setInvoices(defaultInvoices)
    }
  }, [])

  const handleCreateInvoice = () => {
    if (!formData.clientName || !formData.amount) return

    const newInvoice: Invoice = {
      id: editingId || `inv${Date.now()}`,
      invoiceNumber: editingId
        ? invoices.find((i) => i.id === editingId)?.invoiceNumber || ""
        : `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`,
      clientName: formData.clientName || "",
      description: formData.description || "",
      purpose: formData.purpose || "",
      amount: formData.amount || 0,
      currency: formData.currency || "USD",
      date: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate || new Date(Date.now() + 604800000).toISOString().split("T")[0],
      status: formData.status || "draft",
      items: formData.items || [
        {
          description: formData.description || "",
          quantity: 1,
          unitPrice: formData.amount || 0,
          total: formData.amount || 0,
        },
      ],
      stampApprovalSpace: formData.stampApprovalSpace ?? true,
    }

    let updatedInvoices
    if (editingId) {
      updatedInvoices = invoices.map((inv) => (inv.id === editingId ? newInvoice : inv))
    } else {
      updatedInvoices = [newInvoice, ...invoices]
    }

    setInvoices(updatedInvoices)
    localStorage.setItem("samnet_invoices", JSON.stringify(updatedInvoices))
    setFormData({
      clientName: "",
      description: "",
      purpose: "",
      amount: 0,
      currency: "USD",
      status: "draft",
      items: [],
      stampApprovalSpace: true,
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setFormData(invoice)
    setEditingId(invoice.id)
    setShowForm(true)
  }

  const handleDeleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id)
    setInvoices(updatedInvoices)
    localStorage.setItem("samnet_invoices", JSON.stringify(updatedInvoices))
  }

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      INR: "₹",
      NGN: "₦",
      ZAR: "R",
    }
    return symbols[currency] || currency
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    const printWindow = window.open("", "", "height=600,width=800")
    if (printWindow) {
      const currencySymbol = getCurrencySymbol(invoice.currency)
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${invoice.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
              .container { background: white; padding: 30px; }
              .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #003366; padding-bottom: 20px; margin-bottom: 20px; }
              .header-left { flex: 1; }
              .logo { font-size: 28px; font-weight: bold; color: #003366; margin-bottom: 10px; }
              .company-details { color: #666; font-size: 12px; line-height: 1.8; }
              .header-right { text-align: right; }
              .logo-image { font-size: 36px; margin-bottom: 10px; }
              .invoice-title { font-size: 32px; font-weight: bold; color: #003366; margin: 0; }
              .invoice-number { color: #0084d6; font-weight: bold; }
              .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
              .info-block { flex: 1; }
              .info-block h3 { color: #003366; margin-top: 0; font-size: 14px; }
              .info-block p { margin: 5px 0; font-size: 12px; }
              .description-section { background: #f9f9f9; padding: 15px; border-left: 3px solid #0084d6; margin-bottom: 20px; }
              .description-section h4 { margin: 0 0 10px 0; color: #003366; font-size: 13px; }
              .description-section p { margin: 5px 0; font-size: 12px; color: #666; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th { background-color: #003366; color: white; padding: 12px; text-align: left; font-size: 12px; }
              td { padding: 10px 12px; border-bottom: 1px solid #ddd; font-size: 11px; }
              tr:nth-child(even) { background: #f9f9f9; }
              .total-section { display: flex; justify-content: flex-end; margin-top: 20px; }
              .total-box { width: 250px; }
              .total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; font-size: 12px; }
              .total-final { display: flex; justify-content: space-between; padding: 12px 0; background: #003366; color: white; font-weight: bold; font-size: 14px; }
              .stamp-area { margin-top: 40px; border: 2px dashed #ccc; padding: 40px 20px; text-align: center; color: #999; font-size: 12px; min-height: 100px; }
              .footer { border-top: 2px solid #003366; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 10px; }
              .status-badge { display: inline-block; padding: 4px 8px; background: #0084d6; color: white; border-radius: 3px; font-size: 11px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-left">
                  <div class="logo">SAMNET INDUSTRIALS</div>
                  <div class="company-details">
                    <p>Technology Solutions & Innovation Hub</p>
                    <p>Email: info@samnet.com</p>
                    <p>Phone: +234 XXX XXX XXXX</p>
                  </div>
                </div>
                <div class="header-right">
                  <div class="logo-image">⚙️</div>
                  <div class="invoice-title">INVOICE</div>
                  <div class="invoice-number">${invoice.invoiceNumber}</div>
                </div>
              </div>
              
              <div class="invoice-info">
                <div class="info-block">
                  <h3>Invoice Details</h3>
                  <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
                  <p><strong>Date:</strong> ${invoice.date}</p>
                  <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
                  <p><strong>Currency:</strong> ${invoice.currency}</p>
                </div>
                <div class="info-block">
                  <h3>Bill To</h3>
                  <p><strong>${invoice.clientName}</strong></p>
                </div>
              </div>

              ${
                invoice.purpose || invoice.description
                  ? `
                <div class="description-section">
                  <h4>Invoice Purpose</h4>
                  <p>${invoice.purpose || invoice.description}</p>
                </div>
              `
                  : ""
              }

              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoice.items
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.description}</td>
                      <td style="text-align: center;">${item.quantity}</td>
                      <td style="text-align: right;">${currencySymbol}${item.unitPrice.toFixed(2)}</td>
                      <td style="text-align: right;">${currencySymbol}${item.total.toFixed(2)}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>

              <div class="total-section">
                <div class="total-box">
                  <div class="total-row">
                    <span>Subtotal:</span>
                    <strong>${currencySymbol}${invoice.amount.toFixed(2)}</strong>
                  </div>
                  <div class="total-final">
                    <span>Total Amount Due:</span>
                    <span>${currencySymbol}${invoice.amount.toFixed(2)}</span>
                  </div>
                  <div style="text-align: center; margin-top: 10px;">
                    <span class="status-badge">${invoice.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              ${
                invoice.stampApprovalSpace
                  ? `
                <div class="stamp-area">
                  <p>Company Stamp / Authorized Signature</p>
                  <p style="font-size: 10px; margin-top: 20px;">[ Stamp Here ]</p>
                </div>
              `
                  : ""
              }

              <div class="footer">
                <p>Thank you for your business!</p>
                <p>SAMNET INDUSTRIALS | www.samnet.com | Confidential</p>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const pendingAmount = invoices.reduce(
    (sum, inv) => (inv.status === "pending" || inv.status === "draft" ? sum + inv.amount : sum),
    0,
  )
  const paidAmount = invoices.reduce((sum, inv) => (inv.status === "paid" ? sum + inv.amount : sum), 0)

  if (userRole !== "admin" && userRole !== "accountant") {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
        <p className="text-slate-300">You do not have permission to access the accounting unit.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Pending Amount</p>
              <p className="text-3xl font-bold mt-2">${pendingAmount.toFixed(2)}</p>
            </div>
            <Calendar size={32} className="opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Paid Amount</p>
              <p className="text-3xl font-bold mt-2">${paidAmount.toFixed(2)}</p>
            </div>
            <DollarSign size={32} className="opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Invoices</p>
              <p className="text-3xl font-bold mt-2">{invoices.length}</p>
            </div>
            <TrendingUp size={32} className="opacity-50" />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">{editingId ? "Edit Invoice" : "Create New Invoice"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Client Name</label>
              <input
                type="text"
                value={formData.clientName || ""}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Enter client name"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Currency</label>
              <select
                value={formData.currency || "USD"}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="INR">INR (₹)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="ZAR">ZAR (R)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Software Development Services"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-2">Invoice Purpose</label>
              <textarea
                value={formData.purpose || ""}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="Explain the purpose of this invoice"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={formData.amount || 0}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={formData.dueDate || ""}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status || "draft"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as "draft" | "pending" | "paid" | "overdue" })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="stampSpace"
                checked={formData.stampApprovalSpace ?? true}
                onChange={(e) => setFormData({ ...formData, stampApprovalSpace: e.target.checked })}
                className="w-4 h-4 accent-cyan-500"
              />
              <label htmlFor="stampSpace" className="text-slate-300 text-sm cursor-pointer">
                Include company stamp area
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCreateInvoice}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {editingId ? "Update Invoice" : "Create Invoice"}
            </Button>
            <Button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({
                  clientName: "",
                  description: "",
                  purpose: "",
                  amount: 0,
                  currency: "USD",
                  status: "draft",
                  items: [],
                  stampApprovalSpace: true,
                })
              }}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Invoice List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Invoices</h3>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus size={16} className="mr-2" />
              New Invoice
            </Button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Invoice #</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Client</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Purpose</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3 text-sm text-white font-medium">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-3 text-sm text-slate-300">{invoice.clientName}</td>
                  <td className="px-6 py-3 text-sm text-slate-300 max-w-xs truncate">
                    {invoice.purpose || invoice.description}
                  </td>
                  <td className="px-6 py-3 text-sm text-white font-bold">
                    {getCurrencySymbol(invoice.currency)}
                    {invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-300">{invoice.dueDate}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-green-500/20 text-green-300"
                          : invoice.status === "pending" || invoice.status === "draft"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {invoice.status === "draft" && (
                        <Button
                          onClick={() => handleEditInvoice(invoice)}
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                        >
                          <Edit2 size={16} />
                        </Button>
                      )}
                      <Button
                        onClick={() => handlePrintInvoice(invoice)}
                        size="sm"
                        variant="ghost"
                        className="text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                      >
                        <Printer size={16} />
                      </Button>
                      {invoice.status === "draft" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-red-400 hover:bg-slate-700"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
