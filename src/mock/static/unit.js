const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    units: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.units.push({
      id: i,
      // 单元名称
      name: Random.cword('零一二三四五六七八九十'),
      // 楼房 Id
      floorId: Random.integer(1, 20),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }
  return data;
}());
