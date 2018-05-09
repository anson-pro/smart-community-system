/*
* {
  "user": [
    {
      "id": 1,
      "name": "侯世铎",
      "gender": true,
      "card": "230221199510023015",
      "nation": "汉族",
      "roomId": 1,
      "politicalStatus": 1,
      "phone": "17601077581",
      "company": "凡普金科",
      "companyLocation": "北京",
      "checkInTime": 214124,
      "hasMarried": false,
      "relation": 0,
      "createTime": 67867,
      "updateTime": 789789,
      "isDelete": 0
    }
  ]
}
* */
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    users: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.users.push({
      id: i,
      name: Random.cname(),
      gender: Random.integer(0, 1),
      card: Random.id(),
      nation: Random.cword(3, 5),
      roomId: Random.integer(1, 20),
      politicalStatus: Random.integer(0, 2),
      phone: Random.integer(11),
      company: Random.cword(5, 7),
      companyLocation: Random.city(true),
      checkInTime: Random.now('T'),
      hasMarried: Random.integer(0, 1),
      relation: Random.integer(0, 1),
      createTime: Random.now('T'),
      updateTime: Random.now('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());

