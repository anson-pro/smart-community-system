import { formatPassword, formatGender, formatDate, formatPoliticalStatus, formatWorkerStatus } from '@/utils/util';

const column = [
  {
    title: '单元ID',
    align: 'center',
    key: 'unitId',
  },
  {
    title: '房屋名称',
    align: 'center',
    key: 'name',
  },
  {
    title: '楼层',
    align: 'center',
    key: 'level',
    editable: true,
  },
  {
    title: '创建时间',
    align: 'center',
    key: 'createTime',
    render: (h, params) => h('div', formatDate(params.row.createTime)),
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
  },
];

export default column;
