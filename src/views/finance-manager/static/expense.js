import { formatPayStyle, formatDate } from '@/utils/util';

const column = [
  {
    title: '支付原因',
    align: 'center',
    key: 'reason',
    editable: true,
  },
  {
    title: '支付金额/元',
    align: 'center',
    key: 'amount',
    editable: true,
  },
  {
    title: '操作人',
    align: 'center',
    key: 'operatorId',
    editable: true,
  },
  {
    title: '支付方式',
    align: 'center',
    key: 'payStyle',
    render: (h, params) => h('div', formatPayStyle(params.row.payStyle)),
  },
  {
    title: '支付时间',
    align: 'center',
    key: 'payTime',
    render: (h, params) => h('div', formatDate(params.row.payTime)),
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
  },
];

const payStyleList = [
  {
    value: 0,
    label: '现金支付',
  },
  {
    value: 1,
    label: '线上支付',
  },
  {
    value: 2,
    label: '银行卡支付',
  },
];

export {
  column,
  payStyleList,
};
