<template>
  <div :style="styleObj">
    <Table :height="height" :columns="columns" :data="cityData"></Table>
  </div>
</template>

<script>
import Base64 from 'crypto-js/enc-base64';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import request from '@/utils/request';

export default {
  name: 'mapDataTable',
  data() {
    return {
      columns: [
        {
          title: '城市',
          key: 'name',
        },
        {
          title: '温度',
          key: 'value',
          sortable: true,
        },
      ],
    };
  },
  props: {
    cityData: Array,
    styleObj: Object,
    height: String,
  },
  mounted() {
    // this.fetchWeatherInfo();
  },
  methods: {
    fetchWeatherInfo() {
      const UID = 'UF101DA893';
      const KEY = 'ij5b6x8u37ovmbpk';
      const ts = Math.floor((new Date()).getTime() / 1000);
      let str = `ts=${ts}&uid=${UID}`;

      const result = hmacSHA1(str, KEY);
      const sig = Base64.stringify(result);
      str = `${str}&sig=${sig}`;
      const API = 'http://api.seniverse.com/v3/weather/now.json?location=beijing&';
      const url = `${API + str}&callback=?`;
    },
  },
};
</script>
