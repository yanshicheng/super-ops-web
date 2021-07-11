<template>
  <div>
    <el-card class="box-card" shadow="hover" style="margin: 20px">
      <div slot="header" class="clearfix">
        <span>业务线</span>
      </div>
      <div class="filter-container">
        <el-input v-model="pageQuerylist.search" class="filter-item" placeholder="请输入标业务线签名称" style="width: 200px;margin-right: 10px" />
        <el-button class="filter-item" icon="el-icon-search" type="primary" @click="searchFilter">
          搜索
        </el-button>
        <el-button class="filter-item" icon="el-icon-edit" style="margin-left: 10px;" type="primary" @click="handleCreate">
          新建
        </el-button>
      </div>
      <div class="text item">
        <el-table
          :data="queryDatalist"
          border
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          />
          <el-table-column
            align="center"
            label="名称"
            prop="title"
          />
          <el-table-column
            align="center"
            label="联系人组"
            prop="contact_title"
          />
          <el-table-column
            align="center"
            label="绑定资产数"
            prop="asset_num"
          />
          <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="primary" @click="handlEdit(row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="pageQuerylist.total>0"
          :current-page="pageQuerylist.page"
          :page-size="pageQuerylist.limit"
          :page-sizes="pageQuerylist.sizes"
          :total="pageQuerylist.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="ref" :model="tempData" :rules="rules" class="el-form">
        <el-form-item label="名称" label-width="80px" prop="title">
          <el-input v-model="tempData.title" />
        </el-form-item>
        <el-form-item label="联系人组" label-width="80px" prop="contact">
          <el-select v-model="tempData.contact" placeholder="请选择">
            <el-option
              v-for="item in userGroup"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible()">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { BusinessUnit as masterApi } from '@/api/cmdb'
import { UserGroup } from '@/api/cmdb'

const defaultData = {
  title: null
}
export default {
  name: 'Tag',
  data() {
    return {
      dialogStatus: 'create',
      userGroup: [],
      pageQuerylist: {
        page: 1,
        size: 10,
        total: 0,
        sizes: [10, 20, 30, 40, 50],
        search: ''
      },
      queryDatalist: [],
      dialogFormVisible: false,
      textMap: {
        update: '更新业务线',
        create: '创建业务线'
      },
      tempData: Object.assign({}, defaultData),
      rules: {
        title: [{ required: true, message: '名称必填', trigger: 'blur' }],
        contact: [{ required: true, message: '联系人组必选', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.GetList()
    this.GetUserGroup()
  },
  methods: {
    GetList() {
      masterApi.list({
        search: this.pageQuerylist.search,
        page: this.pageQuerylist.page,
        size: this.pageQuerylist.size
      }).then(response => {
        this.queryDatalist = response.data
        this.pageQuerylist.total = response.count
      })
    },
    GetUserGroup() {
      UserGroup.list().then((request) => {
        this.userGroup = request.data
      })
    },
    handlEdit(row) {
      this.tempData = JSON.parse(JSON.stringify(row))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['ref'].validate((valid) => {
        if (valid) {
          masterApi.create(this.tempData).then((request) => {
            this.dialogFormVisible = false
            this.GetList()
            this.$notify({
              title: '成功',
              message: '创建数据成功!',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    updateData() {
      this.$refs['ref'].validate((valid) => {
        if (valid) {
          masterApi.update(this.tempData.id, this.tempData).then(() => {
            this.GetList()
            this.tempData = Object.assign({}, defaultData)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新数据成功!',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    handleCreate() {
      this.tempData = Object.assign({}, defaultData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleDownFormVisible() {
      this.tempData = Object.assign({}, defaultData)
      this.dialogFormVisible = false
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        masterApi.delete(row.id).then(() => {
          this.GetList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 搜索相关
    searchFilter() {
      this.pageQuerylist.page = 1
      this.GetList()
    },
    handleSizeChange(val) {
      this.pageQuerylist.size = val
      this.pageQuerylist.page = 1
      this.GetList()
    },
    handleCurrentChange(val) {
      this.pageQuerylist.page = val
      this.GetList()
    }
  }
}
</script>

<style scoped>

</style>
