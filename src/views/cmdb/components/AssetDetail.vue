<template>
  <div>
    <!--  <div style="height: 60px; width: 100%; background-color: #545c64;position: fixed;z-index: 3; color: #fff;line-height: 50px; text-align: center;" >-->
    <!--设备ID: {{ assetId }} #ffd04b-->
    <!--</div>-->
    <!--  <div style="height: 60px"></div>-->
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span style="margin-right: 10px">设备详情 </span>
        <span>设备ID: {{ assetId }}</span>
      </div>
      <div class="text item">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-divider><p>基本信息</p></el-divider>
            <el-card class="box-card">
              <div class="clearfix" />
              <div class="text item" style="margin-top: 10px">
                <el-row>
                  <el-col :span="12" style="margin-top: 10px">
                    <table class="myTable" style="width: 100%">
                      <tr>
                        <td class="column">名称</td>
                        <td class="column-value" style="color: #909399; font-weight: bold;">值</td>
                      </tr>
                      <tr>
                        <td class="column">主机名</td>
                        <td class="column-value">{{ assetObj.title }}</td>
                      </tr>
                      <tr>
                        <td class="column">标签</td>
                        <td class="column-value"> <span v-for="(item,index) in assetObj.tag_list" :key="index"> <el-tag style="margin-left: 5px">
                          {{ item }}</el-tag></span></td>
                      </tr>
                      <tr>
                        <td class="column">最后采集日期</td>
                        <td class="column-value">{{ assetObj.latest_date }}</td>
                      </tr>
                    </table>
                  </el-col>
                  <el-col :span="12" style="margin-top: 10px">
                    <table class="myTable" style="width: 100%">
                      <tr>
                        <td class="column">名称</td>
                        <td class="column-value" style="color: #909399; font-weight: bold;">值</td>
                      </tr>
                      <tr>
                        <td class="column">管理IP</td>
                        <td class="column-value">{{ assetObj.manage_ip }}</td>
                      </tr>
                      <tr>
                        <td class="column">设备状态</td>
                        <td class="column-value"><el-tag style="margin-left: 5px">
                          {{ assetObj.device_status }}</el-tag></td>
                      </tr>
                      <tr>
                        <td class="column">创建时间</td>
                        <td class="column-value">{{ assetObj.create_at }}</td>
                      </tr>
                    </table>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-divider><p>位置信息</p></el-divider>
            <el-card class="box-card">
              <div class="clearfix" />
              <div class="text item" style="margin-top: 10px">
                <el-row>
                  <el-col :span="12" style="margin-top: 10px">
                    <table class="myTable" style="width: 100%">
                      <tr>
                        <td class="column">名称</td>
                        <td class="column-value" style="color: #909399; font-weight: bold;">值</td>
                      </tr>
                      <tr>
                        <td class="column">位置</td>
                        <td class="column-value">{{ idcObj.title }}</td>
                      </tr>
                      <tr>
                        <td class="column">机柜编号</td>
                        <td class="column-value">{{ assetObj.cabinet_num }}</td>
                      </tr>
                    </table>
                  </el-col>
                  <el-col :span="12" style="margin-top: 10px">
                    <table class="myTable" style="width: 100%">
                      <tr>
                        <td class="column">名称</td>
                        <td class="column-value" style="color: #909399; font-weight: bold;">值</td>
                      </tr>
                      <tr>
                        <td class="column">区域</td>
                        <td class="column-value">{{ idcObj.position }}</td>
                      </tr>
                      <tr>
                        <td class="column">柜上编号</td>
                        <td class="column-value">{{ assetObj.cabinet_order }}</td>
                      </tr>
                    </table>
                  </el-col>
                </el-row>
              </div>
            </el-card>

            <el-divider><p>业务线</p><p /></el-divider>

            <el-card class="box-card">
              <div class="clearfix" />
              <div style="height: 30px"> <table class="myTable" style="width: 100%;">
                <tr>
                  <td class="column" style="text-align: right">业务线</td>
                  <td class="column-value" style="color: #909399; font-weight: bold; text-align: center; ">{{ assetObj.business_unit_title }}</td>
                </tr>
              </table>
              </div>
              <div class="text item" style="margin-top: 10px">
                <el-row>

                  <el-col :span="24" style="margin-top: 10px">
                    <el-table
                      :data="businessUnit_info"
                      stripe
                      style="width: 100%"
                    >
                      <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="80"
                      />
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180"
                      />
                      <el-table-column
                        prop="email"
                        label="邮箱"
                      />
                      <el-table-column
                        prop="mobile"
                        label="手机号"
                      />
                      <el-table-column
                        prop="phone"
                        label="电话号"
                      />
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-divider><p>设备维护组</p><p /></el-divider>
            <el-card class="box-card">
              <div class="clearfix" />
              <div style="height: 30px"> <table class="myTable" style="width: 100%;">
                <tr>
                  <td class="column" style="text-align: right">维护组</td>
                  <td class="column-value" style="color: #909399; font-weight: bold; text-align: center; ">{{ userGroupInfo.title }}</td>
                </tr>
              </table>
              </div>
              <div class="text item" style="margin-top: 10px">
                <el-row>

                  <el-col :span="24" style="margin-top: 10px">
                    <el-table
                      :data="userGroupInfo.user_list"
                      stripe
                      style="width: 100%"
                    >
                      <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="80"
                      />
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180"
                      />
                      <el-table-column
                        prop="email"
                        label="邮箱"
                      />
                      <el-table-column
                        prop="mobile"
                        label="手机号"
                      />
                      <el-table-column
                        prop="phone"
                        label="电话号"
                      />
                    </el-table>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="设备信息">

            <ServerInfo v-if="deviceTypeId === 1" :server-id="assetId" @GetAssetRecord="GetAssetRecord" />
            <NetworkDeviceInfo v-if="deviceTypeId === 3" :server-id="assetId" @GetAssetRecord="GetAssetRecord" />
            <CloudServerInfo v-if="deviceTypeId === 2" :server-id="assetId" @GetAssetRecord="GetAssetRecord" />
          </el-tab-pane>

          <el-tab-pane label="变更记录">

            <el-timeline :reverse="reverse">
              <el-timeline-item v-for="record in assetRecord_List" :key="record.id" :timestamp="record.create_at" placement="top">
                <el-card shadow="hover">
                  <h4>{{ record.title }}</h4>
                  <div style="margin-bottom: 20px"> {{ record.content }} </div>
                  <div style="font-weight: bold;font-size: 16px; color: #909399; right: 10px; float: right; padding: 3px 0;margin-bottom: 10px "><svg-icon icon-class="autodata" style="width: 20px ;height: 20px" />{{ record.creator }}</div>
                </el-card>
              </el-timeline-item>

            </el-timeline>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-card>

  </div>

