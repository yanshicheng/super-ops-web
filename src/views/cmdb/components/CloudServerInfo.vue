<template>
  <div class="info">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="EditFunc">编辑</el-button>
      </div>
      <div class="text item">
        <table class="myTable" style="width: 100%">
          <tr>
            <td class="column">名称</td>
            <td class="column-value" style="color: #909399; font-weight: bold;">值</td>
          </tr>
          <tr>
            <td class="column">实例ID</td>
            <td class="column-value">{{ serverObj.instance_id }}</td>
          </tr>
          <tr>
            <td class="column">实例名称</td>
            <td class="column-value">{{ serverObj.instance_name }}</td>
          </tr>
          <tr>
            <td class="column">实例类型</td>
            <td class="column-value">{{ serverObj.instance_type }}</td>
          </tr>
          <tr>
            <td class="column">管理IP</td>
            <td class="column-value">{{ serverObj.manage_ip }}</td>
          </tr>
          <tr>
            <td class="column">CPU核数</td>
            <td class="column-value">{{ serverObj.cpu }}</td>
          </tr>
          <tr>
            <td class="column">内存容量</td>
            <td class="column-value">{{ serverObj.memory }}</td>
          </tr>
          <tr>
            <td class="column">内网IP</td>
            <td class="column-value">{{ serverObj.intranet_ip }}</td>
          </tr>
          <tr>
            <td class="column">公网IP</td>
            <td class="column-value">{{ serverObj.public_ip }}</td>
          </tr>
          <tr>
            <td class="column">安全组</td>
            <td class="column-value">{{ serverObj.security_groupids }}</td>
          </tr>
          <tr>
            <td class="column">实例申请时间</td>
            <td class="column-value">{{ serverObj.created_time }}</td>
          </tr>
          <tr>
            <td class="column">实例到期时间</td>
            <td class="column-value">{{ serverObj.expired_time }}</td>
          </tr>
          <tr>
            <td class="column">最近同步时间</td>
            <td class="column-value">{{ serverObj.latest_date }}</td>
          </tr>
          <tr>
            <td class="column">资产创建时间</td>
            <td class="column-value">{{ serverObj.create_at }}</td>
          </tr>
        </table>

      </div>
      <el-dialog title="编辑资产" :visible.sync="serverFormVisible">
        <el-form ref="serverRef" :model="serverObjTemp" :rules="serverRules">
          <el-form-item label="实例ID" :label-width="formLabelWidth" prop="instance_id">
            <el-input v-model="serverObjTemp.instance_id" />
          </el-form-item>
          <el-form-item label="实例名称" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.instance_name" />
          </el-form-item>
          <el-form-item label="实例类型" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.instance_type" />
          </el-form-item>

          <el-form-item label="管理IP" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.manage_ip" />
          </el-form-item>

          <el-form-item label="cpu核数" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.cpu" />
          </el-form-item>

          <el-form-item label="内存容量" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.memory" />
          </el-form-item>
          <el-form-item label="内网IP" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.intranet_ip" />
          </el-form-item>
          <el-form-item label="公网IP" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.public_ip" />
          </el-form-item>
          <el-form-item label="系统版本" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.os_version" />
          </el-form-item>
          <el-form-item label="安全组" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.security_groupids" />
          </el-form-item>
          <el-form-item label="实例创建时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="serverObjTemp.created_time"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
            />
          </el-form-item>
          <el-form-item label="实例到期时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="serverObjTemp.expired_time"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDownFormVisible">取 消</el-button>
          <el-button type="primary" @click="UpdateServer">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <el-card shadow="hover" style="margin-top: 20px" class="box-card">
      <div slot="header" class="clearfix">
        <span>磁盘信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createDisk">新增</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="serverDisk"
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
            label="磁盘分类"
            prop="disk_type"
          />
          <el-table-column
            label="磁盘ID"
            prop="disk_id"
          />
          <el-table-column
            label="磁盘容量"
            prop="capacity"
          />
          <el-table-column
            label="最近变更"
            prop="latest_date"
          />

          <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="primary" @click="EditDisk(row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="DeleteDisk(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="diskFormVisible">
        <el-form ref="diskRef" :model="diskDataTemp" :rules="diskRules">
          <el-form-item label="磁盘分类" :label-width="formLabelWidth" prop="disk_type">
            <el-input v-model="diskDataTemp.disk_type" />
          </el-form-item>

          <el-form-item label="磁盘ID" :label-width="formLabelWidth" prop="disk_id">
            <el-input v-model="diskDataTemp.disk_id" />
          </el-form-item>

          <el-form-item label="磁盘容量" :label-width="formLabelWidth" prop="capacity">
            <el-input v-model="diskDataTemp.capacity" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDownFormVisible">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?PostDisk():PutDisk()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { CloudServer } from '@/api/cmdb'
import { CloudDisk } from '@/api/cmdb'

const defaultServerData = {
  instance_id: '',
  instance_name: '',
  instance_type: '',
  manage_ip: '',
  cpu: '',
  memory: '',
  intranet_ip: '',
  public_ip: '',
  os_version: '',
  security_groupids: '',
  expired_time: '',
  created_time: ''
}
const defaultDiskData = {
  disk_type: '',
  disk_id: '',
  capacity: ''
}
export default {
  name: 'CloudServerInfo',
  props: {
    serverId: {
      type: String,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      serverObj: Object.assign({}, defaultServerData),
      serverObjTemp: Object.assign({}, defaultServerData),
      serverNetworkList: [],
      serverMemory: [],
      assetId: '',
      serverDisk: [],
      diskDataTemp: Object.assign({}, defaultDiskData),
      formLabelWidth: '100px',
      serverFormVisible: false,
      networkFormVisible: false,
      diskFormVisible: false,
      memoryFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '更新数据',
        create: '创建数据'
      },
      serverRules: {
        instance_id: [{ required: true, message: '实例ID必填', trigger: 'blur' }]
      },
      diskRules: {
        disk_type: [{ required: true, message: '磁盘分类必填', trigger: 'blur' }],
        disk_id: [{ required: true, message: '磁盘ID必填', trigger: 'blur' }],
        capacity: [{ required: true, message: '磁盘容量必填', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.assetId = this.serverId
    this.GetServer(this.serverId)
  },
  methods: {
    GetServer(id) {
      CloudServer.list({
        asset_obj: id
      }).then((request) => {
        if (request.data.length === 1) {
          this.serverObj = request.data[0]
          this.GetDisk()
        }
      })
    },

    GetDisk() {
      CloudDisk.list({
        server_obj: this.serverObj.id
      }).then((request) => {
        this.serverDisk = request.data
      })
    },
    EditFunc() {
      this.serverObjTemp = JSON.parse(JSON.stringify(this.serverObj))
      this.serverFormVisible = true
    },
    handleDownFormVisible() {
      this.serverFormVisible = false
      this.diskFormVisible = false
    },
    UpdateServer() {
      this.$refs['serverRef'].validate((valid) => {
        if (valid) {
          const ServerJson = {
            instance_id: this.serverObjTemp.instance_id,
            instance_name: this.serverObjTemp.instance_name,
            instance_type: this.serverObjTemp.instance_type,
            manage_ip: this.serverObjTemp.manage_ip,
            cpu: this.serverObjTemp.cpu,
            memory: this.serverObjTemp.memory,
            intranet_ip: this.serverObjTemp.intranet_ip,
            public_ip: this.serverObjTemp.public_ip,
            os_version: this.serverObjTemp.os_version,
            security_groupids: this.serverObjTemp.security_groupids,
            created_time: this.serverObjTemp.created_time,
            expired_time: this.serverObjTemp.expired_time
          }
          CloudServer.patch(this.serverObjTemp.id, ServerJson).then((request) => {
            this.serverFormVisible = false
            this.serverObjTemp = Object.assign({}, defaultServerData)
            this.GetServer(this.assetId)
            this.$emit('GetAssetRecord', this.assetId)
            this.$notify({
              title: '成功',
              message: '数据更新成功!',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    createDisk() {
      this.dialogStatus = 'create'
      this.diskFormVisible = true
      this.diskDataTemp = Object.assign({}, defaultDiskData)
    },
    PostDisk() {
      this.$refs['diskRef'].validate((valid) => {
        if (valid) {
          this.diskDataTemp['server_obj'] = this.serverObj.id
          this.diskDataTemp['asset_id'] = this.assetId
          CloudDisk.create(this.diskDataTemp).then((request) => {
            this.diskFormVisible = false
            this.GetDisk()
            this.$emit('GetAssetRecord', this.assetId)
            this.$notify({
              title: '成功',
              message: '数据创建成功!',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    PutDisk() {
      this.$refs['diskRef'].validate((valid) => {
        if (valid) {
          // this.networkDataTemp['server_obj'] = this.serverObj.id
          this.diskDataTemp['asset_id'] = this.assetId
          delete this.diskDataTemp['latest_date']
          delete this.diskDataTemp['create_at']
          CloudDisk.update(this.diskDataTemp.id, this.diskDataTemp).then((request) => {
            this.diskFormVisible = false
            this.GetDisk()
            this.$emit('GetAssetRecord', this.assetId)
            this.$notify({
              title: '成功',
              message: '数据更新成功!',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    EditDisk(row) {
      this.dialogStatus = 'update'
      this.diskFormVisible = true
      this.diskDataTemp = JSON.parse(JSON.stringify(row))
    },
    DeleteDisk(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CloudDisk.delete(row.id).then(() => {
          this.GetDisk()
          this.$emit('GetAssetRecord', this.assetId)
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
    }
  }
}
</script>

<style >
.info > .el-card > .el-card__header {
  background-color: #3e6283 !important;
}

</style>
