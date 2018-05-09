/*
{
  "facilityInfo": [
  {
    "id": 1,
    "name": "设施名称",
    "contractor": "承建商",
    "phone": 13131,
    "operator": "负责人",
    "deliveryTime": "交付时间",
    "facilityAdmin": "设施管理员",
    "amount": 2121.121,
    "createTime": 221412,
    "updateTime": 321312,
    "isDelete": 0
  }
]
}
*/
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    facilityInfos: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.facilityInfos.push({
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
