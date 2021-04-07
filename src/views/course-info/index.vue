<template>
  <div class="course-info">
    <!-- 顶部课程内容,由于购买课程之后不需要显示底部支付功能，所以对顶部样式进行动态绑定 -->
    <van-cell-group :style="styleOptions">
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
          <!-- 课程销售信息 -->
        <div class="course-sale-Info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }} </span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail">
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <!-- 详情在后台是通过富文本编辑器设置的，内容为 HTML 文本 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item">
            </course-section>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts}}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import CourseSection from './components/CourseSection'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  components: {
    CourseSection
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 课程章节信息
      sections: {},
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    // 章节信息
    this.loadSection()
  },
  methods: {
    // 支付操作
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        // 如果已经登陆
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullpath
          }
        })
      }
    },
    // 获取章节信息
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      // console.log(data)
      this.sections = data.content.courseSectionList
    },
    // 获取课程信息
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    }
  }

}
</script>

<style lang='scss' scoped>
/* 课程图片区域 */
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

/* 课程描述区域 */
.course-description {
  padding: 10px 20px;
  height: 150px;
}

.course-sale-info {
  display: flex;
}

.course-sale-info .course-price {
  flex: 1;
  margin: 0;
}
// 修改 discounts 作用范围，让顶部与底部均可使用
.discounts {
  color: #ff7452;
  font-size: 24px !important;
  font-weight: 700;
}

.course-saleInfo .tag{
  line-height: 15px;
  background: #f8f9fa;
  border-radius: 2px;
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
}

/* 顶部结构的设置 */
.van-cell-group {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price span {
  font-size: 14px;
}

.van-button {
  width: 50%;
  height: 80%;
}
</style>
