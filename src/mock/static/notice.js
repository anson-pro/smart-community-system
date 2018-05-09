/*
* {
  "notice": [
    {
      "id": 1,
      "title": "文章标题1",
      "content": "3213",
      "createTime": 4234,
      "updateTime": 411341,
      "operatorId": 1,
      "isDelete": 0
    }
  ]
}
* */
const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = (function () {
  const data = {
    notices: [],
  };

  for (let i = 1; i <= 21; i += 1) {
    data.notices.push({
      id: i,
      // 标题
      title: Random.ctitle(3, 10),
      // 内容
      content: Random.integer(1, 20),
      // 操作人
      operatorId: Random.cname(),
      createTime: Random.date('T'),
      updateTime: Random.date('T'),
      isDelete: Random.integer(0, 1),
    });
  }

  return data;
}());
