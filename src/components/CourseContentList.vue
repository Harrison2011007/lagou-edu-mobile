<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
        <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="$router.push({
          name: 'course-info',
          params: {
            courseId: item.id
          }
        })"
        >
        <!-- 课程左侧图片 -->
        <div>
          <img :src="item.courseImgUrl || item.image" alt="" >
        </div>
        <!-- 右侧课程信息 -->
        <div class="course-info">
          <h3 v-text="item.courseName || item.name"></h3>
          <p class="course-preview" v-html="item.previewFirstField"></p>
          <!-- 如果已经购买课程，无需显示价格区域 -->
          <p
            v-if="item.price"
            class="price-container">
            <span class="course-discounts">￥{{ item.discounts }}</span>
            <s class="course-price">￥{{ item.price }}</s>
          </p>
        </div>
      </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 用于存储数据
      list: [],
      // 是否进行加载
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      refreshing: false
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      // 还原数据页数为1
      this.currentPage = 1
      // 重新发送请求
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.refreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架的课程
        status: 1
      })
      // console.log(data)
      // 每次不能重新赋值，只能追加到list中
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下次请求下一页
      this.currentPage++
      // 加载装填结束
      this.loading = false

      // 加载全部加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }

}
</script>

<style lang='scss' scoped>
/* 列表组件的固定滚动设置 */
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
}

/* 课程列表项的样式 */
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
}

.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.course-info .course-preview {
  flex-grow: 1;
}

.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}

p, h3 {
  margin: 0;
}
</style>
