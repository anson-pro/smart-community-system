const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    communities: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.communities.push({
      id: i,
      // 小区名称
      name: Random.cword(3, 5),
      // 街道 id
      streetId: Random.integer(1, 2),
      // 物业 id
      propertyId: Random.integer(1, 2),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
