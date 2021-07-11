<template>
  <div class="infocard">
    <el-card class="box-card">
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
            <td class="column-value">{{ networkDeviceObj.hostname }}</td>
          </tr>
          <tr>
            <td class="column">设备品牌</td>
            <td class="column-value">{{ networkDeviceObj.manufacture }}</td>
          </tr>
          <tr>
            <td class="column">设备型号</td>
            <td class="column-value">{{ networkDeviceObj.model }}</td>
          </tr>
          <tr>
            <td class="column">管理IP</td>
            <td class="column-value">{{ networkDeviceObj.manage_ip }}</td>
          </tr>
          <tr>
            <td class="column">Vlan_IP</td>
            <td class="column-value">{{ networkDeviceObj.vlan_ip }}</td>
          </tr>
          <tr>
            <td class="column">内网IP</td>
            <td class="column-value">{{ networkDeviceObj.intranet_ip }}</td>
          </tr>
          <tr>
            <td class="column">SN</td>
            <td class="column-value">{{ networkDeviceObj.sn }}</td>
          </tr>
          <tr>
            <td class="column">端口数</td>
            <td class="column-value">{{ networkDeviceObj.port_num }}</td>
          </tr>
          <tr>
            <td class="column">配置信息</td>
            <td class="column-value"><textarea v-model="networkDeviceObj.device_detail" /></td>
          </tr>
          <tr>
            <td class="column">资产变更时间</td>
            <td class="column-value">{{ networkDeviceObj.latest_date }}</td>
          </tr>
          <tr>
            <td class="column">资产创建时间</td>
            <td class="column-value">{{ networkDeviceObj.create_at }}</td>
          </tr>
        </table>
      </div>
    </el-card>
    <el-dialog title="新建网络设备" :visible.sync="networkFormVisible">
      <el-form ref="networkDeviceRef" :model="networkDeviceObjTemp" :rules="networkRules">
        <el-form-item :label-width="formLabelWidth" label="设备名称" prop="hostname">
          <el-input v-model="networkDeviceObjTemp.hostname" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理IP" prop="manage_ip">
          <el-input v-model="networkDeviceObjTemp.manage_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="VlanIP" prop="vlan_ip">
          <el-input v-model="networkDeviceObjTemp.vlan_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="内网IP" prop="intranet_ip">
          <el-input v-model="networkDeviceObjTemp.intranet_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="SN号" prop="sn">
          <el-input v-model="networkDeviceObjTemp.sn" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="品牌" prop="manufacture">
          <el-input v-model="networkDeviceObjTemp.manufacture" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="型号" prop="model">
          <el-input v-model="networkDeviceObjTemp.model" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="端口个数" prop="port_num">
          <el-input v-model="networkDeviceObjTemp.port_num" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="详细配置" prop="device_detail">
          <el-input v-model="networkDeviceObjTemp.device_detail" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible">取 消</el-button>
        <el-button type="primary" @click="UpdateNetworkDevice">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { NetworkDevice } from '@/api/cmdb'

const defaultNetworkDeviceData = {
  hostname: '',
  manage_ip: '',
  vlan_ip: '',
  intranet_ip: '',
  sn: '',
  manufacture: '',
  model: '',
  port_num: '',
  device_detail: ''

}

export default {
  name: 'NetworkDeviceInfo',
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
      assetId: '',
      assetRecord_List: [],
      reverse: false,
      serverNetworkList: [],
      serverMemory: [],
      serverDisk: [],
      networkDeviceObj: Object.assign({}, defaultNetworkDeviceData),
      networkDeviceObjTemp: Object.assign({}, defaultNetworkDeviceData),
      networkFormVisible: false,
      formLabelWidth: '100px',
      tempRoute: {},
      userList: [],
      dialogStatus: 'create',
      networkRules: {
        hostname: [{ required: true, message: '设备名称必填', trigger: 'blur' }],
        manage_ip: [{ required: true, message: '管理IP必填', trigger: 'blur' }],
        vlan_ip: [{ required: true, message: 'Vlan_IP必填', trigger: 'blur' }],
        intranet_ip: [{ required: true, message: '内网IP必填', trigger: 'blur' }],
        sn: [{ required: true, message: 'sn号必填', trigger: 'blur' }],
        manufacture: [{ required: true, message: '品牌必填', trigger: 'blur' }],
        model: [{ required: true, message: '型号必填', trigger: 'blur' }],
        port_num: [{ required: true, message: '端口数必填', trigger: 'blur' }],
        device_detail: [{ required: true, message: '配置详情必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.assetId = this.serverId
    this.GetNetworkDivice(this.assetId)
  },
  methods: {
    GetNetworkDivice(id) {
      NetworkDevice.list({
        asset_obj: id
      }).then((request) => {
        this.networkDeviceObj = request.data[0]
      })
    },
    EditFunc() {
      this.networkDeviceObjTemp = JSON.parse(JSON.stringify(this.networkDeviceObj))
      this.networkFormVisible = true
    },
    handleDownFormVisible() {
      this.networkFormVisible = false
    },
    UpdateNetworkDevice() {
      this.$refs['networkDeviceRef'].validate((valid) => {
        if (valid) {
          const NetworkJson = {
            hostname: this.networkDeviceObjTemp.hostname,
            manage_ip: this.networkDeviceObjTemp.manage_ip,
            vlan_ip: this.networkDeviceObjTemp.vlan_ip,
            intranet_ip: this.networkDeviceObjTemp.intranet_ip,
            sn: this.networkDeviceObjTemp.sn,
            manufacturer: this.networkDeviceObjTemp.manufacturer,
            model: this.networkDeviceObjTemp.model,
            port_num: this.networkDeviceObjTemp.port_num,
            device_detail: this.networkDeviceObjTemp.device_detail
          }
          NetworkDevice.update(this.networkDeviceObjTemp.id, NetworkJson).then((request) => {
            this.networkFormVisible = false
            this.GetNetworkDivice(this.assetId)
            // this.$parent.GetAssetRecord()
            this.$emit('GetAssetRecord', this.assetId)
            this.networkDeviceObj = Object.assign({}, defaultNetworkDeviceData)
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
    }
  }
}
</script>

<style>
.infocard .el-card > .el-card__header {
  background-color: #3e6283 !important;
}

.myTable {
  border-collapse: collapse;
  margin: 0 auto;

}

.myTable td,
.myTable th {
  border: 1px solid #cad9ea;
  font-size: 14px;
  color: #606266;
  height: 40px;
}

td.column-value {
  width: 85%;
  padding: 10px;
}

td.column {
  /*text-align: center;*/
  padding: 10px;
  color: #909399;
  font-weight: bold;
}
</style>
