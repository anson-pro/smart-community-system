const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    facilities: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.facilities.push({
      id: i,
      name: Random.cword(5, 10),
      contractor: Random.cword(5, 12),
      phone: Random.string('number', 11),
      operator: Random.cname(),
      deliveryTime: Random.date('T'),
      facilityAdmin: Random.cname(),
      amount: Random.float(0, 10000, 0, 2),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
