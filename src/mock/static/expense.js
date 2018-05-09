const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    expenses: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.expenses.push({
      id: i,
      amount: Random.float(0, 10000, 0, 2),
      payTime: Random.date('T'),
      payStyle: Random.integer(0, 2),
      operatorId: Random.cname(),
      reason: Random.csentence(5, 10),
      updateTime: Random.now('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());

