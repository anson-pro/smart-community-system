<style lang="less">
  @import './editable-table.less';
</style>

<template>
  <div>
    <Table
      :ref="refs"
      :columns="columnsList"
      :data="thisTableData"
      @on-current-change="handleCurrentRow"
      border
      disabled-hover
      highlight-row>
    </Table>
  </div>
</template>

<script>
const editButton = (vm, h, currentRow, index) => h('Button', {
  props: {
    type: currentRow.editting ? 'success' : 'primary',
    loading: currentRow.saving,
  },
  style: {
    margin: '0 5px',
  },
  on: {
    click: () => {
      if (!currentRow.editting) {
        if (currentRow.edittingCell) {
          for (const name in currentRow.edittingCell) {
            currentRow.edittingCell[name] = false;
            vm.edittingStore[index].edittingCell[name] = false;
          }
        }
        vm.edittingStore[index].editting = true;
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
      } else {
        vm.edittingStore[index].saving = true;
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
        const edittingRow = vm.edittingStore[index];
        edittingRow.editting = false;
        edittingRow.saving = false;
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
        vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index, edittingRow);
      }
    },
  },
}, currentRow.editting ? '保存' : '编辑');
const deleteButton = (vm, h, currentRow, index) => h('Poptip', {
  props: {
    confirm: true,
    title: '您确定要删除这条数据吗?',
    transfer: true,
  },
  on: {
    'on-ok': () => {
      vm.thisTableData.splice(index, 1);
      vm.$emit('input', vm.handleBackdata(vm.thisTableData));
      vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index, currentRow);
    },
  },
}, [
  h('Button', {
    style: {
      margin: '0 5px',
    },
    props: {
      type: 'error',
      placement: 'top',
    },
  }, '删除'),
]);
const incellEditBtn = (vm, h, param) => {
  if (vm.hoverShow) {
    return h('div', {
      class: {
        'show-edit-btn': vm.hoverShow,
      },
    }, [
      h('Button', {
        props: {
          type: 'text',
          icon: 'edit',
        },
        on: {
          click: (event) => {
            vm.edittingStore[param.index].edittingCell[param.column.key] = true;
            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
          },
        },
      }),
    ]);
  }
  return h('Button', {
    props: {
      type: 'text',
      icon: 'edit',
    },
    on: {
      click: (event) => {
        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
      },
    },
  });
};
const saveIncellEditBtn = (vm, h, param) => h('Button', {
  props: {
    type: 'text',
    icon: 'checkmark',
  },
  on: {
    click: (event) => {
      vm.edittingStore[param.index].edittingCell[param.column.key] = false;
      vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
      vm.$emit('input', vm.handleBackdata(vm.thisTableData));
      vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
    },
  },
});
const cellInput = (vm, h, param, item) => h('Input', {
  props: {
    type: 'text',
    value: vm.edittingStore[param.index][item.key],
  },
  on: {
    'on-change': function (event) {
      const key = item.key;
      vm.edittingStore[param.index][key] = event.target.value;
    },
  },
});
export default {
  name: 'canEditTable',
  props: {
    refs: String,
    columnsList: Array,
    value: Array,
    url: String,
    editIncell: {
      type: Boolean,
      default: false,
    },
    hoverShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      const editableCell = this.columnsList.filter((item) => {
        if (item.editable) {
          if (item.editable === true) {
            return item;
          }
        }
      });
      const cloneData = JSON.parse(JSON.stringify(this.value));
      let res = [];
      res = cloneData.map((item, index) => {
        let isEditting = false;
        if (this.thisTableData[index]) {
          if (this.thisTableData[index].editting) {
            isEditting = true;
          } else {
            for (const cell in this.thisTableData[index].edittingCell) {
              if (this.thisTableData[index].edittingCell[cell] === true) {
                isEditting = true;
              }
            }
          }
        }
        if (isEditting) {
          return this.thisTableData[index];
        }
        this.$set(item, 'editting', false);
        const edittingCell = {};
        editableCell.forEach((item) => {
          edittingCell[item.key] = false;
        });
        this.$set(item, 'edittingCell', edittingCell);
        return item;
      });
      this.thisTableData = res;
      this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
      this.columnsList.forEach((item) => {
        if (item.editable) {
          item.render = (h, param) => {
            const currentRow = this.thisTableData[param.index];
            if (!currentRow.editting) {
              if (this.editIncell) {
                return h('Row', {
                  props: {
                    type: 'flex',
                    align: 'middle',
                    justify: 'center',
                  },
                }, [
                  h('Col', {
                    props: {
                      span: '22',
                    },
                  }, [
                    !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item),
                  ]),
                  h('Col', {
                    props: {
                      span: '2',
                    },
                  }, [
                    currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param),
                  ]),
                ]);
              }
              return h('span', currentRow[item.key]);
            }
            return h('Input', {
              props: {
                type: 'text',
                value: currentRow[item.key],
              },
              on: {
                'on-change': function (event) {
                  const key = param.column.key;
                  vm.edittingStore[param.index][key] = event.target.value;
                },
              },
            });
          };
        }
        if (item.handle) {
          item.render = (h, param) => {
            const currentRowData = this.thisTableData[param.index];
            const children = [];
            item.handle.forEach((item) => {
              if (item === 'edit') {
                children.push(editButton(this, h, currentRowData, param.index));
              } else if (item === 'delete') {
                children.push(deleteButton(this, h, currentRowData, param.index));
              }
            });
            return h('div', children);
          };
        }
      });
    },
    handleBackdata(data) {
      const clonedData = JSON.parse(JSON.stringify(data));
      clonedData.forEach((item) => {
        delete item.editting;
        delete item.edittingCell;
        delete item.saving;
      });
      return clonedData;
    },
    handleCurrentRow(currentData, oldData) {
      this.$emit('on-current-change', currentData, oldData);
    },
  },
  watch: {
    value(data) {
      this.init();
    },
  },
};
</script>
