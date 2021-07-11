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
            <td class="column">设备名称</td>
            <td class="column-value">{{ serverObj.hostname }}</td>
          </tr>
          <tr>
            <td class="column">管理IP</td>
            <td class="column-value">{{ serverObj.manage_ip }}</td>
          </tr>
          <tr>
            <td class="column">操作系统</td>
            <td class="column-value">{{ serverObj.os_platform }}</td>
          </tr>
          <tr>
            <td class="column">系统版本</td>
            <td class="column-value">{{ serverObj.os_version }}</td>
          </tr>
          <tr>
            <td class="column">主板SN号</td>
            <td class="column-value">{{ serverObj.sn }}</td>
          </tr>
          <tr>
            <td class="column">主板型号</td>
            <td class="column-value">{{ serverObj.model }}</td>
          </tr>
          <tr>
            <td class="column">主板厂商</td>
            <td class="column-value">{{ serverObj.manufacturer }}</td>
          </tr>
          <tr>
            <td class="column">CPU逻辑核数</td>
            <td class="column-value">{{ serverObj.cpu_count }}</td>
          </tr>
          <tr>
            <td class="column">CPU物理核数</td>
            <td class="column-value">{{ serverObj.cpu_physical_count }}</td>
          </tr>
          <tr>
            <td class="column">CPU型号</td>
            <td class="column-value">{{ serverObj.cpu_model }}</td>
          </tr>
          <tr>
            <td class="column">资产变更时间</td>
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
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="hostname">
            <el-input v-model="serverObjTemp.hostname" />
          </el-form-item>
          <el-form-item label="管理IP" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.manage_ip" />
          </el-form-item>
          <el-form-item label="操作系统" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.os_platform" />
          </el-form-item>

          <el-form-item label="系统版本" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.os_version" />
          </el-form-item>

          <el-form-item label="主板SN" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.sn" />
          </el-form-item>

          <el-form-item label="主板厂商" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.manufacturer" />
          </el-form-item>

          <el-form-item label="主板型号" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.model" />
          </el-form-item>

          <el-form-item label="CPU逻辑核数" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.cpu_count" />
          </el-form-item>
          <el-form-item label="CPU物理核数" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.cpu_physical_count" />
          </el-form-item>
          <el-form-item label="CPU型号" :label-width="formLabelWidth">
            <el-input v-model="serverObjTemp.cpu_model" />
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
        <span>网卡信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createNetwork">新增</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="serverNetworkList"
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
            label="名称"
            prop="title"
            width="80"
          />
          <el-table-column
            label="IP地址"
            prop="ipaddress"
          />
          <el-table-column
            label="子网掩码"
            prop="netmask"
            width="120"
          />
          <el-table-column
            label="MAC地址"
            prop="hwaddr"
          />
          <el-table-column
            label="UP"
            width="80"
          >
            <template slot-scope="{row}">
              <el-tag> {{ row.up }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="广播地址"
            prop="broadcast"
          />
          <el-table-column
            label="最近变更"
            prop="latest_date"
          />
          <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="primary" @click="EditNetwork(row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="DeleteNetwork(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="networkFormVisible">
        <el-form ref="networkRef" :model="networkDataTemp" :rules="networkRules">
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="title">
            <el-input v-model="networkDataTemp.title" />
          </el-form-item>

          <el-form-item label="管理IP" :label-width="formLabelWidth" prop="ipaddress">
            <el-input v-model="networkDataTemp.ipaddress" />
          </el-form-item>

          <el-form-item label="子网掩码" :label-width="formLabelWidth" prop="netmask">
            <el-input v-model="networkDataTemp.netmask" />
          </el-form-item>
          <el-form-item label="MAC地址" :label-width="formLabelWidth" prop="hwaddr">
            <el-input v-model="networkDataTemp.hwaddr" />
          </el-form-item>
          <el-form-item label="广播地址" :label-width="formLabelWidth" prop="broadcast">
            <el-input v-model="networkDataTemp.broadcast" />
          </el-form-item>
          <el-form-item label="网卡状态" :label-width="formLabelWidth">
            <el-switch
              v-model="networkDataTemp.up"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDownFormVisible">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?PostNetwork():PutNetwork()">确 定</el-button>
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
            label="槽位"
            prop="slot"
            width="80"
          />
          <el-table-column
            label="类型"
            prop="pd_type"
            width="80"
          />
          <el-table-column
            label="容量"
            prop="capacity"
            width="80"
          />
          <el-table-column
            label="型号"
            prop="model"
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
          <el-form-item label="槽位" :label-width="formLabelWidth" prop="slot">
            <el-input v-model="diskDataTemp.slot" />
          </el-form-item>

          <el-form-item label="磁盘容量" :label-width="formLabelWidth" prop="capacity">
            <el-input v-model="diskDataTemp.capacity" />
          </el-form-item>

          <el-form-item label="磁盘型号" :label-width="formLabelWidth" prop="model">
            <el-input v-model="diskDataTemp.model" />
          </el-form-item>
          <el-form-item label="磁盘类型" :label-width="formLabelWidth" prop="pd_type">
            <el-input v-model="diskDataTemp.pd_type" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDownFormVisible">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?PostDisk():PutDisk()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <el-card shadow="hover" style="margin-top: 20px" class="box-card">
      <div slot="header" class="clearfix">
        <span>内存信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createMemory">新增</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="serverMemory"
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
            label="槽位"
            prop="slot"
            width="80"
          />
          <el-table-column
            label="品牌"
            prop="manufacturer"
          />
          <el-table-column
            label="型号"
            prop="model"
          />
          <el-table-column
            label="容量"
            prop="capacity"
            width="80"
          />
          <el-table-column
            label="速率"
            prop="speed"
            width="80"
          />
          <el-table-column
            label="SN号"
            prop="sn"
            width="180"
          />
          <el-table-column
            label="最近变更"
            prop="latest_date"
          />
          <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="primary" @click="EditMemory(row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="DeleteMemory(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="memoryFormVisible">
        <el-form ref="memoryRef" :model="memoryDataTemp" :rules="memoryRules">
          <el-form-item label="内存槽位" :label-width="formLabelWidth" prop="slot">
            <el-input v-model="memoryDataTemp.slot" />
          </el-form-item>

          <el-form-item label="内存容量" :label-width="formLabelWidth" prop="capacity">
            <el-input v-model="memoryDataTemp.capacity" />
          </el-form-item>

          <el-form-item label="内存品牌" :label-width="formLabelWidth" prop="manufacturer">
            <el-input v-model="memoryDataTemp.manufacturer" />
          </el-form-item>
          <el-form-item label="内存型号" :label-width="formLabelWidth" prop="model">
            <el-input v-model="memoryDataTemp.model" />
          </el-form-item>
          <el-form-item label="内存SN号" :label-width="formLabelWidth" prop="sn">
            <el-input v-model="memoryDataTemp.sn" />
          </el-form-item>
          <el-form-item label="内存速率" :label-width="formLabelWidth" prop="speed">
            <el-input v-model="memoryDataTemp.speed" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDownFormVisible">取 消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?PostMemory():PutMemory()">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { Server } from '@/api/cmdb'
import { ServerDisk } from '@/api/cmdb'
import { ServerMemory } from '@/api/cmdb'
import { ServerNetwork } from '@/api/cmdb'

const defaultServerData = {
  hostname: '',
  manage_ip: '',
  os_platform: '',
  os_version: '',
  sn: '',
  manufacturer: '',
  model: '',
  cpu_count: '',
  cpu_physical_count: '',
  cpu_model: ''
}
const defaultNetworkData = {
  title: '',
  hwaddr: '',
  netmask: '',
  ipaddress: '',
  broadcast: '',
  up: true
}
const defaultDiskData = {
  slot: '',
  model: '',
  capacity: '',
  pd_type: ''
}
const defaultMemoryData = {
  slot: '',
  manufacturer: '',
  model: '',
  capacity: '',
  sn: '',
  speed: ''
}
export default {
  name: 'ServerInfo',
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
      networkDataTemp: Object.assign({}, defaultNetworkData),
      serverNetworkList: [],
      serverMemory: [],
      assetId: '',
      memoryDataTemp: Object.assign({}, defaultMemoryData),
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
        hostname: [{ required: true, message: '名称必填', trigger: 'blur' }]
      },
      networkRules: {
        title: [{ required: true, message: '名称必填', trigger: 'blur' }],
        hwaddr: [{ required: true, message: 'MAC地址必填', trigger: 'blur' }],
        netmask: [{ required: true, message: '子网掩码必填', trigger: 'blur' }],
        ipaddress: [{ required: true, message: '管理IP必填', trigger: 'blur' }],
        broadcast: [{ required: true, message: '广播地址必填', trigger: 'blur' }]

      },
      diskRules: {
        slot: [{ required: true, message: '磁盘槽位必须指定', trigger: 'blur' }],
        model: [{ required: true, message: '磁盘型号必填', trigger: 'blur' }],
        capacity: [{ required: true, message: '磁盘容量必填', trigger: 'blur' }],
        pd_type: [{ required: true, message: '磁盘类型必填', trigger: 'blur' }]

      },
      memoryRules: {
        slot: [{ required: true, message: '内存槽位必填', trigger: 'blur' }],
        manufacturer: [{ required: true, message: '内存品牌必填', trigger: 'blur' }],
        model: [{ required: true, message: '内存型号必填', trigger: 'blur' }],
        capacity: [{ required: true, message: '内存容量必填', trigger: 'blur' }],
        sn: [{ required: true, message: '内存SN号必填', trigger: 'blur' }],
        speed: [{ required: true, message: '内存速率必填', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.assetId = this.serverId
    this.GetServer(this.serverId)
  },
  methods: {
    GetServer(id) {
      Server.list({
        asset_obj: id
      }).then((request) => {
        if (request.data.length === 1) {
          this.serverObj = request.data[0]

          this.GetNetwork()
          this.GetDisk()
          this.GetMemory()
        }
      })
    },
    GetNetwork() {
      ServerNetwork.list({
        server_obj: this.serverObj.id
      }).then((request) => {
        this.serverNetworkList = request.data
      })
    },
    GetMemory() {
      ServerMemory.list({
        server_obj: this.serverObj.id
      }).then((request) => {
        this.serverMemory = request.data
      })
    },
    GetDisk() {
      ServerDisk.list({
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
      this.networkFormVisible = false
      this.diskFormVisible = false
      this.memoryFormVisible = false
    },
    UpdateServer() {
      this.$refs['serverRef'].validate((valid) => {
        if (valid) {
          const ServerJson = {
            hostname: this.serverObjTemp.hostname,
            manage_ip: this.serverObjTemp.manage_ip,
            os_platform: this.serverObjTemp.os_platform,
            os_version: this.serverObjTemp.os_version,
            sn: this.serverObjTemp.sn,
            manufacturer: this.serverObjTemp.manufacturer,
            model: this.serverObjTemp.model,
            cpu_count: this.serverObjTemp.cpu_count,
            cpu_physical_count: this.serverObjTemp.cpu_physical_count,
            cpu_model: this.serverObjTemp.cpu_model
          }
          Server.patch(this.serverObjTemp.id, ServerJson).then((request) => {
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
    createNetwork() {
      this.dialogStatus = 'create'
      this.networkFormVisible = true
      this.networkDataTemp = Object.assign({}, defaultNetworkData)
    },
    PostNetwork() {
      this.$refs['networkRef'].validate((valid) => {
        if (valid) {
          this.networkDataTemp['server_obj'] = this.serverObj.id
          this.networkDataTemp['asset_id'] = this.assetId
          ServerNetwork.create(this.networkDataTemp).then((request) => {
            this.networkFormVisible = false
            this.networkDataTemp = Object.assign({}, defaultNetworkData)
            this.GetNetwork()
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
    EditNetwork(row) {
      this.dialogStatus = 'update'
      this.networkFormVisible = true
      this.networkDataTemp = JSON.parse(JSON.stringify(row))
    },
    PutNetwork() {
      this.$refs['networkRef'].validate((valid) => {
        if (valid) {
          // this.networkDataTemp['server_obj'] = this.serverObj.id
          this.networkDataTemp['asset_id'] = this.assetId
          delete this.networkDataTemp['latest_date']
          delete this.networkDataTemp['create_at']
          ServerNetwork.update(this.networkDataTemp.id, this.networkDataTemp).then((request) => {
            this.networkFormVisible = false
            this.GetNetwork()
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
    DeleteNetwork(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ServerNetwork.delete(row.id).then(() => {
          this.GetNetwork()
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
          ServerDisk.create(this.diskDataTemp).then((request) => {
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
          ServerDisk.update(this.diskDataTemp.id, this.diskDataTemp).then((request) => {
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
        ServerDisk.delete(row.id).then(() => {
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
    },
    createMemory() {
      this.dialogStatus = 'create'
      this.memoryFormVisible = true
      this.memoryDataTemp = Object.assign({}, defaultMemoryData)
    },
    EditMemory(row) {
      this.dialogStatus = 'update'
      this.memoryFormVisible = true
      this.memoryDataTemp = JSON.parse(JSON.stringify(row))
    },

    PostMemory() {
      this.$refs['memoryRef'].validate((valid) => {
        if (valid) {
          this.memoryDataTemp['server_obj'] = this.serverObj.id
          this.memoryDataTemp['asset_id'] = this.assetId
          ServerMemory.create(this.memoryDataTemp).then((request) => {
            this.memoryFormVisible = false
            this.memoryDataTemp = Object.assign({}, defaultMemoryData)
            this.GetMemory()
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
    PutMemory() {
      this.$refs['memoryRef'].validate((valid) => {
        if (valid) {
          // this.networkDataTemp['server_obj'] = this.serverObj.id
          this.memoryDataTemp['asset_id'] = this.assetId
          delete this.memoryDataTemp['latest_date']
          delete this.memoryDataTemp['create_at']
          ServerMemory.update(this.memoryDataTemp.id, this.memoryDataTemp).then((request) => {
            this.memoryFormVisible = false
            this.GetMemory()
            this.$emit('GetAssetRecord', this.assetId)
            this.GetAssetRecord(this.assetId)
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
    DeleteMemory(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ServerMemory.delete(row.id).then(() => {
          this.GetMemory()
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
