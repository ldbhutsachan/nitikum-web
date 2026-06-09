export default defineEventHandler(async (event) => {
  // Simple mock response for dashboard statistics
  // Read optional filter from request body (startDate, endDate)
  const body: any = await readBody(event)
  const from = body?.startDate || new Date().toISOString().slice(0, 10)
  const to = body?.endDate || new Date().toISOString().slice(0, 10)

  const res = {
    status: 'success',
    message: 'Dashboard statistics',
    data: {
      period: { from, to },

      // totals used for metric cards
      caltotalGroup: {
        totalAmt: 669,
        totalAmtNew: 552,
        totalAmtOld: 117,
        totalAmtDocNew: 42,
        totalAmtDocOld: 33
      },

      // top transaction types (used by transactionItems / charts)
      transactionsGroup: [
        { typeDocumentName: 'ປະເພດ A', totalAmt: 669 },
        { typeDocumentName: 'ປະເພດ B', totalAmt: 552 },
        { typeDocumentName: 'ປະເພດ C', totalAmt: 117 }
      ],

      // sections / departments (used by sectionItems / charts)
      sectionGroup: [
        { secName: 'ພະແນກ A', totalAmt: 420 },
        { secName: 'ພະແນກ B', totalAmt: 310 },
        { secName: 'ພະແນກ C', totalAmt: 117 }
      ],

      // optional lists for comboboxes (if you keep them elsewhere)
      docTypeList: [
        { docType: 'A', docDescLao: 'ປະເພດ A' },
        { docType: 'B', docDescLao: 'ປະເພດ B' }
      ],
      branchList: [
        { branchCode: 'BR01', brNameLa: 'ສາຂາ 1' },
        { branchCode: 'BR02', brNameLa: 'ສາຂາ 2' }
      ],

      // optional daily counts for summary chart
      daily_counts: [
        { date: from, count: 20 },
        { date: to, count: 15 }
      ]
    }
  }

  return res
})
