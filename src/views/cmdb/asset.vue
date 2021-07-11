<template>
  <div>
    <div
      style="
      height: 60px;
      width: 100%;
      background-color:#545c64;
      position:fixed;
      z-index: 4;
      color: #fff;
       margin: 0 auto;
    padding-right: 299px;
"
    >
      <el-cascader
        v-model="value"
        :options="deviceCategoryList"
        :props="{value: 'id',label: 'title' , expandTrigger: 'hover' } "
        style="margin-left:10px;"
      />
      <el-button
        icon="el-icon-edit"
        style="  margin-left: 1px; margin-top: 15px; "
        type="primary"
        @click="submitCreate"
      >
        新建
      </el-button>
      <!--      <el-button icon="el-icon-delete" type="danger" clearable  @click="handleDelete(row,$index)">-->
      <!--        新建网络设备-->
      <!--      </el-button>-->

    </div>
    <div style="height: 60px" />
    <el-card class="box-card" shadow="hover" style="margin: 20px">
      <div slot="header" class="clearfix">
        <span>资产中心</span>
      </div>
      <div class="filter-container">
        <el-select v-model="pageQuerylist.business_unit" clearable placeholder="业务线查询">
          <el-option
            v-for="item in businessUnitList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
        <el-cascader
          clearable

          :options="deviceCategoryList"
          :props="{value: 'id',label: 'title' , expandTrigger: 'hover' } "
          :show-all-levels="false"
          placeholder="类型查询"
          style="width: 150px"
          @change="fileChange"
        />
        <el-select v-model="pageQuerylist.tag" clearable placeholder="标签查询" style="width: 120px">
          <el-option
            v-for="item in tagDataList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
        <el-input
          v-model="pageQuerylist.search"
          class="filter-item"
          placeholder="请输入搜索内容"
          style="width: 200px;margin-right: 10px; margin-top: 9px;}"
        />
        <el-button class="filter-item" icon="el-icon-search" type="primary" style=" margin-top: 10px;" @click="searchFilter">
          搜索
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
            fixed
            label="序号"
            type="index"
            width="80"
          />
          <el-table-column
            align="center"
            label="资产类型"
            width="140"
          >
            <template slot-scope="{row}">
              <!--              <span v-if="row.devices_father_type === ''type="warning" || === null"></span>-->
              <el-tag v-if="row.devices_father_type === '服务器'" type="success">{{ row.devices_father_type }}</el-tag>
              <el-tag v-else-if="row.devices_father_type === '网络设备'" type="warning">{{
                row.devices_father_type
              }}
              </el-tag>
              <el-tag v-else-if="row.devices_father_type === '云服务器'">{{ row.devices_father_type }}</el-tag>
              <el-tag
                v-else-if="row.devices_father_type === '' || row.devices_father_type === null || row.devices_father_type === 'Null' "
                type="danger"
              >Null
              </el-tag>
              <el-tag v-else type="info">{{ row.devices_father_type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="子类型"
            prop="devices_type"
            width="140"
          />

          <!--              <el-select v-model="row.device_type" placeholder="请选择" style="width: 100%">-->
          <!--            <el-option-->
          <!--              v-for="item in deviceCategory"-->
          <!--              :key="item.id"-->
          <!--              :label="item.title"-->
          <!--              :value="item.id">-->

          <!--            </el-option>-->

          <!--            </el-select>-->
          <el-table-column
            align="center"
            label="主机名"
            prop="title"
            width="140"
          />
          <el-table-column
            align="center"
            label="管理IP"
            prop="manage_ip"
            width="140"
          />
          <el-table-column
            align="center"
            label="所属业务线"
            prop="business_unit_title"
            width="140"
          />

          <el-table-column
            align="center"
            label="机房"
            prop="idc_title"
            width="140"
          />
          <el-table-column
            align="center"
            label="设备状态"
            prop="device_status"
            width="140"
          />
          <el-table-column
            align="center"
            label="标签"
            width="400"
          >
            <template slot-scope="{row}">
              <el-tag v-for="role in row.tag_list" :key="role.id" style="margin:2px">{{ role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="280">
            <template slot-scope="{row,$index}">
              <router-link :to="'/cmdb/detail/'+row.id">
                <el-button icon="el-icon-view" size="mini" style="margin-right: 10px" type="success">
                  详情
                </el-button>
              </router-link>
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="handlEdit(row)">
                编辑
              </el-button>
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
    <!--    新建服务器 对话框-->
    <el-dialog title="新建服务器" :visible.sync="serverFormVisible">
      <el-form ref="serverRef" :model="serverFormData" :rules="serverRules">
        <el-form-item :label-width="formLabelWidth" label="主机名" prop="hostname">
          <el-input v-model="serverFormData.hostname" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理IP" prop="manage_ip">
          <el-input v-model="serverFormData.manage_ip" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible">取 消</el-button>
        <el-button type="primary" @click="dialogServerCreate">确 定</el-button>
      </div>
    </el-dialog>

    <!--    编辑资产-->
    <el-dialog :visible.sync="assetFormVisible" title="编辑资产">
      <el-form ref="assetRef" :model="tempData" :rules="assetRules">
        <el-form-item :label-width="formLabelWidth" label="主机名" prop="title">
          <el-input v-model="tempData.title" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="设备类型">
          <el-cascader
            v-model="tempData.device_type"
            :options="deviceCategoryList"
            :props="{value: 'id',label: 'title' , expandTrigger: 'hover' } "
            style="margin-left:10px;"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="所属业务线">
          <el-select v-model="tempData.business_unit" placeholder="请选择">
            <el-option
              v-for="item in businessUnitList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维护组" :label-width="formLabelWidth">
          <el-select v-model="tempData.maintain_groups" placeholder="请选择">
            <el-option
              v-for="item in userGroupList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="设备状态">
          <el-select v-model="tempData.device_status_id" placeholder="请选择">
            <el-option
              v-for="item in device_status_choices"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="资产标签">
          <el-select v-model="tempData.tag" multiple placeholder="请选择">
            <el-option
              v-for="item in tagDataList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>

        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="IDC机房">
          <el-select v-model="tempData.idc" placeholder="请选择">
            <el-option
              v-for="item in idcDataList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="机柜号">
          <el-input v-model="tempData.cabinet_num" style="width: 200px" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="柜上序列号">
          <el-input v-model="tempData.cabinet_order" style="width: 200px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible">取 消</el-button>
        <el-button type="primary" @click="dialogAssetUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--    新建网络设备 -->
    <el-dialog title="新建网络设备" :visible.sync="networkFormVisible">
      <el-form ref="networkRef" :model="networFormData" :rules="networkRules">
        <el-form-item :label-width="formLabelWidth" label="设备名称" prop="hostname">
          <el-input v-model="networFormData.hostname" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理IP" prop="manage_ip">
          <el-input v-model="networFormData.manage_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="VlanIP" prop="vlan_ip">
          <el-input v-model="networFormData.vlan_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="内网IP" prop="intranet_ip">
          <el-input v-model="networFormData.intranet_ip" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="SN号" prop="sn">
          <el-input v-model="networFormData.sn" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="品牌" prop="manufacture">
          <el-input v-model="networFormData.manufacture" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="型号" prop="model">
          <el-input v-model="networFormData.model" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="端口个数" prop="port_num">
          <el-input v-model="networFormData.port_num" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="详细配置" prop="device_detail">
          <el-input v-model="networFormData.device_detail" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible">取 消</el-button>
        <el-button type="primary" @click="dialogNetworkCreate">确 定</el-button>
      </div>
    </el-dialog>

    <!--    新建云资产-->
    <el-dialog title="新建服务器" :visible.sync="CloudserverFormVisible">
      <el-form ref="CloudServerRef" :model="cloudServerFormData" :rules="CloudServerRules">
        <el-form-item :label-width="formLabelWidth" label="实例ID" prop="instance_id">
          <el-input v-model="cloudServerFormData.instance_id" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="管理IP" prop="manage_ip">
          <el-input v-model="cloudServerFormData.manage_ip" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDownFormVisible">取 消</el-button>
        <el-button type="primary" @click="dialogCloudServerCreate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { Asset as masterApi } from '@/api/cmdb'
import { DeviceCategory } from '@/api/cmdb'
import { Tag } from '@/api/cmdb'
import { Server } from '@/api/cmdb'
import { Idc } from '@/api/cmdb'
import { UserGroup } from '@/api/cmdb'
import { BusinessUnit } from '@/api/cmdb'
import { NetworkDevice } from '@/api/cmdb'
import { CloudServer } from '@/api/cmdb'

const defaulttempDataData = {
  title: '',
  device_type: null,
  maintain_groups: null,
  idc: null,
  business_unit: null,
  tag: [],
  device_status_id: null,
  cabinet_num: null,
  cabinet_order: null
}
const defaultNetworkData = {
  hostname: null,
  manage_ip: null,
  vlan_ip: null,
  intranet_ip: null,
  sn: null,
  manufacture: null,
  model: null,
  port_num: null,
  device_detail: null
}
const defaultServerData = {
  // hostname: '',
  // manage_ip: '',
  // os_platform: '',
  // os_version: '',
  // sn: '',
  // manufacturer: '',
  // model: '',
  // cpu_count: '',
  // cpu_physical_count: '',
  // cpu_model: '',
}
export default {
  name: 'Asset',
  data() {
    return {
      serverFormVisible: false,
      serverFormData: {},
      value: [],
      device_status_choices: [
        { id: 1, title: '上线' },
        { id: 2, title: '在线' },
        { id: 3, title: '离线' },
        { id: 4, title: '下架' }
      ],
      idcDataList: [],
      tagDataList: [],
      options: [{
        value: 'server',
        label: '服务器'
      }, {
        value: 'cloudServer',
        label: '云服务器'
      }, {
        value: 'networkDevice',
        label: '网络设备'
      }],
      userList: [],
      dialogStatus: 'create',
      pageQuerylist: {
        page: 1,
        size: 10,
        total: 0,
        sizes: [10, 20, 30, 40, 50],
        search: null,
        tag: null,
        business_unit: null,
        device_type: null
      },
      formTitle: 'server',
      queryDatalist: [],
      dialogFormVisible: false,
      assetFormVisible: false,
      networkFormVisible: false,
      formLabelWidth: '100px',
      // tempData: {},
      textMap: {
        server: '新建服务器',
        cloudServer: '新建云服务器',
        networkDevice: '新建网络设备'
      },
      cloudServerFormData: {},
      CloudserverFormVisible: false,
      networFormData: Object.assign({}, defaultNetworkData),
      tempData: Object.assign({}, defaulttempDataData),
      deviceCategoryList: [],
      userGroupList: [],
      businessUnitList: [],
      CloudServerRules: {
        instance_id: [{ required: true, message: '实例ID必填', trigger: 'blur' }],
        manage_ip: [{ required: true, message: '管理IP必填', trigger: 'blur' }]
      },
      serverRules: {
        hostname: [{ required: true, message: '主机名必填', trigger: 'blur' }],
        manage_ip: [{ required: true, message: '管理IP必填', trigger: 'blur' }]
      },
      assetRules: {
        title: [{ required: true, message: '主机名必填', trigger: 'blur' }]
      },
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
    this.GetList()
    this.GetDeviceCategory()
    this.GetTag()
    this.GetIdc()
    this.GetUserGroup()
    this.GetBusinessUnit()
  },
  methods: {
    GetList() {
      masterApi.list(this.pageQuerylist).then(response => {
        this.queryDatalist = response.data
        this.pageQuerylist.total = response.count
      })
    },
    GetDeviceCategory() {
      DeviceCategory.list().then((request) => {
        this.deviceCategoryList = request.data
      })
    },
    GetTag() {
      Tag.list().then((request) => {
        this.tagDataList = request.data
      })
    },
    GetIdc() {
      Idc.list().then((request) => {
        this.idcDataList = request.data
      })
    },
    GetUserGroup() {
      UserGroup.list().then((request) => {
        this.userGroupList = request.data
      })
    },
    GetBusinessUnit() {
      BusinessUnit.list().then((request) => {
        this.businessUnitList = request.data
      })
    },
    submitCreate() {
      if (this.value[0] === 1) {
        this.serverFormData = {}
        this.serverFormVisible = true
      } else if (this.value[0] === 2) {
        this.cloudServerFormData = {}
        this.CloudserverFormVisible = true
      } else if (this.value[0] === 3) {
        this.networFormData = Object.assign({}, defaultNetworkData)
        this.networkFormVisible = true
      } else {
        this.$notify({
          title: '类型新建未定义',
          message: '类型新建未定义请先定义!'
        })
      }
    },
    handlEdit(row) {
      // this.tempData= Object.assign({}, defaulttempDataData)
      this.tempData = JSON.parse(JSON.stringify(row))
      this.assetFormVisible = true
    },
    dialogServerCreate() {
      this.$refs['serverRef'].validate((valid) => {
        if (valid) {
          this.serverFormData['type_id'] = this.value[1]
          Server.create(this.serverFormData).then((request) => {
            this.serverFormVisible = false
            this.GetList()
            this.$notify({
              title: '成功',
              message: '创建数据成功!',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.serverFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    dialogCloudServerCreate() {
      this.$refs['CloudServerRef'].validate((valid) => {
        if (valid) {
          this.cloudServerFormData['type_id'] = this.value[1]
          CloudServer.create(this.cloudServerFormData).then((request) => {
            this.CloudserverFormVisible = false
            this.GetList()
            this.$notify({
              title: '成功',
              message: '创建数据成功!',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.CloudserverFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    dialogNetworkCreate() {
      this.$refs['networkRef'].validate((valid) => {
        if (valid) {
          this.networFormData['type_id'] = this.value[1]
          NetworkDevice.create(this.networFormData).then((request) => {
            this.networkFormVisible = false
            this.GetList()
            this.$notify({
              title: '成功',
              message: '创建数据成功!',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.networkFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    handleDownFormVisible() {
      this.assetFormVisible = false
      this.serverFormVisible = false
      this.networkFormVisible = false
      this.CloudserverFormVisible = false
      this.serverFormData = Object.assign({}, defaultServerData)
    },
    dialogAssetUpdate() {
      this.$refs['assetRef'].validate((valid) => {
        if (valid) {
          const AssetJson = {
            title: this.tempData.title,
            device_status_id: this.tempData.device_status_id,
            cabinet_num: this.tempData.cabinet_num,
            cabinet_order: this.tempData.cabinet_order,
            idc: this.tempData.idc,
            business_unit: this.tempData.business_unit,
            tag: this.tempData.tag,
            device_type: this.tempData.device_type,
            maintain_groups: this.tempData.maintain_groups

          }
          masterApi.update(this.tempData.id, AssetJson).then(() => {
            this.GetList()
            this.tempData = Object.assign({}, defaulttempDataData)
            this.assetFormVisible = false
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
    },
    fileChange(value) {
      this.pageQuerylist.device_type = value[1]
    }
  }
}
</script>

<style scoped>

</style>
