<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加工作人员信息</Button>
            <div style="float: right">
              <Select v-model="politicalStatus" placeholder="政治面貌搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in politicalStatusList"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
              <Select v-model="workerStatus" placeholder="工作状态搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in workerStatusList"
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

    <Modal v-model="addModal" title="添加工作人员信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="account">
          <Input v-model="addModalData.account" placeholder="请输入用户名">
          </Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="addModalData.password" placeholder="请输入密码">
          </Input>
        </FormItem>
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
        <FormItem label="政治面貌">
          <Select
            v-model="addModalData.politicalStatus"
            placeholder="请选择政治面貌"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in politicalStatusList"
              :value="item.value"
              :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="addModalData.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="beginTime">
          <DatePicker
            type="datetime"
            placeholder="选择工作开始时间"
            v-model="addModalData.beginTime">
          </DatePicker>
        </FormItem>
        <FormItem label="职务" prop="position">
          <Input v-model="addModalData.position" placeholder="请输入职务">
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
import { column, genderList, politicalStatusList, workerStatusList } from './static';
import { formatTimestamp, isIdientify } from '@/utils/util';
import { addWorker, deleteWorkerById, updateWorkerById, fetchWorkers } from '@/api/worker';

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
      politicalStatusList: [],
      workerStatusList: [],
      genderList: [],
      currentPage: 1,
      addModal: false,
      statusModal: false,
      addModalData: {
        account: '',
        password: '',
        name: '',
        gender: '',
        card: '',
        politicalStatus: '',
        phone: '',
        beginTime: '',
        position: '',
      },
      ruleValidate: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: this.validateCard, trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        beginTime: [
          {
            required: true, type: 'date', message: '请选择进入时间', trigger: 'change',
          },
        ],
        position: [
          { required: true, message: '请输入职务', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
      this.workerStatusList = workerStatusList;
      this.politicalStatusList = politicalStatusList;
      this.fetchData();
    },
    fetchData(params = {}) {
      fetchWorkers(params)
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
          addWorker(data)
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
      deleteWorkerById(row.id)
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
      updateWorkerById(row.id, row)
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
      } else if (this.politicalStatus !== '') {
        params.politicalStatus = this.politicalStatus;
      } else if (this.workerStatus !== '') {
        params.workerStatus = this.workerStatus;
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
