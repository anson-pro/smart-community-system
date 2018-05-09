import { formatPassword, formatGender, formatDate, formatPoliticalStatus, formatWorkerStatus } from '@/utils/util';

const column = [
  {
    title: '账号',
    align: 'center',
    key: 'account',
  },
  {
    title: '密码',
    align: 'center',
    key: 'password',
    render: (h, params) => h('div', formatPassword(params.row.password)),
  },
  {
    title: '姓名',
    align: 'center',
    key: 'name',
    width: 80,
    editable: true,
  },
  {
    title: '性别',
    align: 'center',
    key: 'gender',
    width: 80,
    render: (h, params) => h('div', formatGender(params.row.gender)),
  },
  {
    title: '身份证号',
    align: 'center',
    key: 'card',
    editable: true,
  },
  {
    title: '政治面貌',
    align: 'center',
    key: 'politicalStatus',
    render: (h, params) => h('div', formatPoliticalStatus(params.row.politicalStatus)),
  },
  {
    title: '手机号',
    align: 'center',
    key: 'phone',
    editable: true,
  },
  {
    title: '职务',
    align: 'center',
    key: 'position',
    width: 80,
    editable: true,
  },
  {
    title: '工作开始时间',
    align: 'center',
    key: 'beginTime',
    render: (h, params) => h('div', formatDate(params.row.beginTime)),
  },
  {
    title: '工作结束时间',
    align: 'center',
    key: 'endTime',
    render: (h, params) => h('div', formatDate(params.row.endTime)),
  },
  {
    title: '状态',
    align: 'center',
    key: 'status',
    width: 80,
    render: (h, params) => h('div', formatWorkerStatus(params.row.status)),
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
  },
];

const genderList = [
  {
    value: 1,
    label: '男',
  },
  {
    value: 0,
    label: '女',
  },
];

const politicalStatusList = [
  {
    value: 0,
    label: '群众',
  },
  {
    value: 1,
    label: '团员',
  },
  {
    value: 2,
    label: '党员',
  },
];

const workerStatusList = [
  {
    value: 0,
    label: '在职',
  },
  {
    value: 1,
    label: '休假',
  },
  {
    value: 2,
    label: '离职',
  },
];

export {
  column,
  genderList,
  politicalStatusList,
  workerStatusList,
};
