const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    maintains: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.maintains.push({
      id: i,
      facilityId: Random.integer(0, 20),
      operator: Random.cname(),
      phone: Random.string('number', 11),
      maintainTime: Random.date('T'),
      amount: Random.float(0, 10000, 0, 2),
      maintainAdmin: Random.cname(),
      detailInfo: Random.csentence(6, 12),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
