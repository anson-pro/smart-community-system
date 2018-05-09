<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加设施维护信息</Button>
            <div style="float: right">
              <Select v-model="id" placeholder="设施名称搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in facilityInfoList"
                  :value="item.id"
                  :key="item.name">
                  {{ item.name }}
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

    <Modal v-model="addModal" title="添加设施维护信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="设施名称" prop="name">
          <Select v-model="addModalData.id" placeholder="请选择设施名称" style="width: 150px" clearable>
            <Option
              v-for="item in facilityInfoList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="维护人员" prop="operator">
          <Input v-model="addModalData.operator" placeholder="请输入维护人员姓名">
          </Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="addModalData.phone" placeholder="请输入手机号">
          </Input>
        </FormItem>
        <FormItem label="维护时间" prop="maintainTime">
          <DatePicker
            type="datetime"
            placeholder="选择维护时间"
            v-model="addModalData.maintainTime">
          </DatePicker>
        </FormItem>
        <FormItem label="维护金额" prop="amount">
          <Input v-model="addModalData.amount" placeholder="请输入维护金额">
          </Input>
        </FormItem>
        <FormItem label="管理员" prop="maintainAdmin">
          <Input v-model="addModalData.maintainAdmin" placeholder="请输入管理员">
          </Input>
        </FormItem>
        <FormItem label="详细信息" prop="detailInfo">
          <Input v-model="addModalData.detailInfo" placeholder="请输入详细信息">
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
import column from './static/FacilityMaintain';
import { formatTimestamp } from '@/utils/util';
import {
  addFacilityMaintain,
  deleteFacilityMaintainById,
  updateFacilityMaintainById,
  fetchFacilityMaintains,
  fetchMaintainsByFacilityName,
} from '@/api/facility/maintain';
import { fetchFacilityInfos } from '@/api/facility/info';

export default {
  name: 'MaintainManager',
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
      // 设施 id
      id: '',
      // 设施名称列表
      facilityInfoList: [],
      selectedRow: {},
      currentPage: 1,
      addModal: false,
      addModalData: {
        id: '',
        operator: '',
        phone: '',
        maintainTime: '',
        amount: '',
        maintainAdmin: '',
        detailInfo: '',
      },
      ruleValidate: {
        operator: [
          { required: true, message: '请输入维护人员姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        maintainTime: [
          {
            required: true, type: 'date', message: '请选择维护时间', trigger: 'change',
          },
        ],
        amount: [
          { required: true, message: '请输入维护金额', trigger: 'blur' },
        ],
        maintainAdmin: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' },
        ],
        detailInfo: [
          { required: true, message: '请输入详细信息', trigger: 'blur' },
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
      this.fetchFacilityInfosList();
    },
    fetchData(params = {}) {
      fetchFacilityMaintains(params)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.handleTableData(data);
          }
        });
    },
    // 获取设备信息列表
    fetchFacilityInfosList() {
      return fetchFacilityInfos()
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.facilityInfoList = data;
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
      this.fetchFacilityInfosList()
        .then(() => {
          this.addModal = true;
        });
    },
    // 添加事件处理信息
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        // 验证表单成功进行请求
        if (valid) {
          const data = {
            operator: this.addModalData.operator,
            facilityId: this.addModalData.id,
            phone: this.addModalData.phone,
            maintainTime: formatTimestamp(this.addModalData.maintainTime),
            amount: this.addModalData.amount,
            maintainAdmin: this.addModalData.maintainAdmin,
            detailInfo: this.addModalData.detailInfo,
          };
          addFacilityMaintain(data)
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
      deleteFacilityMaintainById(row.id)
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
      updateFacilityMaintainById(row.id, row)
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
      if (this.id !== '') {
        fetchMaintainsByFacilityName(this.id)
          .then(({ data: { code, data: { maintains } } }) => {
            if (code === 200) {
              this.handleTableData(maintains);
            }
          });
      } else {
        this.fetchData();
      }
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
