import { formatDate, formatFacilityName } from '@/utils/util';

const column = [
  {
    title: '设施名称',
    align: 'center',
    key: 'name',
    render: (h, params) => h('div', formatFacilityName(params.row)),
  },
  {
    title: '维护人员姓名',
    align: 'center',
    key: 'operator',
    editable: true,
  },
  {
    title: '手机号',
    align: 'center',
    key: 'phone',
    editable: true,
  },
  {
    title: '维护时间',
    align: 'center',
    key: 'maintainTime',
    render: (h, params) => h('div', formatDate(params.row.maintainTime)),
  },
  {
    title: '金额',
    align: 'center',
    key: 'amount',
    width: 80,
    editable: true,
  },
  {
    title: '管理员',
    align: 'center',
    key: 'maintainAdmin',
    width: 80,
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

export default column;