</template>

<script>
import { Asset as masterApi } from '@/api/cmdb'
import ServerInfo from '@/views/cmdb/components/ServerInfo'
import { Idc } from '@/api/cmdb'
import { AssetRecord } from '@/api/cmdb'
import { BusinessUnit } from '@/api/cmdb'
import { DeviceCategory } from '@/api/cmdb'
import { UserGroup } from '@/api/cmdb'
import NetworkDeviceInfo from '@/views/cmdb/components/NetworkDeviceInfo'
import CloudServerInfo from '@/views/cmdb/components/CloudServerInfo'
const defaulIdcData = {
  title: '',
  position: ''

}

const defaulUserGroupInfoData = {
  title: '',
  user_list: []

}

const defaultAssetData = {
  hostname: '',
  manage_ip: '',
  title: '',
  device_status_id: '',
  cabinet_num: '',
  cabinet_order: '',
  latest_date: '',
  create_at: '',
  devices_type: '',
  device_status: '',
  idc_title: '',
  tag_list: [],
  tag: [],
  group_obj: [],
  maintain_groups: null,
  business_unit_title: []
}

export default {
  name: 'AssetDetail',
  components: { ServerInfo, NetworkDeviceInfo, CloudServerInfo },
  props: {
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userGroupInfo: Object.assign({}, defaulUserGroupInfoData),
      deviceTypeId: null,
      businessUnit_info: [],
      assetObj: Object.assign({}, defaultAssetData),
      assetId: '',
      idcObj: Object.assign({}, defaulIdcData),
      assetRecord_List: [],
      reverse: false,
      formLabelWidth: '100px',
      networkFormVisible: false,
      diskFormVisible: false,
      memoryFormVisible: false,
      tempRoute: {},
      dialogStatus: 'create',
      textMap: {
        update: '更新数据',
        create: '创建数据'
      },
      networkDeviceRules: {
        hostname: [{ required: true, message: '姓名必填', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
    if (this.isDetail) {
      const id = this.$route.params && this.$route.params.id
      this.assetId = id
      this.GetList(id)
      this.GetAssetRecord(id)
    }
  },
  methods: {
    GetDeviceCategory() {
      if (this.assetObj.device_type !== null && this.assetObj.device_type !== 'Null' && this.assetObj.device_type !== '') {
        DeviceCategory.list({ id: this.assetObj.device_type }).then((request) => {
          this.deviceTypeId = request.data.pid
        })
      }
    },
    GetList(id) {
      masterApi.list({
        id: id
      }).then((request) => {
        if (request.data.length === 1) {
          this.assetObj = request.data[0]
          this.GetIdc()
          this.BusinessUnit()
          this.GetDeviceCategory()
          this.GetUserGroup()
        }
      })
      this.setTagsViewTitle()
    },
    GetIdc() {
      Idc.list({
        id: this.assetObj.idc
      }).then((request) => {
        if (request.data.length === 1) {
          this.idcObj = request.data[0]
        }
      })
    },
    GetAssetRecord(id) {
      AssetRecord.list({
        asset_obj: id
      }).then((request) => {
        this.assetRecord_List = request.data
      })
    },
    BusinessUnit() {
      BusinessUnit.list({ id: this.assetObj.business_unit }).then((request) => {
        if (request.data.length === 1) {
          this.businessUnit_info = request.data[0].group_obj.user_list
        }
      })
    },
    GetUserGroup() {
      if (this.assetObj.maintain_groups !== null && this.assetObj.maintain_groups !== '' && this.assetObj.maintain_groups) {
        UserGroup.list({ id: this.assetObj.maintain_groups }).then((request) => {
          this.userGroupInfo = request.data[0]
        })
      }
    },
    handleDownFormVisible() {
      this.networkFormVisible = false
      this.diskFormVisible = false
      this.memoryFormVisible = false
    },
    setTagsViewTitle() {
      const title = '设备详情'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.assetId}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  }
}
</script>

<style>
.el-tabs--border-card > .el-tabs__content > .el-tab-pane > .el-card > .el-card__header {
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
  width: 80%;
  padding: 10px;
}

td.column {
  /*text-align: center;*/
  /*width*/
    width: 20%;
  padding: 10px;
  color: #909399;
  font-weight: bold;
}
</style>
