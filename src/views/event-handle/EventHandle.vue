<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加事件处理信息</Button>
            <Button type="primary" icon="edit" @click="handleChangeStatus">选中一行改变处理状态</Button>
            <div style="float: right">
              <Select v-model="eventType" placeholder="事件类型搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in eventTypeList"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
              <Select v-model="status" placeholder="处理状态搜索" style="width: 150px" clearable>
                <Option
                  v-for="item in statusList"
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
    <Modal
      v-model="addModal"
      title="添加事件处理信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="事件类型">
          <Select v-model="addModalData.type" placeholder="选择事件类型">
            <Option
              v-for="item in eventTypeList"
              :value="item.value"
              :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="上报时间" prop="reportTime">
          <DatePicker
            type="datetime"
            placeholder="选择上报时间"
            v-model="addModalData.reportTime">
          </DatePicker>
        </FormItem>
        <FormItem label="处理人" prop="operatorId">
          <Input v-model="addModalData.operatorId" placeholder="请输入处理人"></Input>
        </FormItem>
        <FormItem label="详细信息" prop="detailInfo">
          <Input v-model="addModalData.detailInfo" placeholder="请输入详细信息"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit">添加</Button>
      </div>
    </Modal>
    <Modal
      v-model="statusModal"
      title="修改事件处理状态"
      @on-ok="handleOkStatus"
      @on-cancel="cancel">
      <Select v-model="selectedStatus">
        <Option
          v-for="item in statusList"
          :value="item.value"
          :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
    </Modal>
  </div>
</template>

<script>
import canEditTable from '../tables/components/canEditTable.vue';
import { column, eventTypeList, statusList } from './static';
import { isEmptyObject, formatTimestamp } from '@/utils/util';
import { addEvent, deleteEventById, updateEventById, fetchEvents } from '@/api/event';

export default {
  name: 'EventHandle',
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
      eventType: '',
      status: '',
      selectedRow: {},
      selectedStatus: '',
      eventTypeList: [],
      statusList: [],
      currentPage: 1,
      addModal: false,
      statusModal: false,
      addModalData: {
        type: '',
        status: 0,
        reportTime: '',
        operatorId: '',
        detailInfo: '',
      },
      ruleValidate: {
        operatorId: [
          { required: true, message: '请输入处理人', trigger: 'blur' },
        ],
        reportTime: [
          {
            required: true, type: 'date', message: '请选择上报日期', trigger: 'change',
          },
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
      this.eventTypeList = eventTypeList;
      this.statusList = statusList;
      this.fetchData();
    },
    fetchData(params = {}) {
      fetchEvents(params)
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
      this.statusModal = false;
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
            type: this.addModalData.type,
            status: this.addModalData.status,
            reportTime: formatTimestamp(this.addModalData.reportTime),
            operatorId: this.addModalData.operatorId,
            detailInfo: this.addModalData.detailInfo,
            handleTime: '',
          };
          addEvent(data)
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
    // 改变事件状态按钮事件处理
    handleChangeStatus() {
      // 选中行为空提示消息
      if (isEmptyObject(this.selectedRow)) {
        this.$Message.warning('请选择一条数据进行修改');
      } else {
        this.statusModal = true;
        this.selectedStatus = this.selectedRow.status;
      }
    },
    // 确认改变事件处理状态
    handleOkStatus() {
      // 更新处理时间及处理状态
      updateEventById(this.selectedRow.id, {
        status: this.selectedStatus,
        handleTime: new Date().getTime().toString(),
      })
        .then(({ data: { code } }) => {
          if (code === 200) {
            this.$Message.success('修改状态成功');
            this.fetchData();
          }
        });
    },
    // 根据 ID 删除当前行数据
    handleDelete(val, index, row) {
      deleteEventById(row.id)
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
      updateEventById(row.id, row)
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
      if (this.eventType !== '') {
        params.type = this.eventType;
      }
      if (this.status !== '') {
        params.status = this.status;
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
