import { formatGender, formatDate, formatPoliticalStatus, formatRelation } from '@/utils/util';

const column = [
  {
    title: '房间ID',
    align: 'center',
    key: 'roomId',
    width: 75,
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
    width: 65,
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
    width: 85,
    render: (h, params) => h('div', formatPoliticalStatus(params.row.politicalStatus)),
  },
  {
    title: '手机号',
    align: 'center',
    key: 'phone',
    width: 90,
    editable: true,
  },
  {
    title: '工作地点',
    align: 'center',
    key: 'companyLocation',
    editable: true,
  },
  {
    title: '入住时间',
    align: 'center',
    key: 'checkInTime',
    render: (h, params) => h('div', formatDate(params.row.checkInTime)),
  },
  {
    title: '是否户主',
    align: 'center',
    key: 'relation',
    width: 85,
    render: (h, params) => h('div', formatRelation(params.row.relation)),
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

const relationList = [
  {
    value: 0,
    label: '是',
  },
  {
    value: 1,
    label: '否',
  },
];

export {
  column,
  genderList,
  politicalStatusList,
  relationList,
};
