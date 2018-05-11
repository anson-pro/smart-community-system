<style lang="less">
  @import "./home.less";
  @import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="24" :lg="8">
        <Row class-name="home-page-row1" :gutter="10">
          <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
            <Card>
              <Row type="flex" class="user-infor">
                <Col span="8">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <img class="avator-img" :src="avatorPath"/>
                  </Row>
                </Col>
                <Col span="16" style="padding-left:6px;">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <div>
                      <b class="card-user-infor-name">Admin</b>
                      <p>super admin</p>
                    </div>
                  </Row>
                </Col>
              </Row>
              <div class="line-gray"></div>
              <Row class="margin-top-8">
                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                <Col span="16" class="padding-left-8">2018.05.07-12:32:20</Col>
              </Row>
              <Row class="margin-top-8">
                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                <Col span="16" class="padding-left-8">黑龙江省哈尔滨市香坊区</Col>
              </Row>
            </Card>
          </Col>
          <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
            <Card>
              <p slot="title" class="card-title">
                <Icon type="android-checkbox-outline"></Icon>
                待办事项
              </p>
              <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                <Icon type="plus-round"></Icon>
              </a>
              <Modal
                v-model="showAddNewTodo"
                title="添加新的待办事项"
                @on-ok="addNew"
                @on-cancel="cancelAdd">
                <Row type="flex" justify="center">
                  <Input
                    v-model="newToDoItemValue"
                    icon="compose"
                    placeholder="请输入..."
                    style="width: 300px"/>
                </Row>
                <Row slot="footer">
                  <Button type="text" @click="cancelAdd">取消</Button>
                  <Button type="primary" @click="addNew">确定</Button>
                </Row>
              </Modal>
              <div class="to-do-list-con">
                <div v-for="(item, index) in toDoList"
                     :key="'todo-item' + (toDoList.length - index)"
                     class="to-do-item">
                  <to-do-list-item :content="item.title"></to-do-list-item>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col :md="24" :lg="16">
        <Row :gutter="5">
          <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="user_count"
              :end-val="count.user"
              iconType="android-person"
              color="#2d8cf0"
              intro-text="社区住户总数"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="facility_count"
              :end-val="count.facility"
              iconType="ios-eye"
              color="#64d572"
              :iconSize="50"
              intro-text="社区设施总数"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="house_count"
              :end-val="count.house"
              iconType="home"
              color="#ffd572"
              intro-text="社区房屋总数"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="event_count"
              :end-val="count.event"
              iconType="shuffle"
              color="#f25e43"
              intro-text="处理事件总数"
            ></infor-card>
          </Col>
        </Row>
        <Row>
          <Card :padding="0">
            <p slot="title" class="card-title">
              <Icon type="map"></Icon>
              今日天气情况
            </p>
            <div class="map-con">
              <Col span="10">
                <map-data-table
                  :cityData="cityData"
                  height="281"
                  :style-obj="{margin: '12px 0 0 11px'}">
                </map-data-table>
              </Col>
              <Col span="14" class="map-incon">
                <Row type="flex" justify="center" align="middle">
                  <home-map :city-data="cityData"></home-map>
                </Row>
              </Col>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
    <Row :gutter="10" class="margin-top-10">
      <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon>
            社区相关信息统计
          </p>
          <div class="data-source-row">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            社区婚姻情况统计
          </p>
          <div class="data-source-row">
            <data-source-pie id="marry-chart" type="marry"></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="8">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon>
            社区政治面貌统计
          </p>
          <div class="data-source-row">
            <data-source-pie id="status-chart" type="status"></data-source-pie>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import cityData from './map-data/get-city-value';
import { fetchUsers } from '@/api/user';
import { fetchFacilityInfos } from '@/api/facility/info';
import { fetchEvents } from '@/api/event';
import { fetchRooms } from '@/api/house';

export default {
  name: 'home',
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem,
  },
  data() {
    return {
      toDoList: [
        {
          title: '快使用数字化社区管理平台吧',
        },
        {
          title: '今天也要元气满满哦QAQ',
        },
      ],
      count: {
        user: 0,
        facility: 0,
        house: 0,
        event: 0,
      },
      cityData,
      showAddNewTodo: false,
      newToDoItemValue: '',
      marryChartOption: {},
      option: {},
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    },
  },
  created() {
    this.initCount();
  },
  methods: {
    initCount() {
      fetchUsers()
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.count.user = data.length;
          }
        })
        .then(fetchFacilityInfos)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.count.facility = data.length;
          }
        })
        .then(fetchEvents)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.count.event = data.length;
          }
        })
        .then(fetchRooms)
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            this.count.house = data.length;
          }
        });
    },
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue,
        });
        setTimeout(() => {
          this.newToDoItemValue = '';
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error('请输入待办事项内容');
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = '';
    },
  },
};
</script>
