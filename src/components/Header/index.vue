<template>
  <header class="header">
    <div class="container">
      <a class="title" href="./">大前端</a>
      <a 
        class="write-articles" 
        @click="handleWriteArticles" 
        href="javascript:;">写文章</a>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    handleWriteArticles() {
      this.$router.push({
        name: 'write-articles',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 45px;
  z-index: 1;

  align-items: center;
  background-color: #fff;

  .container {
    width: 900px;
    margin: 0 auto;
    overflow: hidden;

    .title {
      margin-left: 12px;

      color: #0c00f8;
      text-decoration: none;
    }

    .write-articles {
      float: right;
    }
  }
}
</style>
