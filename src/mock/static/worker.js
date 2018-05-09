const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    workers: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.workers.push({
      id: i,
      account: Random.string(5, 12),
      password: Random.string(6, 12),
      name: Random.cname(),
      gender: Random.integer(0, 1),
      nation: Random.cword(2, 3),
      card: Random.id(),
      politicalStatus: Random.integer(0, 2),
      phone: Random.string('number', 11),
      position: Random.cword(2, 4),
      beginTime: Random.date('T'),
      endTime: Random.date('T'),
      status: Random.integer(0, 2),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
