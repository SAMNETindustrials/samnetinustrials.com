"use client"

import { useState } from "react"
import { Plus, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Certificate {
  id: string
  recipientName: string
  courseName: string
  completionDate: string
  uniqueCode: string
  issueDate: string
}

export function CertificateGenerator({ userRole }: { userRole: string }) {
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem("samnet_certificates")
    return saved ? JSON.parse(saved) : []
  })

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "",
    courseName: "",
    completionDate: "",
  })

  const generateUniqueCode = () => {
    return `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  }

  const handleCreateCertificate = () => {
    if (!formData.recipientName || !formData.courseName || !formData.completionDate) return

    const newCert: Certificate = {
      id: `cert${Date.now()}`,
      recipientName: formData.recipientName,
      courseName: formData.courseName,
      completionDate: formData.completionDate,
      uniqueCode: generateUniqueCode(),
      issueDate: new Date().toISOString().split("T")[0],
    }

    const updatedCerts = [newCert, ...certificates]
    setCertificates(updatedCerts)
    localStorage.setItem("samnet_certificates", JSON.stringify(updatedCerts))
    setFormData({ recipientName: "", courseName: "", completionDate: "" })
    setShowForm(false)
  }

  const handleDeleteCertificate = (id: string) => {
    const updated = certificates.filter((c) => c.id !== id)
    setCertificates(updated)
    localStorage.setItem("samnet_certificates", JSON.stringify(updated))
  }

  const handlePrintCertificate = (cert: Certificate) => {
    const printWindow = window.open("", "", "height=600,width=900")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Certificate - ${cert.recipientName}</title>
            <style>
              body { margin: 0; padding: 20px; background: #f5f5f5; font-family: Georgia, serif; }
              .certificate {
                background: white;
                width: 100%;
                height: 600px;
                position: relative;
                border: 3px solid #003366;
                border-radius: 20px;
                padding: 40px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              }
              .header { margin-bottom: 30px; }
              .logo { font-size: 48px; margin-bottom: 10px; }
              .company { font-size: 28px; font-weight: bold; color: #003366; }
              .title { font-size: 48px; font-weight: bold; color: #003366; margin: 30px 0 20px 0; letter-spacing: 2px; }
              .subtitle { font-size: 18px; color: #666; margin-bottom: 30px; }
              .content { margin: 40px 0; flex: 1; display: flex; flex-direction: column; justify-content: center; }
              .presented { font-size: 16px; color: #333; margin-bottom: 20px; }
              .recipient { font-size: 32px; font-weight: bold; color: #003366; text-decoration: underline; margin: 20px 0; }
              .course { font-size: 18px; color: #333; margin: 20px 0; }
              .completion { font-size: 14px; color: #666; margin: 20px 0; }
              .footer { display: flex; justify-content: space-around; margin-top: 40px; width: 100%; }
              .signature-line { width: 150px; border-top: 2px solid #003366; text-align: center; font-size: 12px; color: #666; }
              .stamp { font-size: 12px; color: #0084d6; margin-top: 5px; }
              .code { font-size: 10px; color: #999; margin-top: 20px; word-break: break-all; max-width: 300px; }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="header">
                <div class="logo">⚙️</div>
                <div class="company">SAMNET INDUSTRIALS</div>
                <div style="font-size: 14px; color: #0084d6;">Training & Development Hub</div>
              </div>
              
              <div class="title">Certificate of Completion</div>
              <div class="subtitle">This is to certify that</div>
              
              <div class="content">
                <div class="presented">is hereby awarded this</div>
                <div class="recipient">${cert.recipientName}</div>
                <div class="course">For successfully completing the course</div>
                <div class="course"><strong>${cert.courseName}</strong></div>
                <div class="completion">On <strong>${cert.completionDate}</strong></div>
              </div>
              
              <div class="footer">
                <div class="signature-line">
                  Director<div class="stamp">SAMNET</div>
                </div>
                <div class="signature-line">
                  Date<div class="stamp">${cert.issueDate}</div>
                </div>
              </div>
              
              <div class="code">Verification Code: ${cert.uniqueCode}</div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (userRole !== "admin") {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
        <p className="text-slate-300">You do not have permission to access certificate generation.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Certificate Generator</h2>
        <p className="text-slate-400">Create and issue verifiable certificates for trainees and students</p>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Create New Certificate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-2">Recipient Name</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="Enter trainee/student name"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-2">Course Name</label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                placeholder="e.g., Web Development, Machine Learning, etc."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Completion Date</label>
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCreateCertificate}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Create Certificate
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Certificates List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Issued Certificates</h3>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus size={16} className="mr-2" />
              New Certificate
            </Button>
          )}
        </div>
        {certificates.length === 0 ? (
          <div className="p-6 text-center text-slate-400">No certificates issued yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-700/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Recipient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Completion Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Verification Code</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 text-sm text-white font-medium">{cert.recipientName}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{cert.courseName}</td>
                    <td className="px-6 py-3 text-sm text-slate-300">{cert.completionDate}</td>
                    <td className="px-6 py-3 text-sm text-cyan-400 font-mono text-xs">{cert.uniqueCode}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handlePrintCertificate(cert)}
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                        >
                          <Download size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-300 hover:text-red-400 hover:bg-slate-700"
                          onClick={() => handleDeleteCertificate(cert.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
