<template>
  <div style="width:100%;height:100%;" :id="id"></div>
</template>

<script>
import echarts from 'echarts';
import { fetchUsers } from '@/api/user';

export default {
  name: 'dataSourcePie',
  props: ['type', 'id'],
  prop: {
    type: {
      validator(value) {
        return ['marry', 'status'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      chart: {},
      function: '',
    };
  },
  mounted() {
    this.$nextTick(function () {
      const dataSourcePie = echarts.init(document.getElementById(this.id));
      this.chart = dataSourcePie;
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: [],
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '66%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      dataSourcePie.setOption(option);
      window.addEventListener('resize', () => {
        dataSourcePie.resize();
      });
      if (this.type === 'marry') {
        this.function = this.initMarryChartOption;
      } else if (this.type === 'status') {
        this.function = this.initStatusChartOption;
      }
      this.function();
    });
  },
  methods: {
    initMarryChartOption() {
      let marriedCount = 0;
      let unmarriedCount = 0;
      fetchUsers({ hasMarried: 0 })
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            marriedCount = data.length;
          }
        })
        .then(() => {
          fetchUsers({ hasMarried: 1 })
            .then(({ data: { code, data } }) => {
              if (code === 200) {
                unmarriedCount = data.length;
                const option = {
                  legend: {
                    data: ['已婚', '未婚'],
                  },
                  series: [
                    {
                      data: [
                        { value: marriedCount, name: '已婚', itemStyle: { normal: { color: '#9bd598' } } },
                        { value: unmarriedCount, name: '未婚', itemStyle: { normal: { color: '#ffd58f' } } },
                      ],
                    },
                  ],
                };
                this.chart.setOption(option);
              }
            });
        });
    },
    initStatusChartOption() {
      let masses = 0;
      let member = 0;
      let party = 0;
      fetchUsers({ politicalStatus: 0 })
        .then(({ data: { code, data } }) => {
          if (code === 200) {
            masses = data.length;
          }
        })
        .then(() => {
          fetchUsers({ politicalStatus: 1 })
            .then(({ data: { code, data } }) => {
              if (code === 200) {
                member = data.length;
              }
            });
        }).then(() => {
          fetchUsers({ politicalStatus: 2 })
            .then(({ data: { code, data } }) => {
              if (code === 200) {
                party = data.length;
                const option = {
                  legend: {
                    data: ['群众', '团员', '党员'],
                  },
                  series: [
                    {
                      data: [
                        { value: masses, name: '群众', itemStyle: { normal: { color: '#9bd598' } } },
                        { value: member, name: '团员', itemStyle: { normal: { color: '#ffd58f' } } },
                        { value: party, name: '党员', itemStyle: { normal: { color: 'red' } } },
                      ],
                    },
                  ],
                };
                this.chart.setOption(option);
              }
            });
        });
    },
  },
};
</script>
