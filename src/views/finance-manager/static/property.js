import { formatPayStyle, formatDate, formatPayStatus } from '@/utils/util';

const column = [
  {
    title: '房屋ID',
    align: 'center',
    key: 'roomId',
    width: 80,
  },
  {
    title: '物业费用/元',
    align: 'center',
    key: 'amount',
    editable: true,
  },
  {
    title: '支付时间',
    align: 'center',
    key: 'chargeTime',
    render: (h, params) => h('div', formatDate(params.row.chargeTime)),
  },
  {
    title: '到期时间',
    align: 'center',
    key: 'expireTime',
    render: (h, params) => h('div', formatDate(params.row.expireTime)),
  },
  {
    title: '支付方式',
    align: 'center',
    key: 'payStyle',
    render: (h, params) => h('div', formatPayStyle(params.row.payStyle)),
    width: 85,
  },
  {
    title: '操作人',
    align: 'center',
    key: 'operatorId',
    width: 85,
    editable: true,
  },
  {
    title: '支付状态',
    align: 'center',
    key: 'status',
    render: (h, params) => h('div', formatPayStatus(params.row.status)),
    width: 85,
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
  },
];

const statusList = [
  {
    value: 0,
    label: '待支付',
  },
  {
    value: 1,
    label: '已支付',
  },
];

export {
  column,
  statusList,
};
