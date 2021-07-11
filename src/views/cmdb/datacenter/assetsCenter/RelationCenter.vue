<template>
  <div class="container">
    <div v-for="(items, index) in tableData" :key="index" class="card-tablelist">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-weight:bold;font-size:14px;color: #303133;">{{ items.classify_name }}</span>
          <el-button
            plain
            type="primary"
            size="mini"
            style="margin-left: 85%"
            @click="openRelationDia(items.classify_id)"
          >绑定
          </el-button>
        </div>
        <el-table :data="items.tableList" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号" fixed />
          <el-table-column
            v-for="(item, i) in items.theadList"
            :key="i"
            v-bind="item"
            :label="item.label"
            :prop="item.props"
          >
            <template slot-scope="scope">
              <span>{{ scope.row[item.props] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button plain type="danger" size="mini" @click="cancelBD(scope.row, scope.$index, items.tableList)">
                解绑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      title="绑定"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="80%"
    >
      <div style="margin-bottom:10px;">
        <el-input v-model="search" size="small" style="width: 180px;" @keyup.enter.native="searchData" />
        <el-button plain type="primary" size="small" style="margin-left: 10px;" @click="searchData">查询</el-button>
      </div>
      <tempalte v-if="innerTableColumns.length">
        <el-table :data="innerTableData" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号" fixed />
          <el-table-column
            v-for="(item, index) in innerTableColumns"
            :key="index"
            v-bind="item"
            :label="item.label"
            :prop="item.props"
          >
            <template slot-scope="scope">
              <span>{{ scope.row[item.props] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button plain type="primary" size="mini" @click="confirmSetRelationSubmit(scope.row.id)">绑定</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </tempalte>
      <div v-else class="no-data">暂无数据</div>
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
  </div>
</template>
<script>
import { CMDBAssets as masterApi } from '@/api/cmdb'

export default {
  name: '',
  props: ['parent_asset_id'],
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      search: '',
      selectLists: [],
      innerTableColumns: [],
      innerTableData: [],
      currentTableId: '',
      currentPage: 1,
      total: 0
    }
  },
  created() {
    this.fetchBDRelationList()
  },
  methods: {
    fetchBDRelationList() {
      if (!this.parent_asset_id) return false
      masterApi.get(this.parent_asset_id).then(res => {
        if (res.code === 0) {
          this.tableData = this.formatTableList(res.data.children)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    formatTableList(children) {
      const allTableData = []
      children.forEach(items => {
        const fields = items ? items.fields : {}
        let theadList = []
        for (const key in fields) {
          theadList.push({
            props: key,
            label: items.fields[key]['name'],
            order: items.fields[key]['order']
          })
        }
        theadList.sort((a, b) => a.order - b.order)
        // 规则校验
        const rules = items ? items.rules : {}
        for (const key in rules) {
          theadList = theadList.map(item => {
            if (item.props === key) {
              item = { ...item, ...rules[key] }
            }
            return item
          })
        }
        const data = items ? items.data : []
        const tableList = data.map(item => {
          const obj = { ...item, ...item.data }
          return obj
        })
        const tableObj = {
          theadList,
          tableList,
          classify_name: items.classify_name,
          classify_id: items.classify_id
        }
        allTableData.push(tableObj)
      })
      return allTableData
    },
    cancelBD(id, index, tableData) {
      const params = {
        parent_asset_id: this.parent_asset_id, // 数据的 id
        child_asset_id: id.id // 绑定页面数据的id
      }
      masterApi.un_bind(params).then(res => {
        if (res.code === 0) {
          this.$message.success('解绑成功')
          tableData.splice(index, 1)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    openRelationDia(tableId) {
      this.dialogVisible = true
      this.currentTableId = tableId
      this.currentPage = 1
      this.searchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchData()
    },
    searchData() {
      const params = {
        classify_id: this.currentTableId,
        search: this.search,
        page: this.currentPage,
        ban_bind: false
      }
      masterApi.list(params).then(res => {
        if (res.code === -1) {
          this.$message.error(res.message)
        } else {
          this.formatInnerTableData(res.data)
          this.total = res.count
        }
      })
    },
    formatInnerTableData(tableObj) {
      const fields = tableObj ? tableObj.fields : {}
      let theadList = []
      for (const key in fields) {
        theadList.push({
          props: key,
          label: tableObj.fields[key]['name'],
          order: tableObj.fields[key]['order']
        })
      }
      theadList.sort((a, b) => a.order - b.order)
      // 规则校验
      const rules = tableObj ? tableObj.rules : {}
      for (const key in rules) {
        theadList = theadList.map(item => {
          if (item.props === key) {
            item = { ...item, ...rules[key] }
          }
          return item
        })
      }

      this.innerTableColumns = theadList

      const data = tableObj ? tableObj.data : []
      this.innerTableData = data.map(item => {
        const obj = { ...item, ...item.data }
        return obj
      })
    },
    confirmSetRelationSubmit(id) {
      const params = {
        parent_asset_id: this.parent_asset_id, // 数据的 id
        child_asset_id: id // 绑定页面数据的id
      }
      masterApi.bind(params).then(res => {
        if (res.code === 0) {
          this.$message.success('绑定成功')
          this.dialogVisible = false
          this.fetchBDRelationList()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-tablelist {
  margin-bottom: 10px;
  padding: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.table-head {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-card__header {
  background: rgb(217, 236, 255);
}

::v-deep .el-pagination {
  margin-top: 10px;
  text-align: center;
}

::v-deep .el-table th {
  text-align: center;
  font-weight: bold;
  color: #606266;
  background-color: #EBEEF5;
}

::v-deep .el-table--border, .el-table--group {
  border: 1px solid #DCDFE6;
}

::v-deep .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #DCDFE6;
}

::v-deep .el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #DCDFE6;
}

::v-deep .el-table .el-table__header-wrapper .el-table__header th.is-leaf {
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}

::v-deep .el-table--border th, .el-table__fixed-right-patch {
  border-bottom: 1px solid #DCDFE6 !important;
}

</style>
