<template>
  <AssetDetail :is-detail="true" />
<!--  <networkDeviceDetail v-else-if="devices_father_type_info.pid === 3" :is-detail="true" />-->

</template>

<script>
import AssetDetail from './components/AssetDetail'
import { Asset } from '@/api/cmdb'
import { DeviceCategory } from '@/api/cmdb'
// import networkDeviceDetail from '@/views/cmdb/components/networkDeviceDetail'

const defaultDeviceData = {
  id: null,
  title: null,
  pid: null,
  children: []
}
export default {
  name: 'CmdbDetail',
  components: { AssetDetail },
  data() {
    return {
      pid: '',
      assetId: '',
      device_type_id: null,
      test: null,
      devices_father_type_info: Object.assign({}, defaultDeviceData),
      definition_id_list: [1, 3, 2]
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.assetId = id
    this.GetAsset(id)
  },
  methods: {
    GetAsset(id) {
      Asset.list({ id: id }).then((request) => {
        this.device_type_id = request.data[0]['device_type']
        this.GetDeviceCategory(this.device_type_id)
      })
    },
    GetDeviceCategory(id) {
      DeviceCategory.list({
        id: id
      }).then((request) => {
        this.devices_father_type_info = request.data
        this.pid = this.devices_father_type_info.pid
        if (this.definition_id_list.includes(this.pid) === false) {
          this.$notify.error({
            title: '类型详情未定义',
            duration: 0,
            dangerouslyUseHTMLString: true,
            message: `<div> 类型详情未定义: <i style="color: red">${this.devices_father_type_info.title}</i> </div>
                       <div>主类型ID: <i style="color: red">${this.devices_father_type_info.pid}</i></div>`
          })
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

