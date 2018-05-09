import { formatGender, formatDate } from '@/utils/util';

const column = [
  {
    title: '姓名',
    align: 'center',
    key: 'name',
    width: 90,
    editable: true,
  },
  {
    title: '性别',
    align: 'center',
    width: 90,
    key: 'gender',
    render: (h, params) => h('div', formatGender(params.row.gender)),
  },
  {
    title: '身份证号',
    align: 'center',
    key: 'card',
    editable: true,
  },
  {
    title: '年龄',
    align: 'center',
    width: 90,
    key: 'age',
    editable: true,
  },
  {
    title: '外来时间',
    align: 'center',
    key: 'comeTime',
    render: (h, params) => h('div', formatDate(params.row.comeTime)),
  },
  {
    title: '原因',
    align: 'center',
    key: 'reason',
    ellipsis: true,
    editable: true,
  },
  {
    title: '处理人',
    align: 'center',
    key: 'operatorId',
    width: 100,
    editable: true,
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

export {
  column,
  genderList,
};
