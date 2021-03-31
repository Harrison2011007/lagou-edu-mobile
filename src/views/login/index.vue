<template>
  <div class="login">
    <van-nav-bar
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '请填写用户名'
          },
          {
            validator: phoneCheck,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    // 提交
    onSubmit () {

    },
    // 返回按钮
    onClickLeft () {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang='scss' scoped>

</style>
