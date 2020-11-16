<template>
  <div class="pagination-container">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="5"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      page: {
        required: true,
        type: Number
      },
      total: {
        required: true,
        type: Number
      },
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('pagination', {page: val})
      }
    }
  }
</script>
<style lang="scss">
  .pagination-container {
    padding-top: 43px;
    width: 100%;
    height: 83px;
    text-align: center;

    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background-color: transparent;
    }
  }
</style>
