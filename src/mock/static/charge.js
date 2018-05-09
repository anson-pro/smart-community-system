/* {
  "charge": [
    {
      "id": 1,
      "roomId": 1,
      "type": 1,
      "amount": 231.321,
      "chargeTime": 124124,
      "expireTime": 2314,
      "operatorId": 1,
      "payStyle": 1,
      "status": 1,
      "createTime": 1313,
      "updateTime": 2141,
      "isDelete": 0
    }
  ]
}
* */
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    charges: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.charges.push({
      id: i,
      roomId: Random.integer(1, 20),
      type: Random.integer(0, 1),
      amount: Random.float(0, 1000, 0, 3),
      chargeTime: Random.now('T'),
      expireTime: Random.now('T'),
      operatorId: Random.cname(),
      payStyle: Random.integer(0, 2),
      status: Random.integer(0, 1),
      createTime: Random.now('T'),
      updateTime: Random.now('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());
