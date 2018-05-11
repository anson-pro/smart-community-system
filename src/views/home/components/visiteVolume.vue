<template>
  <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from 'echarts';
import { fetchFacilityInfos } from '@/api/facility/info';
import { fetchFacilityMaintains } from '@/api/facility/maintain';
import { fetchUsers } from '@/api/user';
import { fetchExpenses } from '@/api/finance/expense';
import { fetchWorkers } from '@/api/worker';
import { fetchForeigners } from '@/api/foreign';
import { fetchRooms } from '@/api/house';

export default {
  name: 'visiteVolume',
  data() {
    return {
      chart: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      const visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
      this.chart = visiteVolume;
      const xAxisData = [];
      const data1 = [];
      const data2 = [];
      for (let i = 0; i < 20; i++) {
        xAxisData.push(`类目${i}`);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['人口', '房屋', '设施', '维护记录', '支付记录', '外来人员', '管理人员'],
          nameTextStyle: {
            color: '#c3c3c3',
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
      };

      visiteVolume.setOption(option);

      window.addEventListener('resize', () => {
        visiteVolume.resize();
      });
      this.fetchData();
    });
  },
  methods: {
    fetchData() {
      let user = 0;
      let house = 0;
      let facility = 0;
      let maintain = 0;
      let expenses = 0;
      let foreign = 0;
      let worker = 0;
      fetchUsers()
        .then(({ data: { data } }) => {
          user = data.length;
        })
        .then(fetchRooms)
        .then(({ data: { data } }) => {
          house = data.length;
        })
        .then(fetchFacilityInfos)
        .then(({ data: { data } }) => {
          facility = data.length;
        })
        .then(fetchFacilityMaintains)
        .then(({ data: { data } }) => {
          maintain = data.length;
        })
        .then(fetchExpenses)
        .then(({ data: { data } }) => {
          expenses = data.length;
        })
        .then(fetchForeigners)
        .then(({ data: { data } }) => {
          foreign = data.length;
        })
        .then(fetchWorkers)
        .then(({ data: { data } }) => {
          worker = data.length;
          const option = {
            series: [
              {
                type: 'bar',
                data: [
                  { value: user, name: '人口', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: house, name: '房屋', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: facility, name: '设施', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: maintain, name: '维护记录', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: expenses, name: '支付记录', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: foreign, name: '外来人员', itemStyle: { normal: { color: '#2d8cf0' } } },
                  { value: worker, name: '管理人员', itemStyle: { normal: { color: '#2d8cf0' } } },
                ],
              },
            ],
          };
          this.chart.setOption(option);
        });
    },
  },
};
</script>
