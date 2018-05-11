<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加外来人员信息</Button>
            <Button type="primary" icon="ios-download-outline" @click="exportData">导出数据</Button>
            <div style="float: right">
              <Select v-model="gender" placeholder="性别搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in genderList"
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
              ref="table"
              filename="外来人员信息"
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

    <Modal v-model="addModal" title="添加外来人员信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="addModalData.name" placeholder="请输入姓名">
          </Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="addModalData.gender" placeholder="请选择性别" style="width: 150px" clearable>
            <Option
              v-for="item in genderList"
              :value="item.value"
              :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="身份证号" prop="card">
          <Input v-model="addModalData.card" placeholder="请输入身份证号">
          </Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input v-model="addModalData.age" placeholder="请输入年龄">
          </Input>
        </FormItem>
        <FormItem label="进入时间" prop="comeTime">
          <DatePicker
            type="datetime"
            placeholder="选择进入时间"
            v-model="addModalData.comeTime">
          </DatePicker>
        </FormItem>
        <FormItem label="原因" prop="reason">
          <Input v-model="addModalData.reason" placeholder="请输入进入原因">
          </Input>
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
import { column, genderList, } from './static';
import { formatTimestamp, isIdientify } from '@/utils/util';
import { addForeign, deleteForeignById, updateForeignById, fetchForeigners } from '@/api/foreign';

export default {
  name: 'ForeignRegister',
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
      politicalStatus: '',
      workerStatus: '',
      gender: '',
      selectedRow: {},
      genderList: [],
      statusList: [],
      currentPage: 1,
      addModal: false,
      statusModal: false,
      addModalData: {
        name: '',
        card: '',
        reason: '',
        comeTime: '',
        operatorId: '',
        politicalStatus: '',
        phone: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: this.validateCard, trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入外来原因', trigger: 'blur' },
        ],
        comeTime: [
          {
            required: true, type: 'date', message: '请选择进入时间', trigger: 'change',
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
    exportData() {
      this.$refs.table.exportTableData();
    },
    // 身份证号格式验证
    validateCard(rule, value, callback) {
      if (!isIdientify(value)) {
        callback(new Error('请输入正确格式身份证号'));
      } else {
        callback();
      }
    },
    getData() {
      this.column = column;
      this.genderList = genderList;
      this.fetchData();
    },
    fetchData(params = {}) {
      fetchForeigners(params)
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
            name: this.addModalData.name,
            gender: this.addModalData.gender,
            comeTime: formatTimestamp(this.addModalData.comeTime),
            card: this.addModalData.card,
            age: this.addModalData.age,
            reason: this.addModalData.reason,
            operatorId: this.addModalData.operatorId,
          };
          addForeign(data)
            .then(({ data: { code } }) => {
              if (code === 200) {
                this.addModal = false;
                this.$Message.success('添加成功!');
                this.fetchData();
                this.$refs.form.resetFields();
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
      deleteForeignById(row.id)
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
      updateForeignById(row.id, row)
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
      if (this.gender !== '') {
        params.gender = this.gender;
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
