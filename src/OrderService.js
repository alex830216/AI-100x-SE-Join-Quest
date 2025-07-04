// OrderService 只建立骨架，不實作邏輯
class OrderService {
  constructor() {
    this.orderInput = [];
  }
  setThresholdPromotion(promo) {
    this.thresholdPromotion = promo;
  }
  setBuyOneGetOneCosmetics(active) {
    this.buyOneGetOneCosmetics = active;
  }
  placeOrder(orderInput) {
    this.orderInput = orderInput;
    // Buy-one-get-one for cosmetics
    let receivedMap = new Map();
    orderInput.forEach((item) => {
      let qty = Number(item.quantity);
      if (this.buyOneGetOneCosmetics && item.category === "cosmetics") {
        qty += 1;
      }
      if (receivedMap.has(item.productName)) {
        receivedMap.set(
          item.productName,
          receivedMap.get(item.productName) + qty
        );
      } else {
        receivedMap.set(item.productName, qty);
      }
    });
    this._receivedItems = Array.from(receivedMap.entries()).map(
      ([productName, quantity]) => ({
        productName,
        quantity: String(quantity),
      })
    );
    // 計算原始金額（不含任何優惠）
    const originalAmount = orderInput.reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0
    );
    // 計算門檻折扣
    let discount = 0;
    if (
      this.thresholdPromotion &&
      Number(originalAmount) >= Number(this.thresholdPromotion.threshold)
    ) {
      discount = Number(this.thresholdPromotion.discount);
    }
    const totalAmount = originalAmount - discount;
    // always 回傳 originalAmount/discount/totalAmount（for stacked promotion case）
    return { originalAmount, discount, totalAmount };
  }
  getReceivedItems() {
    return this._receivedItems;
  }
}

module.exports = { OrderService };
