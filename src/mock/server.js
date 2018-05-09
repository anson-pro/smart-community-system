const path = require('path');
const fs = require('fs');

const jsonServer = require('json-server');

const config = require('./config');

const host = config.SERVER;
const port = config.PORT;

const mockDir = path.join(__dirname, 'static');
const files = fs.readdirSync(mockDir);

const base = {};
files.forEach((file) => {
  Object.assign(base, require(path.resolve(mockDir, file)));
});

const server = jsonServer.create();
const router = jsonServer.router(base);
// 中间件
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
// 设置增加一个响应头信息“从server到前端”
server.use((req, res, next) => {
  res.header('X-Hello', 'World');
  next();
});
// 数据发送到前端之前包一层
router.render = (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: res.locals.data, // res.locals.data这个是真正的数据
  });
};

server.use('/api', router);// 模拟api接口，就是访问api的时候给制定路由规则

server.listen({
  host,
  port,
}, () => {
  console.log(JSON.stringify(jsonServer));
  console.log(`JSON Server is running in http://${host}:${port}`);
});
