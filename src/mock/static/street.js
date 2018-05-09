const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    streets: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.streets.push({
      id: i,
      // 街道名称
      name: Random.cword(3, 5),
      // 街道描述
      desc: Random.cword(5, 12),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
