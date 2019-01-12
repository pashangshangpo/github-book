<template>
  <div ref="wrap" class="wrap">
    <div class="box">
      <Header></Header>
      <main class="main" ref="main">
        <nav class="stick">
          <ul>
            <li
              class="article-item"
              v-for="item in processArticleLists"
              @click="handleOpenInfo(item)"
              :key="item.id"
              v-if="item.title.indexOf('[置顶]') !== -1"
            >
              <span class="title">{{ item.title }}</span>
              <div class="tool">
                <span class="edit" @click="handleEdit(item, $event)">编辑</span>
                <span class="delete" @click="handleDelete(item, $event)"
                  >删除</span
                >
                <time class="time">{{ item.created_at }}</time>
              </div>
            </li>
          </ul>
        </nav>
        <nav>
          <ul ref="scrollloadContent">
            <li
              class="article-item"
              v-for="item in processArticleLists"
              @click="handleOpenInfo(item)"
              :key="item.id"
              v-if="item.title.indexOf('[置顶]') == -1"
            >
              <span class="title">{{ item.title }}</span>
              <div class="tool">
                <span class="edit" @click="handleEdit(item, $event)">编辑</span>
                <span class="delete" @click="handleDelete(item, $event)"
                  >删除</span
                >
                <time class="time">{{ item.created_at }}</time>
              </div>
            </li>
          </ul>
        </nav>
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
  },
  mounted() {
    new Scrollload({
      container: this.$refs.main,
      content: this.$refs.scrollloadContent,
      loadMore: sl => {
        if (this.noMoreData) {
          sl.noMoreData()

          return
        }

        this.init().then(res => {
          this.page += 1

          sl.unLock()
        })
      },
    })
  },
  methods: {
    init() {
      return Repo.issuesAsync({
        page: this.page,
        per_page: 20,
      }).then(res => {
        res = res[0]

        if (res.length === 0) {
          this.noMoreData = true

          return
        }

        this.articleLists = this.articleLists.concat(res)
      })
    },
    handleOpenInfo(data) {
      this.$router.push({
        name: 'article-details',
        query: {
          path: encodeURIComponent(data.path),
          lastUpdateTime: encodeURIComponent(data.committed_date),
          authors: encodeURIComponent(data.authors),
        },
      })
    },
    handleEdit(data, e) {
      e.stopPropagation()

      this.$router.push({
        name: 'write-articles',
        query: {
          path: encodeURIComponent(data.path),
          authors: encodeURIComponent(data.authors),
        },
      })
    },
    handleDelete(data, e) {
      e.stopPropagation()

      MessageBox.confirm(`确定要删除 ${data.name} ？`, '提示')
        .then(() => {
          GitLab.createFile(ProjectId, {
            branch: 'master',
            commit_message: `chore: 删除 ${data.name}`,
            actions: [
              {
                action: 'delete',
                file_path: data.path,
              },
            ],
          }).then(res => {
            if (res.id) {
              Message.success('删除成功！')

              this.articleLists = this.articleLists.filter(item => {
                return item.path !== data.path
              })
            } else {
              Message.error('删除失败！')
            }
          })
        })
        .catch(action => {})
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
  .stick {
    margin-bottom: 20px;
    border-radius: 4px;
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
