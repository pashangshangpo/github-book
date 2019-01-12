<template>
  <div class="box">
    <div class="preview">
      <h1 class="title">{{ title }}</h1>
      <div class="markdown" v-html="htmlContent"></div>
    </div>
    <div class="write">
      <input class="input" type="text" autofocus="true" v-model="title" placeholder="请输入文章标题">
      <div class="tags">
        <el-tag
          :key="tag.name"
          v-for="tag in tags"
          :data-active="tag.__active"
          :disable-transitions="false">
          <span 
            class="tag"
            @click="handleTagClick(tag)"
          >{{tag.name}}</span>
        </el-tag>
        <el-input
          class="input-new-tag"
          v-show="inputTagVisible"
          v-model="newTagValue"
          ref="tagInput"
          size="small"
          @keyup.enter.native="handleInputTagConfirm"
          @blur="handleInputTagConfirm"
        >
        </el-input>
        <el-button v-show="!inputTagVisible" class="button-new-tag" size="small" @click="handleShowTagInput">+ 添加标签</el-button>
      </div>
      <div class="edit">
        <textarea 
          class="text" 
          ref="editor" 
          v-model="content" 
          placeholder="请输入文章内容" 
          cols="30" 
          rows="10"
        ></textarea>
      </div>
      <div class="tool">
        <div class="back" @click="handleBack">返回</div>
        <div class="release" @click="handleRelease">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import _ from 'lodash'
import CodeMirror from 'codemirror'

import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime.js'

import 'codemirror/lib/codemirror.css'

import Markdown from '$common/markdown'
import { Client, ProjectPath, Repo } from '$common/github'
import { GetData } from '$common/local-storage'

export default {
  data() {
    return {
      action: 'create',
      number: this.$route.query.number,
      title: '',
      content: '',
      tags: [],
      newTagValue: '',
      inputTagVisible: false,
    }
  },
  computed: {
    htmlContent() {
      return Markdown(this.content)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleTagClick(tag) {
      tag.__active = !tag.__active
    },
    handleTagClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleInputTagConfirm() {
      let newTagValue = this.newTagValue

      if (newTagValue) {
        this.tags = _.uniq(this.tags.concat({
          name: newTagValue,
          __active: true,
        }))
      }

      this.inputTagVisible = false
      this.newTagValue = ''
    },
    handleShowTagInput() {
      this.inputTagVisible = true
      
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },
    init() {
      if (this.number) {
        this.action = 'update'

        this.initData().then(() => {
          setTimeout(() => {
            this.initEditor()
          })
        })
      } else {
        this.getTags().then(res => {
          this.processTags(res)
          this.initEditor()
        })
      }
    },
    async initData() {
      let res = await Promise.all([
        this.getTags(),
        Client.issue(ProjectPath, this.number).infoAsync().then(res => {
          res = res[0]
          
          this.title = res.title
          this.content = res.body
          this.tags = res.labels
        })
      ])

      this.processTags(res[0])
    },
    initEditor() {
      let editor = CodeMirror.fromTextArea(this.$refs.editor, {
        mode: 'gfm',
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true,
        keyMap: 'sublime',
      })

      editor.on('change', cm => {
        this.content = cm.getValue()
      })
    },
    handleBack() {
      this.$router.push({
        name: 'home',
      })
    },
    handleRelease() {
      if (!this.title.trim() || !this.content.trim()) {
        Message({
          message: '不允许提交空文章',
          type: 'info',
          duration: 1000,
        })

        return null
      }

      let tags = this.tags.filter(tag => tag.__active)

      let data = {
        title: this.title,
        body: this.content,
        labels: [GetData('github').username].concat(tags.map(tag => tag.name)),
      }

      if (this.action === 'update') {
        this.updateArticles(data)
      }
      else {
        this.createArticles(data)
      }
    },
    getTags() {
      return Repo.labelsAsync()
      .then(res => res[0])
      .then(res => {
        return res.filter(item => item.default === false)
      })
    },
    processTags(tags) {
      this.tags = tags.map(tag => {
        return {
          ...tag,
          __active: this.tags.find(item => item.name === tag.name) ? true : false
        }
      })
    },
    updateArticles(data) {
      Client.issue(ProjectPath, this.number).updateAsync(data).then(res => {
        res = res[0]

        if (res.message) {
          Message.error(res.message, 1000)
        }
        else {
          Message.success('更新文章成功！', 1000)

          this.$router.replace({
            name: 'article-details',
            query: {
              number: res.number,
            },
          })
        }
      })
    },
    createArticles(data) {
      Repo.createIssueAsync(data).then(res => {
        res = res[0]

        if (res.message) {
          Message.error(res.message, 1000)
        }
        else {
          Message.success('发布文章成功！', 1000)

          this.$router.replace({
            name: 'article-details',
            query: {
              number: res.number,
            },
          })
        }
      })
    }
  },
}
</script>

<style lang="scss">
.CodeMirror {
  height: 86vh;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.el-tag {
  cursor: pointer;
  user-select: none;
  padding: 0;

  .tag {
    display: block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
  }

  &[data-active="true"] {
    background-color: #1890ff;
    color: #fff;
  }
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style lang="scss" scoped>
.box {
  display: flex;
  height: 100%;
  overflow: hidden;

  .preview {
    flex: 1;
    min-height: 100%;
    padding: 10px 20px 350px;
    box-sizing: border-box;

    overflow-y: auto;
    background-color: #fff;
    border-right: 1px solid #d9d9d9;

    .title {
      font-size: 30px;
      color: #333;
      line-height: 1.75;
      text-align: center;
    }
  }

  .write {
    width: 54%;
    padding: 20px 20px 40px;
    box-sizing: border-box;

    .input {
      display: block;
      width: 100%;
      height: 35px;

      font-size: 30px;
      line-height: 35px;
      border: none;
      outline: none;
      text-align: center;
    }

    .tags {
      position: relative;
      z-index: 1;
      margin: 12px 12px 0;
    }

    .edit {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      min-height: 100%;
      box-sizing: border-box;

      font-size: 16px;
      line-height: 1.5;
      color: #333;
      border: none;
      outline: none;
      overflow-y: auto;
      resize: none;

      .text {
        display: none;
      }
    }
  }

  .tool {
    position: fixed;
    left: 46%;
    top: 2px;

    .back {
      width: 45px;
      height: 40px;

      line-height: 40px;
      text-align: center;
      border-radius: 100%;
      transform: translate(-50%);
      background: #84a9d0;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }

    .release {
      width: 45px;
      height: 40px;
      margin-top: 6px;

      line-height: 40px;
      text-align: center;
      border-radius: 100%;
      transform: translate(-50%);
      background: #4e9ae4;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
