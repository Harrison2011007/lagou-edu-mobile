<template>
  <div class="coursecontent">
    <!-- 顶部轮播设置 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list></course-content-list>
  </div>
</template>

<script>
import CourseContentList from './CourseContentList'
import { getAllAds } from '@/services/course'
export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 轮播图列表
      adList: []
    }
  },
  created () {
    // 轮播图图片信息
    this.loadAds()
  },
  methods: {
    async loadAds () {
      // 此处的'999'是后端返回的数据，代表首页顶部轮播图的广告位
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // 存储到adList
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }

}
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.my-swipe img {
  height: 170px;
}

.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
