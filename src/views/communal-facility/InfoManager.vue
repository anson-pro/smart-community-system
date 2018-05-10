<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加设施信息</Button>
            <div style="float: right">
              <Input v-model="name" placeholder="请输入设施名称" style="width: 150px" clearable>
              </Input>
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

    <Modal v-model="addModal" title="添加设施信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="设施名称" prop="name">
          <Input v-model="addModalData.name" placeholder="请输入设施名称">
          </Input>
        </FormItem>
        <FormItem label="承建商" prop="contractor">
          <Input v-model="addModalData.contractor" placeholder="请输入承建商">
          </Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="addModalData.phone" placeholder="请输入手机号">
          </Input>
        </FormItem>
        <FormItem label="负责人" prop="operator">
          <Input v-model="addModalData.operator" placeholder="请输入负责人">
          </Input>
        </FormItem>
        <FormItem label="交付时间" prop="deliveryTime">
          <DatePicker
            type="datetime"
            placeholder="选择交付时间"
            v-model="addModalData.deliveryTime">
          </DatePicker>
        </FormItem>
        <FormItem label="管理员" prop="facilityAdmin">
          <Input v-model="addModalData.facilityAdmin" placeholder="请输入设施管理员">
          </Input>
        </FormItem>
        <FormItem label="设施金额" prop="amount">
          <Input v-model="addModalData.amount" placeholder="请输入设施金额">
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
import column from './static/FacilityInfo';
import { formatTimestamp } from '@/utils/util';
import { addFacilityInfo, deleteFacilityInfoById, updateFacilityInfoById, fetchFacilityInfos } from '@/api/facility/info';

export default {
  name: 'InfoManager',
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
      name: '',
      selectedRow: {},
      currentPage: 1,
      addModal: false,
      addModalData: {
        name: '',
        contractor: '',
        phone: '',
        operator: '',
        deliveryTime: '',
        facilityAdmin: '',
        amount: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入设施信息', trigger: 'blur' },
        ],
        contractor: [
          { required: true, message: '请输入承建商信息', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        operator: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' },
        ],
        deliveryTime: [
          {
            required: true, type: 'date', message: '请选择进入时间', trigger: 'change',
          },
        ],
        facilityAdmin: [
          { required: true, message: '请输入设施管理员姓名', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入设施金额', trigger: 'blur' },
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
      this.fetchData();
    },
    fetchData(params = {}) {
      fetchFacilityInfos(params)
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
            contractor: this.addModalData.contractor,
            phone: this.addModalData.phone,
            operator: this.addModalData.operator,
            deliveryTime: formatTimestamp(this.addModalData.deliveryTime),
            facilityAdmin: this.addModalData.facilityAdmin,
            amount: this.addModalData.amount,
          };
          addFacilityInfo(data)
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
      deleteFacilityInfoById(row.id)
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
      updateFacilityInfoById(row.id, row)
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
      if (this.name !== '') {
        params.name_like = this.name;
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
