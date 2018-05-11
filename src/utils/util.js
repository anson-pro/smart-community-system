import moment from 'moment';

// 表格格式化事类型
const formatEventType = (value) => {
  let result = '';
  if (value === 0) {
    result = '街道清理';
  } else {
    result = '失物招领';
  }
  return result;
};

// 表格格式化事件状态
const formatStatus = (value) => {
  let result = '';
  if (value === 0) {
    result = '待处理';
  } else if (value === 1) {
    result = '处理中';
  } else {
    result = '已处理';
  }
  return result;
};

// 表格格式化日期
const formatDate = (value) => {
  let result = '';
  if (value !== '') {
    result = moment(parseInt(value, 10)).format('YYYY-MM-DD HH:mm:ss');
  }
  return result;
};

// 表格根据值显示不同性别
const formatGender = (value) => {
  let result = '女';
  if (value === 1) {
    result = '男';
  }
  return result;
};

const formatPayStyle = (value) => {
  let result = '现金支付';
  if (value === 1) {
    result = '线上支付';
  } else if (value === 2) {
    result = '银行卡支付';
  }
  return result;
};

const formatPassword = value => '******';

const formatPoliticalStatus = (value) => {
  let result = '群众';
  if (value === 1) {
    result = '团员';
  } else if (value === 2) {
    result = '党员';
  }
  return result;
};

const formatWorkerStatus = (value) => {
  let result = '在职';
  if (value === 1) {
    result = '休假';
  } else if (value === 2) {
    result = '离职';
  }
  return result;
};

const formatFacilityName = (row) => {
  let result = '当前设施';
  if (row.hasOwnProperty('facility') === true) {
    result = row.facility.name;
  }
  return result;
};

// 格式化时间戳
const formatTimestamp = value => new Date(value).getTime().toString();

const formatTimestampAddYear = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const newDate = new Date(year + 1, month, day);

  return newDate.getTime().toString();
};

// 格式化支付状态
const formatPayStatus = (value) => {
  let result = '待支付';
  if (value === 1) {
    result = '已支付';
  }
  return result;
};

const formatRelation = (value) => {
  let result = '是';
  if (value === 1) {
    result = '否';
  }
  return result;
};

// 判断是否为空对象
const isEmptyObject = obj => Object.keys(obj).length === 0;

// 手机号码验证
const isMobile = mobileNumber => /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(mobileNumber);

// 身份证号验证
const isIdientify = idNumber => /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/.test(idNumber);


export {
  formatEventType,
  formatStatus,
  formatDate,
  formatGender,
  formatPassword,
  formatPoliticalStatus,
  formatWorkerStatus,
  formatFacilityName,
  formatTimestamp,
  formatTimestampAddYear,
  formatPayStatus,
  formatRelation,
  formatPayStyle,
  isEmptyObject,
  isMobile,
  isIdientify,
};
