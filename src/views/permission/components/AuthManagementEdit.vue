<template>
  <el-dialog
    :title="title"
    :visible="isShow"
    width="600px"
    @close="closeDia"
  >
    <el-form ref="form" :model="form" label-width="100px" :validate-on-rule-change="false">
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="form.name" size="small" />
      </el-form-item>
      <el-form-item label="HTTP方法" prop="method" required>
        <el-select v-model="form.method" placeholder="请选择">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
          <el-option label="PATH" value="PATH" />
          <el-option label="*" value="*" />
        </el-select>
      </el-form-item>
      <el-form-item label="HTTP路径" prop="path" required>
        <el-input v-model="form.path" size="small" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取 消</el-button>
      <el-button size="small" type="primary" :disabled="disabled" @click="confirmSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { PremRule as masterApi } from '@/api/permission'

export default {
  name: '',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      title: '',
      isEdit: false,
      form: {
        name: '',
        method: '',
        path: ''
      },
      disabled: false
    }
  },
  watch: {
    isShow(newVal) {
      if (newVal) {
        this.isEdit = Object.keys(this.editData).length > 1
      } else {
        this.isEdit = false
      }
    },
    isEdit(newVal) {
      if (newVal) {
        this.title = '编辑'
        this.form = Object.assign({}, this.editData)
      } else {
        this.title = '新增'
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
      }
    }
  },
  created() {
  },
  methods: {
    closeDia() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.$emit('update:isShow', false)
    },
    confirmSubmit() {
      if (this.disabled) return false
      this.disabled = true
      const params = {
        name: this.form.name,
        path: this.form.path,
        method: this.form.method,
        pid: this.editData.rule_classify
      }
      if (this.isEdit) {
        masterApi.update(this.editData.id, params).then(res => {
          if (res.code === 0) {
            this.$message.success('编辑成功')
            this.closeDia()
            this.$parent.fetchTableData()
          } else {
            this.$message.error(res.message || '')
          }
        }).finally(res => {
          this.disabled = false
        })
      } else {
        masterApi.create(params).then(res => {
          if (res.code === 0) {
            this.$message.success('新增成功')
            this.closeDia()
            this.$parent.fetchTableData()
          } else {
            this.$message.error(res.message || '')
          }
        }).finally(res => {
          this.disabled = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-group {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > label {
    width: 80px;
  }
}
</style>
