const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    properties: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.properties.push({
      id: i,
      // 物业名称
      name: Random.cword(5, 10),
      // 物业描述
      desc: Random.cword(5, 12),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());
