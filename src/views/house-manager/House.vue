<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加房屋信息</Button>
            <Button type="primary" icon="ios-download-outline" @click="exportData">导出数据</Button>
            <div style="float: right">
              <Select
                v-model="unitId"
                placeholder="单元ID搜索"
                style="width: 150px"
                clearable
                filterable
              >
                <Option
                  v-for="item in unitIdList"
                  :value="item.id"
                  :key="item.id">{{ item.id }}
                </Option>
              </Select>
              <Input v-model="name" placeholder="请输入房屋名称" style="width: 150px" clearable>
              </Input>
              <Button type="primary" icon="search" @click="handleSearch">搜索</Button>
            </div>
          </Row>
          <Row>
            <can-edit-table
              ref="table"
              filename="房屋信息"
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

    <Modal v-model="addModal" title="添加房屋信息">
      <Form ref="form" :model="addModalData" :rules="ruleValidate" :label-width="80">
        <FormItem label="街道" prop="street">
          <Select
            v-model="addModalData.street"
            placeholder="请选择街道"
            @on-change="handleChangeStreet"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.streetList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="物业" prop="property">
          <Select
            v-model="addModalData.property"
            placeholder="请选择物业"
            @on-change="handleChangeProperty"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.propertyList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="小区" prop="community">
          <Select
            v-model="addModalData.community"
            placeholder="请选择小区"
            @on-change="handleChangeCommunity"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.communityList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="楼" prop="floor">
          <Select
            v-model="addModalData.floor"
            placeholder="请选择楼"
            @on-change="handleChangeFloor"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.floorList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="单元" prop="unit">
          <Select
            v-model="addModalData.unit"
            placeholder="请选择单元"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.unitList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="房屋名称" prop="name">
          <Input v-model="addModalData.name" placeholder="请输入房屋名称">
          </Input>
        </FormItem>
        <FormItem label="楼层" prop="level">
          <Input v-model="addModalData.level" placeholder="请输入楼层">
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
import column from './static';
import { formatTimestamp } from '@/utils/util';
import {
  addRoom,
  deleteRoomById,
  updateRoomById,
  fetchRooms,
  fetchUnits,
  fetchStreets,
  fetchProperties,
  // 获取小区信息
  fetchCommunities,
  fetchFloorsByCommunityId,
  fetchUnitsByFloorId,
} from '@/api/house';

export default {
  name: 'House',
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
      // 搜索单元 ID
      unitId: '',
      unitIdList: [],
      name: '',
      selectedRow: {},
      addModal: false,
      addModalData: {
        street: '',
        streetList: [],
        property: '',
        propertyList: [],
        community: '',
        communityList: [],
        floor: '',
        floorList: [],
        unit: '',
        unitList: [],
        name: '',
        level: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入房屋名称', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '请输入楼层', trigger: 'blur' },
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
    getData() {
      this.column = column;
      fetchUnits()
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.unitIdList = data;
          }
        }).then(() => {
          this.fetchData();
        });
    },
    fetchData(params = {}) {
      return fetchRooms(params)
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
    initAddModal() {
      fetchStreets()
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.streetList = data;
          }
        })
        .then(fetchProperties)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.propertyList = data;
          }
        });
    },
    // Modal 取消按钮事件
    cancel() {
      this.addModal = false;
      this.$Message.info('您选择了取消');
    },
    // 添加按钮事件
    handleAddEvent() {
      this.addModal = true;
      this.initAddModal();
    },
    handleChangeStreet() {
      const params = { streetId: this.addModalData.street };
      if (this.addModalData.property !== '') {
        params.propertyId = this.addModalData.property;
      }
      fetchCommunities(params)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.communityList = data;
          }
        });
    },
    handleChangeProperty() {
      const params = { propertyId: this.addModalData.property };
      if (this.addModalData.street !== '') {
        params.streetId = this.addModalData.street;
      }
      fetchCommunities(params)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.communityList = data;
          }
        });
    },
    handleChangeCommunity() {
      fetchFloorsByCommunityId(this.addModalData.community)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.floorList = data;
          }
        });
    },
    handleChangeFloor() {
      fetchUnitsByFloorId(this.addModalData.floor)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.unitList = data;
          }
        });
    },
    // 添加事件处理信息
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        // 验证表单成功进行请求
        if (valid) {
          const data = {
            unitId: this.addModalData.unit,
            name: this.addModalData.name,
            createTime: new Date().getTime().toString(),
            level: this.addModalData.floor,
          };
          addRoom(data)
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
      deleteRoomById(row.id)
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
      updateRoomById(row.id, row)
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
      if (this.unitId !== '') {
        params.unitId = this.unitId;
      } else if (this.name !== '') {
        params.name = this.name;
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
