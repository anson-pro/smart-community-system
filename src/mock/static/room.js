/*
* {
  "room": [
    {
      "id": 1,
      "unitId": 1,
      "name": "房间名字",
      "level": 1,
      "createTime": 21312,
      "updateTime": 21412,
      "isDelete": 0
    }
  ]
}
* */
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    rooms: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.rooms.push({
      id: i,
      unitId: Random.integer(1, 20),
      // 房间名称
      name: Random.cword(5, 10),
      // 楼层
      level: Random.integer(1, 20),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());
