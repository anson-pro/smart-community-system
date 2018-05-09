import { formatDate } from '@/utils/util';

const column = [
  {
    title: '设施名称',
    align: 'center',
    key: 'name',
    editable: true,
  },
  {
    title: '承建商',
    align: 'center',
    key: 'contractor',
    editable: true,
  },
  {
    title: '手机号',
    align: 'center',
    key: 'phone',
    editable: true,
  },
  {
    title: '负责人',
    align: 'center',
    key: 'operator',
    width: 80,
    editable: true,
  },
  {
    title: '交付时间',
    align: 'center',
    key: 'deliveryTime',
    render: (h, params) => h('div', formatDate(params.row.deliveryTime)),
  },
  {
    title: '设施管理员',
    align: 'center',
    key: 'facilityAdmin',
    width: 80,
    editable: true,
  },
  {
    title: '设施金额',
    align: 'center',
    key: 'amount',
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
