const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    events: [],
  };

  for (let i = 1; i <= 50; i += 1) {
    data.events.push({
      id: i,
      type: Random.integer(0, 1),
      reportTime: Random.date('T'),
      handleTime: Random.now('T'),
      status: Random.integer(0, 2),
      operatorId: Random.cname(),
      detailInfo: Random.csentence(5, 10),
      createTime: Random.now('T'),
      updateTime: Random.now('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
