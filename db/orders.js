export async function submitOrderRound(db, billId, cartItems) {
  if (!cartItems || cartItems.length === 0) return null;

  return await db.withTransactionAsync(async () => {
    const row = await db.getFirstAsync(
      'SELECT COALESCE(MAX(round_number), 0) + 1 AS next_round FROM orders WHERE bill_id = ?;',
      [billId]
    );
    const roundNumber = row.next_round;

    const orderRes = await db.runAsync(
      'INSERT INTO orders (bill_id, round_number) VALUES (?, ?);',
      [billId, roundNumber]
    );
    const orderId = orderRes.lastInsertRowId;

    for (const item of cartItems) {
      await db.runAsync(
        `INSERT INTO order_items (order_id, food_id, price, quantity, note, item_status)
         VALUES (?, ?, ?, ?, ?, 'pending');`,
        [orderId, item.food_id, item.price, item.quantity, item.note || '']
      );
    }

    return { orderId, roundNumber };
  });
}

export async function getBillTotal(db, billId) {
  const result = await db.getFirstAsync(
    `SELECT COALESCE(SUM(oi.price * oi.quantity), 0) AS total_amount
     FROM order_items oi
     JOIN orders o ON oi.order_id = o.order_id
     WHERE o.bill_id = ? AND oi.item_status != 'cancelled';`,
    [billId]
  );
  return result ? result.total_amount : 0;
}

export async function getBillDetails(db, billId) {
  return await db.getAllAsync(
    `SELECT 
      o.round_number,
      oi.order_item_id,
      f.name AS food_name,
      oi.price,
      oi.quantity,
      (oi.price * oi.quantity) AS item_total,
      oi.note,
      oi.item_status
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN food f ON oi.food_id = f.food_id
    WHERE o.bill_id = ?
    ORDER BY o.round_number ASC, oi.order_item_id ASC;`,
    [billId]
  );
}
