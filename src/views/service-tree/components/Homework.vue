<template>
  <div>
    <h1>待开发</h1>
  </div>
</template>
<script>

export default {
  name: '',
  props: {
    nodes: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'taskManage'
    }
  },
  created() {
  },
  methods: {
    handleClickTab(val) {
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
