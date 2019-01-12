<template>
  <div class="box" :style="watermarkStyle">
    <Header></Header>
    <main class="main">
      <div>
        <h1 class="title">{{ name }}</h1>
      </div>
      <div class="markdown" v-html="content"></div>
      <div class="position">
        <div class="tools">
          <el-button 
            type="primary" 
            icon="el-icon-edit" 
            class="button"
            @click="handleClickEdit"
            circle></el-button>
          <el-button 
            type="primary" 
            icon="el-icon-back" 
            class="button"
            @click="handleClickBack"
            circle></el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Atob } from '$common/base64'
import Markdown from '$common/markdown'
import AliMask from '$common/alimask'

export default {
  data() {
    let { authors, lastUpdateTime } = this.$route.query

    return {
      authors: decodeURIComponent(authors)
        .split(',')
        .join('  '),
      lastUpdateTime: decodeURIComponent(lastUpdateTime),
      watermarkStyle: {},
      details: {
        name: '',
        content: '',
      },
    }
  },
  computed: {
    name() {
      return this.details.name.split('.md')[0]
    },
    content() {
      let html = Markdown(Atob(this.details.content))
      let list = html.split('\n')
      let el = document.createElement('div')

      if (list[0].search('</h1>') !== -1) {
        el.innerHTML = list[0]
        this.details.name = el.innerText

        html = list.slice(1).join('\n')
      }

      return html
    },
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.authors.trim()) {
      this.initWatermark()
    }
  },
  methods: {
    init() {
      this.initDetails().then(() => {
        if (this.details.name == undefined) {
          this.$router.push({
            name: 'home'
          })
        }
      })
    },
    initDetails() {
      return GitLab.getFile(ProjectId, this.$route.query.path).then(res => {
        this.details = {
          name: res.file_name,
          content: res.content,
        }
      })
    },
    initWatermark() {
      let base64 = AliMask(this.authors, {
        alpha: 1,
        color: '#e0e0e0',
      })

      this.watermarkStyle = {
        backgroundImage: `url(${base64})`,
      }
    },
    handleClickEdit() {
      this.$router.push({
        name: 'write-articles',
        query: {
          path: this.$route.query.path,
          authors: this.$route.query.authors,
        }
      })
    },
    handleClickBack() {
      this.$router.push({
        name: 'home'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  min-height: 100%;
  overflow: hidden;
  background-color: #f6f6f6;
}

.main {
  position: relative;
  width: 900px;
  margin: 55px auto 0 auto;
  padding: 0 12px;
  box-sizing: border-box;

  background-color: #fff;
  border-radius: 2px;

  .title {
    padding: 24px 0;

    font-size: 30px;
    line-height: 1.22;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
  }

  .markdown {
    margin-bottom: 280px;
    padding-bottom: 20px;

    word-break: break-all;
  }

  .position {
    position: absolute;
    right: -40px;
    top: 200px;

    .tools {
      position: fixed;

      .button {
        display: block;
        margin: 0;

        & + .button {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
