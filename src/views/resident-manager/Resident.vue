<template>
  <div>
    <Row>
      <Col :span="24">
        <Card dis-hover>
          <Row style="margin-bottom: 10px">
            <Button type="primary" icon="plus" @click="handleAddEvent">添加户主信息</Button>
            <Button type="primary" icon="plus" @click="handleAddFamilyMember">添加家庭成员信息</Button>
            <div style="float: right">
              <Select
                v-model="roomId"
                placeholder="房屋ID搜索"
                style="width: 150px"
                clearable
                filterable
              >
                <Option
                  v-for="item in roomIdList"
                  :value="item.id"
                  :key="item.id">{{ item.id }}
                </Option>
              </Select>
              <Select
                v-model="relation"
                placeholder="是否为户主"
                style="width: 150px"
                clearable
              >
                <Option
                  v-for="item in relationList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}
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

    <Modal v-model="addModal" title="添加户主信息">
      <Form ref="addForm" :model="addModalData" :rules="ruleValidate" :label-width="80" inline>
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
            @on-change="handleChangeUnit"
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
        <FormItem label="房间" prop="room">
          <Select
            v-model="addModalData.room"
            placeholder="请选择房间"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in addModalData.roomList"
              :value="item.id"
              :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>

        <FormItem label="姓名" prop="name">
          <Input v-model="addModalData.name" placeholder="请输入家庭成员姓名">
          </Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <Select
            v-model="addModalData.gender"
            placeholder="请选择性别"
            style="width: 150px">
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
        <FormItem label="政治面貌" prop="politicalStatus">
          <Select
            v-model="addModalData.politicalStatus"
            placeholder="请选择政治面貌"
            style="width: 150px">
            <Option
              v-for="item in politicalStatusList"
              :value="item.value"
              :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="addModalData.phone" placeholder="请输入手机号">
          </Input>
        </FormItem>
        <FormItem label="工作地点" prop="companyLocation">
          <Input v-model="addModalData.companyLocation" placeholder="请输入工作地点">
          </Input>
        </FormItem>
        <FormItem label="入住时间" prop="checkInTime">
          <DatePicker
            type="date"
            placeholder="选择入住时间"
            v-model="addModalData.checkInTime">
          </DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="handleSubmit">添加</Button>
      </div>
    </Modal>

    <Modal v-model="familyModal" title="添加家庭成员信息">
      <Form ref="memberForm" :model="familyModalData" :rules="ruleFamilyValidate" :label-width="80">
        <FormItem label="户主" prop="keyMember">
          <Select
            v-model="familyModalData.keyMember"
            placeholder="请选择户主"
            style="width: 150px"
            clearable>
            <Option
              v-for="item in familyModalData.keyMemberList"
              :value="item.roomId"
              :key="item.id">{{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="familyModalData.name" placeholder="请输入家庭成员姓名">
          </Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <Select
            v-model="familyModalData.gender"
            placeholder="请选择性别"
            style="width: 150px">
            <Option
              v-for="item in genderList"
              :value="item.value"
              :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="身份证号" prop="card">
          <Input v-model="familyModalData.card" placeholder="请输入身份证号">
          </Input>
        </FormItem>
        <FormItem label="政治面貌" prop="politicalStatus">
          <Select
            v-model="familyModalData.politicalStatus"
            placeholder="请选择政治面貌"
            style="width: 150px">
            <Option
              v-for="item in politicalStatusList"
              :value="item.value"
              :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="familyModalData.phone" placeholder="请输入手机号">
          </Input>
        </FormItem>
        <FormItem label="工作地点" prop="companyLocation">
          <Input v-model="familyModalData.companyLocation" placeholder="请输入工作地点">
          </Input>
        </FormItem>
        <FormItem label="入住时间" prop="checkInTime">
          <DatePicker
            type="date"
            placeholder="选择入住时间"
            v-model="familyModalData.checkInTime">
          </DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="handleMemberSubmit">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import canEditTable from '../tables/components/canEditTable.vue';
import { column, genderList, politicalStatusList, relationList } from './static';
import { formatTimestamp } from '@/utils/util';
import { addUser, updateUserById, deleteUserById, fetchUsers } from '@/api/user';
import {
  fetchRooms,
  fetchStreets,
  fetchProperties,
  // 获取小区信息
  fetchCommunities,
  fetchFloorsByCommunityId,
  fetchUnitsByFloorId,
  fetchRoomsByUnitId,
} from '@/api/house';

export default {
  name: 'Resident',
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
      genderList: [],
      politicalStatusList: [],
      // 搜索房间 ID
      roomId: '',
      roomIdList: [],
      // 是否户主搜索
      relation: '',
      relationList: [],
      selectedRow: {},
      addModal: false,
      familyModal: false,
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
        room: '',
        roomList: [],
        name: '',
        gender: '',
        card: '',
        politicalStatus: '',
        phone: '',
        companyLocation: '',
        checkInTime: '',
      },
      familyModalData: {
        keyMember: '',
        keyMemberList: [],
        name: '',
        gender: '',
        card: '',
        politicalStatus: '',
        phone: '',
        companyLocation: '',
        checkInTime: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
      },
      ruleFamilyValidate: {
        name: [
          { required: true, message: '请输入家庭成员姓名', trigger: 'blur' },
        ],
        card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
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
      this.relationList = relationList;
      this.genderList = genderList;
      this.politicalStatusList = politicalStatusList;
      fetchRooms()
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.roomIdList = data;
          }
        }).then(() => {
          this.fetchData();
        });
    },
    fetchData(params = {}) {
      return fetchUsers(params)
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
    // 初始化添加户主信息
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
      this.familyModal = false;
      this.$Message.info('您选择了取消');
    },
    // 添加按钮事件
    handleAddEvent() {
      this.addModal = true;
      this.initAddModal();
    },
    // 添加家庭成员按钮
    handleAddFamilyMember() {
      fetchUsers({ relation: 0 })
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.familyModalData.keyMemberList = data;
            this.familyModal = true;
          }
        });
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
    handleChangeUnit() {
      fetchRoomsByUnitId(this.addModalData.unit)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.addModalData.roomList = data;
          }
        });
    },
    // 添加户主处理信息
    handleSubmit() {
      this.$refs.addForm.validate((valid) => {
        // 验证表单成功进行请求
        if (valid) {
          const data = {
            relation: 0,
            roomId: this.addModalData.room,
            name: this.addModalData.name,
            gender: this.addModalData.gender,
            card: this.addModalData.card,
            politicalStatus: this.addModalData.politicalStatus,
            phone: this.addModalData.phone,
            companyLocation: this.addModalData.companyLocation,
            checkInTime: formatTimestamp(this.addModalData.checkInTime),
          };
          addUser(data)
            .then(({ data: { code } }) => {
              if (code === 200) {
                this.addModal = false;
                this.$Message.success('添加成功!');
                this.fetchData();
                this.$refs.addForm.resetFields();
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
    // 添加家庭成员处理
    handleMemberSubmit() {
      this.$refs.memberForm.validate((valid) => {
        // 验证表单成功进行请求
        if (valid) {
          const data = {
            relation: 1,
            roomId: this.familyModalData.keyMember,
            name: this.familyModalData.name,
            gender: this.familyModalData.gender,
            card: this.familyModalData.card,
            politicalStatus: this.familyModalData.politicalStatus,
            phone: this.familyModalData.phone,
            companyLocation: this.familyModalData.companyLocation,
            checkInTime: formatTimestamp(this.familyModalData.checkInTime),
          };
          addUser(data)
            .then(({ data: { code } }) => {
              if (code === 200) {
                this.familyModal = false;
                this.$Message.success('添加成功!');
                this.fetchData();
                this.$refs.memberForm.resetFields();
                this.currentPage = 1;
              }
            }).catch(() => {
              this.familyModal = false;
              this.$Message.error('添加失败');
            });
        } else {
          this.$Message.error('请确保各项信息填写正确！');
        }
      });
    },
    // 根据 ID 删除当前行数据
    handleDelete(val, index, row) {
      deleteUserById(row.id)
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
      updateUserById(row.id, row)
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
      if (this.roomId !== '') {
        params.roomId = this.roomId;
      } else if (this.relation !== '') {
        params.relation = this.relation;
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
