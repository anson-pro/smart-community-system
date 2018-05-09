<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">请输入用户名及密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          Cookies.set('user', this.form.userName);
          Cookies.set('password', this.form.password);
          this.$store.commit('setAvator', 'https://ws1.sinaimg.cn/large/d40c6f39ly1fr30e2wf3xj20jg0je751.jpg');
          if (this.form.userName === 'admin') {
            Cookies.set('access', 0);
          } else {
            Cookies.set('access', 1);
          }
          this.$router.push({
            name: 'home_index',
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
  @import './login.less';
</style>
