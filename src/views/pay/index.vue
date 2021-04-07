<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price-info">
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使用此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：{{ username }}</div>
      </van-cell>
      <!-- 支付功能 -->
      <van-cell class="pay-channel">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell  @click="radio = '1'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell clickable @click="radio = '2'">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button>
          ￥{{ course.discounts }} 立即支付
        </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
import { createOrder } from '@/services/pay'
export default {
  name: 'Pay',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // raidio单选框选中数据
      radio: '1',
      // 订单号
      orderNo: null
    }
  },
  created () {
    this.loadCourse()
    // 订单获取
    this.loadOrder()
  },
  methods: {
    // 获取订单
    async loadOrder () {
      // 创建订单，获取订单号
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      console.log(data)
      this.orderNo = data.content.orderNo
      // 获取支付方式,data重名，用结构的方式用payinfo代替
      // const { data: payInfo } = await getPayInfo({
      //   shopOrderNo: this.orderNo
      // })
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  },
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }

}
</script>

<style lang='scss' scoped>
.pay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.van-cell-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.course-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;
}

.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}

.course-info .van-cell__value {
  display: flex;
}

.course-info .price-info {
  height: 107px;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price-info .course-name {
  font-size: 16px;
}

.price-info .discounts {
  font-size: 22px;
  font-weight: 700;
  color: #ff7452;
}

.account-info {
  height: 120px;
  margin-bottom: 10px;
}

.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}

.account-info .username {
  margin: 20px 0 10px;
  font-size: 16px;
}

.pay-channel {
  flex: 1;
}

.pay-channel .van-cell {
  padding: 20px 10px;
}

.pay-channel .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pay-channel .van-cell__title {
  display: flex;
  align-items: center;
}

.pay-channel .van-cell img {
  width: 28px;
  height: 28px;
}

.pay-channel .van-cell span {
  font-size: 16px;
  margin-left: 10px;
}

/* 右侧 radio 选中颜色 */
::v-deep .van-radio__icon--checked .van-icon {
  background-color: #fbc546;
  border-color: #fbc546;
}

/* 底部按钮样式 */
.pay-channel .van-button {
  background: linear-gradient(170deg, #faa83e, #fbc546);
  border-radius: 20px;
  margin-bottom: 18px;
  font-size: 20px;
}
</style>
