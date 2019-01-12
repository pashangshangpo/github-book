<template>
  <div class="box">
    <div class="form">
      <el-input placeholder="请填写项目路径" v-model="projectPath" clearable>
      </el-input>
      <el-input placeholder="请填写github生成的token" v-model="token" clearable>
      </el-input>
      <el-button class="btn" type="primary" @click="handleLogin"
        >登录</el-button
      >
    </div>
    <!-- <div class="tutorial">
      <h2 class="title">生成 github token 教程</h2>
    </div> -->
  </div>
</template>

<script>
import { SetData } from '$common/local-storage'

export default {
  data() {
    return {
      token: '',
      projectPath: '',
    }
  },
  methods: {
    handleLogin() {
      let token = this.token.trim()
      let projectPath = this.projectPath.trim()

      if (token && projectPath) {
        SetData('github', {
          token,
          projectPath,
        })

        this.$router.push({
          name: 'home',
        })
      } else {
        this.$message('输入的 github token为空！')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  padding: 100px 0;
  margin: 0 auto;
  text-align: center;

  .el-input {
    & + .el-input {
      margin-top: 12px;
    }
  }

  .btn {
    margin-top: 20px;
  }
}

.tutorial {
  text-align: center;

  .title {
    margin-bottom: 20px;
  }
}
</style>
