const priceList = {
  Shirt: 50,
  Pants: 70,
  Saree: 100,
};

function calculateBill(items) {
  let total = 0;

  items.forEach((item) => {
    const price = priceList[item.type] || 0;
    total += price * item.quantity;
  });

  return total;
}

module.exports = { calculateBill, priceList };