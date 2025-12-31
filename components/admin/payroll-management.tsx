"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, DollarSign, Download, Calculator, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PayrollRecord {
  id: string
  staffId: string
  staffName: string
  month: string
  baseSalary: number
  currency: string
  allowances: number
  bonus: number
  taxDeduction: number
  leaveDays: number
  leaveDeduction: number
  grossSalary: number
  netSalary: number
  status: "draft" | "processed" | "paid"
}

export function PayrollManagement({ userRole }: { userRole: string }) {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split("T")[0].substring(0, 7))
  const [formData, setFormData] = useState<Partial<PayrollRecord>>({
    staffName: "",
    baseSalary: 0,
    currency: "USD",
    allowances: 0,
    bonus: 0,
    taxDeduction: 0,
    leaveDays: 0,
  })

  useEffect(() => {
    const savedPayroll = localStorage.getItem("samnet_payroll")
    if (savedPayroll) {
      try {
        const parsed = JSON.parse(savedPayroll) as any[]
        const normalized = parsed.map((p) => ({
          id: String(p.id ?? ""),
          staffId: String(p.staffId ?? ""),
          staffName: String(p.staffName ?? ""),
          month: String(p.month ?? selectedMonth),
          baseSalary: Number(p.baseSalary ?? 0),
          currency: String(p.currency ?? "USD"),
          allowances: Number(p.allowances ?? 0),
          bonus: Number(p.bonus ?? 0),
          taxDeduction: Number(p.taxDeduction ?? 0),
          leaveDays: Number(p.leaveDays ?? 0),
          leaveDeduction: Number(p.leaveDeduction ?? 0),
          grossSalary: Number(p.grossSalary ?? 0),
          netSalary: Number(p.netSalary ?? 0),
          status:
            p.status === "paid" || p.status === "processed" || p.status === "draft"
              ? p.status
              : "draft",
        })) as PayrollRecord[]

        setPayrollRecords(normalized)
      } catch (err) {
        console.warn("Failed to parse saved payroll, resetting to default.", err)
        setPayrollRecords([])
      }
    } else {
      const defaultPayroll: PayrollRecord[] = [
        {
          id: "1",
          staffId: "ST001",
          staffName: "John Doe",
          month: "2025-01",
          baseSalary: 5000,
          currency: "USD",
          allowances: 500,
          bonus: 1000,
          taxDeduction: 800,
          leaveDays: 2,
          leaveDeduction: 300,
          grossSalary: 6500,
          netSalary: 5400,
          status: "paid",
        },
      ]
      setPayrollRecords(defaultPayroll)
    }
  }, [])

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

  const calculateNetSalary = (record: Partial<PayrollRecord>) => {
    const baseSalary = record.baseSalary || 0
    const allowances = record.allowances || 0
    const bonus = record.bonus || 0
    const leaveDeduction = ((record.leaveDays || 0) * baseSalary) / 30
    const grossSalary = baseSalary + allowances + bonus - leaveDeduction
    const netSalary = grossSalary - (record.taxDeduction || 0)
    return { grossSalary, netSalary, leaveDeduction }
  }

  const handleCreatePayroll = () => {
    if (!formData.staffName || !formData.baseSalary) return

    const { grossSalary, netSalary, leaveDeduction } = calculateNetSalary(formData)

    const newPayroll: PayrollRecord = {
      id: editingId || `payroll${Date.now()}`,
      staffId: editingId
        ? payrollRecords.find((p) => p.id === editingId)?.staffId || ""
        : `ST${String(payrollRecords.length + 1).padStart(3, "0")}`,
      staffName: formData.staffName || "",
      month: selectedMonth,
      baseSalary: formData.baseSalary || 0,
      currency: formData.currency || "USD",
      allowances: formData.allowances || 0,
      bonus: formData.bonus || 0,
      taxDeduction: formData.taxDeduction || 0,
      leaveDays: formData.leaveDays || 0,
      leaveDeduction,
      grossSalary,
      netSalary,
      status: "draft",
    }

    let updatedRecords: PayrollRecord[]
    if (editingId) {
      updatedRecords = payrollRecords.map((rec) => (rec.id === editingId ? newPayroll : rec))
    } else {
      updatedRecords = [newPayroll, ...payrollRecords]
    }

    setPayrollRecords(updatedRecords)
    localStorage.setItem("samnet_payroll", JSON.stringify(updatedRecords))
    setFormData({
      staffName: "",
      baseSalary: 0,
      currency: "USD",
      allowances: 0,
      bonus: 0,
      taxDeduction: 0,
      leaveDays: 0,
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEditPayroll = (record: PayrollRecord) => {
    setFormData(record)
    setEditingId(record.id)
    setShowForm(true)
  }

  const handleDeletePayroll = (id: string) => {
    const updatedRecords = payrollRecords.filter((rec) => rec.id !== id)
    setPayrollRecords(updatedRecords)
    localStorage.setItem("samnet_payroll", JSON.stringify(updatedRecords))
  }

  const handleProcessPayroll = (id: string) => {
    const updatedRecords = payrollRecords.map((rec) => (rec.id === id ? { ...rec, status: "processed" as const } : rec))
    setPayrollRecords(updatedRecords)
    localStorage.setItem("samnet_payroll", JSON.stringify(updatedRecords))
  }

  const handlePayPayroll = (id: string) => {
    const updatedRecords = payrollRecords.map((rec) => (rec.id === id ? { ...rec, status: "paid" as const } : rec))
    setPayrollRecords(updatedRecords)
    localStorage.setItem("samnet_payroll", JSON.stringify(updatedRecords))
  }

  const handleExportPayslip = (record: PayrollRecord) => {
    const printWindow = window.open("", "", "height=600,width=800")
    if (printWindow) {
      const currencySymbol = getCurrencySymbol(record.currency)
      printWindow.document.write(`
        <html>
          <head>
            <title>Payslip - ${record.staffName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
              .container { background: white; padding: 30px; }
              .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #003366; padding-bottom: 20px; margin-bottom: 20px; }
              .header-left { flex: 1; }
              .logo { font-size: 28px; font-weight: bold; color: #003366; }
              .company-details { color: #666; font-size: 12px; line-height: 1.6; margin-top: 5px; }
              .header-right { text-align: right; }
              .logo-image { font-size: 36px; margin-bottom: 10px; }
              .slip-title { font-size: 28px; font-weight: bold; color: #003366; margin: 0; }
              .slip-header { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
              .slip-info { flex: 1; }
              .slip-info p { margin: 5px 0; color: #333; font-size: 12px; }
              .slip-info strong { color: #003366; }
              .section { margin-bottom: 20px; }
              .section-title { background-color: #003366; color: white; padding: 10px; font-weight: bold; margin-bottom: 10px; font-size: 12px; }
              .earnings, .deductions { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 12px; }
              .earnings strong, .deductions strong { color: #003366; }
              .total-section { background-color: #003366; color: white; padding: 15px; margin-top: 20px; display: flex; justify-content: space-between; font-weight: bold; }
              .stamp-area { margin-top: 40px; border: 2px dashed #ccc; padding: 40px 20px; text-align: center; color: #999; font-size: 12px; min-height: 100px; }
              .footer { border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-left">
                  <div class="logo">SAMNET INDUSTRIALS</div>
                  <div class="company-details">
                    <p>Technology Solutions & Innovation Hub</p>
                    <p>Email: info@samnet.com | Phone: +234 XXX XXX XXXX</p>
                  </div>
                </div>
                <div class="header-right">
                  <div class="logo-image">⚙️</div>
                  <div class="slip-title">PAYSLIP</div>
                </div>
              </div>
              
              <div class="slip-header">
                <div class="slip-info">
                  <p><strong>Employee Name:</strong> ${record.staffName}</p>
                  <p><strong>Employee ID:</strong> ${record.staffId}</p>
                  <p><strong>Period:</strong> ${record.month}</p>
                  <p><strong>Currency:</strong> ${record.currency}</p>
                  <p><strong>Status:</strong> ${record.status.toUpperCase()}</p>
                </div>
              </div>

              <div class="section">
                <div class="section-title">EARNINGS</div>
                <div class="earnings">
                  <span>Base Salary</span>
                  <strong>${currencySymbol}${record.baseSalary.toFixed(2)}</strong>
                </div>
                <div class="earnings">
                  <span>Allowances</span>
                  <strong>${currencySymbol}${record.allowances.toFixed(2)}</strong>
                </div>
                <div class="earnings">
                  <span>Bonus</span>
                  <strong>${currencySymbol}${record.bonus.toFixed(2)}</strong>
                </div>
              </div>

              <div class="section">
                <div class="section-title">DEDUCTIONS</div>
                <div class="deductions">
                  <span>Leave Days (${record.leaveDays} days)</span>
                  <strong>-${currencySymbol}${record.leaveDeduction.toFixed(2)}</strong>
                </div>
                <div class="deductions">
                  <span>Tax Deduction</span>
                  <strong>-${currencySymbol}${record.taxDeduction.toFixed(2)}</strong>
                </div>
              </div>

              <div class="section">
                <div class="earnings">
                  <span><strong>Gross Salary</strong></span>
                  <strong>${currencySymbol}${record.grossSalary.toFixed(2)}</strong>
                </div>
              </div>

              <div class="total-section">
                <span>NET SALARY</span>
                <span>${currencySymbol}${record.netSalary.toFixed(2)}</span>
              </div>

              <div class="stamp-area">
                <p>Authorized Signature / Company Stamp</p>
                <p style="font-size: 10px; margin-top: 20px;">[ Stamp Here ]</p>
              </div>

              <div class="footer">
                <p>This is a computer-generated payslip. No signature required.</p>
                <p>SAMNET INDUSTRIALS | Confidential Document</p>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const filteredRecords = payrollRecords.filter((rec) => rec.month === selectedMonth)
  const totalNetSalaries = filteredRecords.reduce((sum, rec) => sum + rec.netSalary, 0)

  if (userRole !== "admin" && userRole !== "accountant") {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
        <p className="text-slate-300">You do not have permission to access payroll management.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Net Salaries</p>
              <p className="text-3xl font-bold mt-2">${totalNetSalaries.toFixed(2)}</p>
            </div>
            <DollarSign size={32} className="opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Records</p>
              <p className="text-3xl font-bold mt-2">{filteredRecords.length}</p>
            </div>
            <Calculator size={32} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Month Selection and Form */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Select Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus size={16} className="mr-2" />
              Add Payroll
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 mt-4">
            <h3 className="text-white font-bold mb-4">{editingId ? "Edit Payroll Record" : "Create Payroll Record"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Staff Name</label>
                <input
                  type="text"
                  value={formData.staffName || ""}
                  onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                  placeholder="Enter staff name"
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
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Base Salary</label>
                <input
                  type="number"
                  value={formData.baseSalary || 0}
                  onChange={(e) => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Allowances</label>
                <input
                  type="number"
                  value={formData.allowances || 0}
                  onChange={(e) => setFormData({ ...formData, allowances: Number(e.target.value) })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Bonus</label>
                <input
                  type="number"
                  value={formData.bonus || 0}
                  onChange={(e) => setFormData({ ...formData, bonus: Number(e.target.value) })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Tax Deduction</label>
                <input
                  type="number"
                  value={formData.taxDeduction || 0}
                  onChange={(e) => setFormData({ ...formData, taxDeduction: Number(e.target.value) })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Leave Days</label>
                <input
                  type="number"
                  value={formData.leaveDays || 0}
                  onChange={(e) => setFormData({ ...formData, leaveDays: Number(e.target.value) })}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreatePayroll}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {editingId ? "Update Payroll" : "Create Payroll"}
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({
                    staffName: "",
                    baseSalary: 0,
                    currency: "USD",
                    allowances: 0,
                    bonus: 0,
                    taxDeduction: 0,
                    leaveDays: 0,
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
      </div>

      {/* Payroll Records Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-white font-bold text-lg">Payroll Records - {selectedMonth}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Base Salary</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Allowances</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Bonus</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Deductions</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Net Salary</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3 text-sm text-white font-medium">{record.staffName}</td>
                  <td className="px-6 py-3 text-sm text-slate-300">
                    {getCurrencySymbol(record.currency)}
                    {record.baseSalary.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-300">
                    {getCurrencySymbol(record.currency)}
                    {record.allowances.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-300">
                    {getCurrencySymbol(record.currency)}
                    {record.bonus.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-300">
                    {getCurrencySymbol(record.currency)}
                    {(record.taxDeduction + record.leaveDeduction).toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-white font-bold">
                    {getCurrencySymbol(record.currency)}
                    {record.netSalary.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "paid"
                          ? "bg-green-500/20 text-green-300"
                          : record.status === "processed"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-slate-600 text-slate-300"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {record.status === "draft" && (
                        <Button
                          onClick={() => handleEditPayroll(record)}
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                          title="Minute/Edit"
                        >
                          <Edit2 size={16} />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleExportPayslip(record)}
                        size="sm"
                        variant="ghost"
                        className="text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                      >
                        <Download size={16} />
                      </Button>
                      {record.status === "draft" && (
                        <Button
                          onClick={() => handleProcessPayroll(record.id)}
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 text-xs"
                        >
                          Process
                        </Button>
                      )}
                      {record.status === "processed" && (
                        <>
                          <Button
                            onClick={() => handleEditPayroll(record)}
                            size="sm"
                            variant="ghost"
                            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 text-xs"
                            title="Minute before paying"
                          >
                            <Edit2 size={14} />
                          </Button>
                          <Button
                            onClick={() => handlePayPayroll(record.id)}
                            size="sm"
                            variant="ghost"
                            className="text-slate-300 hover:text-green-400 hover:bg-slate-700 text-xs"
                          >
                            Pay
                          </Button>
                        </>
                      )}
                      {record.status === "draft" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-red-400 hover:bg-slate-700"
                          onClick={() => handleDeletePayroll(record.id)}
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
