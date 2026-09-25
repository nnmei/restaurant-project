// db/tables.js

// ดึงรายชื่อโต๊ะทั้งหมด 15 โต๊ะ พร้อมเช็คว่าโต๊ะไหนมีบิลค้างอยู่บ้าง
export async function getAllTablesWithStatus(db) {
  return await db.getAllAsync(`
    SELECT 
      t.table_id,
      t.table_number,
      b.bill_id,
      CASE WHEN b.bill_id IS NOT NULL THEN 'occupied' ELSE 'available' END AS current_status
    FROM tables t
    LEFT JOIN bills b ON t.table_id = b.table_id AND b.status = 'open'
    ORDER BY t.table_number ASC;
  `);
}

// หาบิลที่เปิดค้างอยู่ของโต๊ะ หรือเปิดบิลใหม่ถ้ายังไม่มี
export async function getOrCreateActiveBill(db, tableId) {
  const existingBill = await db.getFirstAsync(
    'SELECT * FROM bills WHERE table_id = ? AND status = ? LIMIT 1;',
    [tableId, 'open']
  );

  if (existingBill) {
    return existingBill;
  }

  // เปิดบิลใหม่
  const result = await db.runAsync(
    'INSERT INTO bills (table_id, status) VALUES (?, ?);',
    [tableId, 'open']
  );

  return {
    bill_id: result.lastInsertRowId,
    table_id: tableId,
    status: 'open',
  };
}

// ปิดบิล (ก10)
export async function closeBill(db, billId) {
  await db.runAsync(
    "UPDATE bills SET status = 'closed', closed_at = CURRENT_TIMESTAMP WHERE bill_id = ?;",
    [billId]
  );
}