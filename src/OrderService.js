// OrderService 只建立骨架，不實作邏輯
class OrderService {
  constructor() {
    this.orderInput = [];
  }
  placeOrder(orderInput) {
    this.orderInput = orderInput;
    // 單一商品無優惠
    const totalAmount = orderInput.reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0
    );
    return { totalAmount };
  }
  getReceivedItems() {
    // 回傳商品名稱與數量
    return this.orderInput.map((item) => ({
      productName: item.productName,
      quantity: String(item.quantity),
    }));
  }
}

module.exports = { OrderService };
