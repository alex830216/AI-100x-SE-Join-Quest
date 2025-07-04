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
