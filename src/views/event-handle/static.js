import { formatEventType, formatStatus, formatDate } from '@/utils/util';

const column = [
  {
    title: '事件类型',
    align: 'center',
    key: 'type',
    render: (h, params) => h('div', formatEventType(params.row.type)),
  },
  {
    title: '上报时间',
    align: 'center',
    key: 'reportTime',
    render: (h, params) => h('div', formatDate(params.row.reportTime)),
  },
  {
    title: '处理时间',
    align: 'center',
    key: 'handleTime',
    render: (h, params) => h('div', formatDate(params.row.handleTime)),
  },
  {
    title: '处理状态',
    align: 'center',
    key: 'status',
    render: (h, params) => h('div', formatStatus(params.row.status)),
  },
  {
    title: '处理人',
    align: 'center',
    key: 'operatorId',
    editable: true,
  },
  {
    title: '详细信息',
    align: 'center',
    key: 'detailInfo',
    editable: true,
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
  },
];

const eventTypeList = [
  {
    value: 0,
    label: '街道清理',
  },
  {
    value: 1,
    label: '失物招领',
  },
];

const statusList = [
  {
    value: 0,
    label: '待处理',
  },
  {
    value: 1,
    label: '处理中',
  },
  {
    value: 2,
    label: '已处理',
  },
];

export {
  column,
  eventTypeList,
  statusList,
};
