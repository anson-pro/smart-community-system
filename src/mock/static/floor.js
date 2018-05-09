/*
*
* {
  "floor": [
    {
      "id": 1,
      "name": "四号楼",
      "communityId": 1,
      "createTime": 2124,
      "updateTime": 421,
      "isDelete": 0
    }
  ]
}*/
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    floors: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.floors.push({
      id: i,
      // 楼名称
      name: Random.cword(5, 10),
      // 小区 id
      communityId: Random.integer(1, 20),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());
