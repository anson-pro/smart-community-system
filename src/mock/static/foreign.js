const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    foreigners: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.foreigners.push({
      id: i,
      name: Random.cname(),
      gender: Random.integer(0, 1),
      card: Random.id(),
      age: Random.integer(10, 100),
      comeTime: Random.now('T'),
      reason: Random.csentence(5, 10),
      operatorId: Random.cname(),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());

