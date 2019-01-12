<template>
  <div ref="wrap" class="wrap">
    <div class="box">
      <Header></Header>
      <main class="main" ref="main">
        <el-tabs 
          tab-position="left"
          v-model="editableTabsValue"
          :before-leave="handleBeforeLeaveTabs"
        >
          <el-tab-pane 
            v-for="tag in processTags" 
            :key="tag.name" 
            :label="tag.name"
            :name="tag.name"
          >
            <nav>
              <ul data-id="scrollload-content">
                <li
                  class="article-item"
                  v-for="item in processArticleLists"
                  @click="handleOpenInfo(item)"
                  :key="item.id"
                >
                  <span class="title">{{ item.title }}</span>
                  <div class="tool">
                    <span class="edit" @click="handleEdit(item, $event)">编辑</span>
                    <time class="time">{{ item.created_at }}</time>
                  </div>
                </li>
              </ul>
            </nav>
          </el-tab-pane>
        </el-tabs>
      </main>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { MessageBox, Message } from 'element-ui'
import Scrollload from 'Scrollload'

import { Repo } from '$common/github'
import Format from '$common/format'

export default {
  data() {
    return {
      page: 1,
      articleLists: [],
      tags: [],
      editableTabsValue: '全部',
      noMoreData: false,
    }
  },
  computed: {
    processArticleLists() {
      let articleLists = this.articleLists.map(item => {
        return {
          ...item,
          created_at: Format(item.created_at, 'yyyy/MM/dd hh:mm:ss'),
        }
      })

      return articleLists
    },
    processTags() {
      return [{
        name: '全部'
      }].concat(this.tags)
    }
  },
  mounted() {
    this.initTags().then(() => {
      this.$nextTick(() => {
        new Scrollload({
          container: this.$refs.main,
          content: document.querySelector('[data-id="scrollload-content"]'),
          loadMore: sl => {
            if (this.noMoreData) {
              sl.noMoreData()

              return
            }

            this.getArticle().then(res => {
              this.page += 1

              this.articleLists = this.articleLists.concat(res)
              sl.unLock()
            })
          },
        })
      })
    })
  },
  methods: {
    getArticle(config = { labels: [] }) {
      return Repo.issuesAsync({
        page: this.page,
        per_page: 20,
        labels: config.labels.join(','),
      }).then(res => {
        res = res[0]

        if (res.length === 0) {
          this.noMoreData = true

          return []
        }

        return res
      })
    },
    initTags() {
      return Repo.labelsAsync()
      .then(res => res[0])
      .then(res => {
        this.tags = res.filter(item => item.default === false)
      })
    },
    handleBeforeLeaveTabs(name) {
      let tag = this.tags.find(item => item.name === name)

      this.page = 1
      this.getArticle({
        labels: tag ? [tag.name] : []
      }).then(res => {
        this.articleLists = this.articleLists = res
      })
    },
    handleOpenInfo(data) {
      this.$router.push({
        name: 'article-details',
        query: {
          number: data.number,
        },
      })
    },
    handleEdit(data, e) {
      e.stopPropagation()

      this.$router.push({
        name: 'write-articles',
        query: {
          number: data.number,
        },
      })
    },
    filterArticle(arr) {
      let list = arr.filter(item => {
        return item.path.split('.').pop() === 'md' && item.name !== 'README.md'
      })

      return list.map(item => {
        return {
          ...item,
          name: item.name.split('.md')[0],
        }
      })
    },
  },
}
</script>

<style lang="scss">
.scrollload-bottom {
  display: none;
}
</style>

<style lang="scss" scoped>
.wrap {
  height: 100%;
}
.box {
  min-height: 100%;
  padding-bottom: 280px;
  overflow: hidden;
  box-sizing: border-box;

  background-color: #f6f6f6;
}

.main {
  width: 900px;
  margin: 55px auto 0 auto;
  box-sizing: border-box;
  border-radius: 2px;

  nav {
    background-color: #fff;
    padding: 0 12px;
  }

  .article-item {
    display: flex;
    height: 42px;
    box-sizing: border-box;

    align-items: center;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px dashed #ccc;
    }

    &:hover {
      .edit,
      .delete {
        display: inline-block;
      }
    }

    .title {
      color: #0366d6;
    }

    .tool {
      margin-left: auto;

      user-select: none;
    }

    .edit {
      display: none;
      margin-right: 12px;

      color: #0366d6;
    }

    .delete {
      display: none;
      margin-left: 4px;
      margin-right: 6px;

      color: red;
    }

    .time {
      font-family: serif;
      color: #6a737d;
    }
  }
}
</style>
