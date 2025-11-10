<template>
  <el-container>
    <el-main>
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="item in bannerItems" :key="item.ID+''">
          <el-link :href="item.url" target="_blank"><el-image :src="item.bannerImg" fit="fill" /></el-link>
        </el-carousel-item>
      </el-carousel>
      <el-input v-model="searchText" type="text" placeholder="请输入查找内容" prefix-icon="el-icon-search" clearable @keyup.enter.native="handleEnter" />
      <el-tabs v-model="activeCategory" @tab-click="handleClick">
        <el-tab-pane v-for="cate in categorys" :key="cate.ID+''" :label="cate.name" :name="cate.ID+''">
          <div v-for="item in getCurrItems()" :key="item.ID+''">
            <el-card class="box-card" shadow="always">
              <div slot="header">
                <el-button :type="item.isPin?'warning':''" size="mini" icon="el-icon-star-off" circle :loading="pinLoading" @click="handlePin(item)" /><span style="padding: 0 6px 0">{{ item.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text"><el-link type="primary" :href="item.url" target="_blank"><b>访问</b></el-link></el-button>
              </div>
              <div class="text item">名称：{{ item.name }}</div>
              <div class="text item">地址：{{ item.url }}</div>
            </el-card>
          </div>

        </el-tab-pane>
      </el-tabs>
    </el-main>

  </el-container>
</template>

<script>
import { categoryList } from '@/api/home/category'
import { itemList } from '@/api/home/item'
import { myItemAdd, myItemDelete } from '@/api/home/my_item'

export default {
  name: 'Index',
  props: {

  },
  data() {
    return {
      searchText: '',
      activeCategory: '0',
      categorys: [
        // { ID: 0, name: '全部', sort: -1 },
        // { ID: 1, name: '我的', sort: -1 },
        // { ID: 2, name: '研发工具', sort: -1 },
        // { ID: 3, name: '功率预测', sort: -1 },
        // { ID: 4, name: '底座', sort: -1 },
        // { ID: 5, name: '其他', sort: -1 }
      ],
      items: [
        // { ID: 1, isPin: true, pinOrder: '', isBanner: true, bannerImg: 'https://gips1.baidu.com/it/u=595975033,3712432608&fm=3074&app=3074&f=PNG?w=2560&h=1440', bannerSort: -1, categoryId: 2, name: 'Jenkins', url: 'http://192.168.1.5:8080/', img: '', sort: -1 },
        // { ID: 2, isPin: false, pinOrder: '', isBanner: true, bannerImg: 'https://img0.baidu.com/it/u=3051988441,1816090304&fm=253&app=138&f=JPEG?w=889&h=500', bannerSort: -1, categoryId: 2, name: 'Apache', url: 'http://192.168.1.119/', img: '', sort: -1 },
        // { ID: 3, isPin: false, pinOrder: '', isBanner: true, bannerImg: 'https://img0.baidu.com/it/u=2671796649,1137174164&fm=253&app=138&f=JPEG?w=889&h=500', bannerSort: -1, categoryId: 2, name: 'SVN', url: 'http://192.168.1.119/svn/svnrepos', img: '', sort: -1 },
        // { ID: 4, isPin: false, pinOrder: '', isBanner: true, bannerImg: 'https://img1.baidu.com/it/u=3722223335,107389382&fm=253&app=138&f=JPEG?w=889&h=500', bannerSort: -1, categoryId: 2, name: '禅道', url: 'http://192.168.1.5:18080/', img: '', sort: -1 },
        // { ID: 5, isPin: false, pinOrder: '', isBanner: true, bannerImg: 'https://gips2.baidu.com/it/u=1035277296,4143860827&fm=3074&app=3074&f=PNG?w=2560&h=1440', bannerSort: -1, categoryId: 2, name: 'Node-RED', url: 'http://192.168.1.5:1880/', img: '', sort: -1 },
        // { ID: 6, isPin: false, pinOrder: '', isBanner: true, bannerImg: '', bannerSort: -1, categoryId: 3, name: '风', url: 'http://192.168.1.5:8099/', img: '', sort: -1 },
        // { ID: 7, isPin: false, pinOrder: '', isBanner: true, bannerImg: '', bannerSort: -1, categoryId: 3, name: '光', url: 'http://192.168.1.5:8100/', img: '', sort: -1 }

      ],
      bannerItems: [],
      pinLoading: false
    }
  },
  computed: {
    bannerItems() {
      return this.items.filter(x => x.isBanner)
    }
  },
  created() {
    this.getCategorys()
    this.getItems()
    this.getBannerItems()
  },
  methods: {
    handleClick(tab, event) {
      // 切换分类时查询
      console.log(this.activeCategory, event)
    },
    handleEnter(event) {
      this.activeCategory = '0'
      // 输入框focus回车键时查询
      console.log(this.searchText, event)
      this.getItems(this.searchText)
    },
    getCurrItems() {
      switch (this.activeCategory) {
        case '0':
          return this.items
        case '1':
          return this.items.filter(x => x.isPin)
        default:
          return this.items.filter(x => x.categoryId + '' === this.activeCategory)
      }
    },
    async getCategorys() {
      const { data } = await categoryList()
      this.categorys = data
    },
    async getItems(searchText = '') {
      const { data } = await itemList({ searchText })
      this.items = data
      this.pinLoading = false
    },
    async getBannerItems() {
      const { data } = await itemList({ isBanner: true })
      this.bannerItems = data
    },
    async handlePin(item) {
      this.pinLoading = true
      if (item.isPin) {
        await myItemDelete({ itemId: item.ID })
      } else {
        await myItemAdd({ itemId: item.ID })
      }
      await this.getItems()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  // line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-container {
  margin: 0px 10px 50px 5px;
}
/* 适用于所有 el-input 组件 */
.el-input {
  margin: 5px 0px;
}

.text {
  font-size: 16px;
  line-height: 30px;
}

.item {
  margin-bottom: 18px;
}
.el-tab-pane {
 display: inline-block;
}
.el-tab-pane>div {
    display: inline-block;
    width: 480px;
    height: 280px;
    padding: 2px;
}
</style>
