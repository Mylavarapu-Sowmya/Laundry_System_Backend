const express = require("express");
const router = express.Router();
const { orders } = require("../data/store");
const { calculateBill } = require("../utils/billing");

const generateOrderId = () => "ORD" + Date.now();

// ✅ Create Order
router.post("/", (req, res) => {
  const { customerName, phone, items } = req.body;

  const total = calculateBill(items);

  const newOrder = {
    id: generateOrderId(),
    customerName,
    phone,
    items,
    total,
    status: "RECEIVED",
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.json(newOrder);
});

// ✅ Get All Orders + Filters
router.get("/", (req, res) => {
  const { status, search } = req.query;

  let filtered = [...orders];

  if (status) {
    filtered = filtered.filter((o) => o.status === status);
  }

  if (search) {
    filtered = filtered.filter(
      (o) =>
        o.customerName.includes(search) ||
        o.phone.includes(search)
    );
  }

  res.json(filtered);
});

// ✅ Update Status
router.put("/:id/status", (req, res) => {
  const { status } = req.body;

  const order = orders.find((o) => o.id === req.params.id);

  if (!order) return res.status(404).send("Order not found");

  order.status = status;

  res.json(order);
});

// ✅ Dashboard
router.get("/dashboard", (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statusCount = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0,
  };

  orders.forEach((o) => statusCount[o.status]++);

  res.json({
    totalOrders,
    totalRevenue,
    statusCount,
  });
});

module.exports = router;