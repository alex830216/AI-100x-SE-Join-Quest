const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { OrderService } = require("../../src/OrderService");

let orderService;
let orderInput;
let summary;
let received;

Given("no promotions are applied", function () {
  orderService = new OrderService();
});

Given("the threshold discount promotion is configured:", function (dataTable) {
  if (!orderService) orderService = new OrderService();
  const config = dataTable.hashes()[0];
  orderService.setThresholdPromotion({
    threshold: Number(config.threshold),
    discount: Number(config.discount),
  });
});

Given("the buy one get one promotion for cosmetics is active", function () {
  if (!orderService) orderService = new OrderService();
  orderService.setBuyOneGetOneCosmetics(true);
});

When("a customer places an order with:", function (dataTable) {
  orderInput = dataTable.hashes();
  summary = orderService.placeOrder(orderInput);
  received = orderService.getReceivedItems();
});

Then("the order summary should be:", function (dataTable) {
  const expected = dataTable.hashes()[0];
  Object.keys(expected).forEach((key) => {
    assert.strictEqual(String(summary[key]), String(expected[key]));
  });
});

Then("the customer should receive:", function (dataTable) {
  const expected = dataTable.hashes();
  assert.deepStrictEqual(received, expected);
});
