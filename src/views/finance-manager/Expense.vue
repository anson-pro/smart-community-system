<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加支付费用信息</Button>
            <div style="float: right">
              <Select v-model="payStyle" placeholder="支付方式" style="width: 150px" clearable>
                <Option
                  v-for="item in payStyleList"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
              <Button type="primary" icon="search" @click="handleSearch">搜索</Button>
            </div>
          </Row>
          <Row>
            <can-edit-table
              v-model="tableData"
              :columns-list="column"
              @on-change="handleChange"
              @on-delete="handleDelete"
              @on-current-change="handleCurrentRow"
            >
            </can-edit-table>
            <Page style="float: right; margin-top: 10px"
                  :total="count"
                  :current="currentPage"
                  :page-size="pageSize"
                  show-total
                  @on-change="changePage">
            </Page>
          </Row>
        </Card>
      </Col>
    </Row>

    <Modal v-model="addModal" title="添加支付费用信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="支付原因" prop="reason">
          <Input v-model="addModalData.reason" placeholder="请输入支付原因">
          </Input>
        </FormItem>
        <FormItem label="支付方式">
          <Select
            v-model="addModalData.payStyle"
            placeholder="请选择支付方式"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in payStyleList"
              :value="item.value"
              :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="支付金额" prop="amount">
          <Input v-model="addModalData.amount" placeholder="请输入支付金额"></Input>
        </FormItem>
        <FormItem label="支付时间" prop="payTime">
          <DatePicker
            type="datetime"
            placeholder="选择进入时间"
            v-model="addModalData.payTime">
          </DatePicker>
        </FormItem>
        <FormItem label="处理人" prop="operatorId">
          <Input v-model="addModalData.operatorId" placeholder="请输入处理人"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import canEditTable from '../tables/components/canEditTable.vue';
import { column, payStyleList } from './static/expense';
import { formatTimestamp } from '@/utils/util';
import { addExpense, deleteExpenseById, updateExpenseById, fetchExpenses } from '@/api/finance/expense';

export default {
  name: 'Expense',
  components: {
    canEditTable,
  },
  data() {
    return {
      allData: [],
      tableData: [],
      column: [],
      count: 0,
      pageSize: 10,
      currentPage: 1,
      selectedRow: {},
      payStyle: '',
      payStyleList: [],
      addModal: false,
      addModalData: {
        payStyle: '',
        payTime: '',
        reason: '',
        operatorId: '',
        amount: '',
      },
      ruleValidate: {
        reason: [
          { required: true, message: '请输入支付原因', trigger: 'blur' },
        ],
        amount: [
          {
            required: true, message: '请输入支付金额', trigger: 'blur',
          },
        ],
        payTime: [
          {
            required: true, type: 'date', message: '请选择支付', trigger: 'change',
          },
        ],
        operatorId: [
          { required: true, message: '请输入处理人', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.column = column;
      this.payStyleList = payStyleList;
      this.fetchData();
    },
    fetchData(params = {}) {
      fetchExpenses(params)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.handleTableData(data);
          }
        });
    },
    // 选中当前行后存储当前行信息
    handleCurrentRow(curData) {
      this.selectedRow = curData;
    },
    // Modal 取消按钮事件
    cancel() {
      this.addModal = false;
      this.$Message.info('您选择了取消');
    },
    // 添加按钮事件
    handleAddEvent() {
      this.addModal = true;
    },
    // 添加事件处理信息
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        // 验证表单成功进行请求
        if (valid) {
          const data = {
            payStyle: this.addModalData.payStyle,
            payTime: formatTimestamp(this.addModalData.payTime),
            amount: this.addModalData.amount,
            reason: this.addModalData.reason,
            operatorId: this.addModalData.operatorId,
          };
          addExpense(data)
            .then(({ data: { code } }) => {
              if (code === 200) {
                this.addModal = false;
                this.$Message.success('添加成功!');
                this.fetchData();
                this.currentPage = 1;
              }
            }).catch(() => {
              this.addModal = false;
              this.$Message.error('添加失败');
            });
        } else {
          this.$Message.error('请确保各项信息填写正确！');
        }
      });
    },
    // 根据 ID 删除当前行数据
    handleDelete(val, index, row) {
      deleteExpenseById(row.id)
        .then(({ data: { code } }) => {
          if (code === 200) {
            this.$Message.success('删除成功');
          }
        }).then(() => {
          this.fetchData();
        });
    },
    // 根据 ID 更新当前行部分数据数据
    handleChange(val, index, row) {
      updateExpenseById(row.id, row)
        .then(({ data: { code } }) => {
          if (code === 200) {
            this.$Message.success('更新成功');
            this.fetchData();
          }
        });
    },
    // 搜索
    handleSearch() {
      // 构建查询 query 参数
      const params = {};
      if (this.payStyle !== '') {
        params.payStyle = this.payStyle;
      }
      this.fetchData(params);
    },
    // 分页相关
    handleTableData(data) {
      this.allData = data;
      this.count = data.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (data.length < this.pageSize) {
        this.tableData = this.allData;
      } else {
        this.tableData = this.allData.slice(0, this.pageSize);
      }
    },
    changePage(index) {
      const start = (index - 1) * this.pageSize;
      const end = index * this.pageSize;
      this.tableData = this.allData.slice(start, end);
    },
  },
};
</script>
