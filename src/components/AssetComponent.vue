<template>
  <div class="location">
    <div class="top-table">
      <el-button>
      <i class="fa-solid fa-chevron-down mgr-10"></i>
      </el-button>
      <span>Asset</span>
      <el-input class="float-right" style="width: 50%" size="mini" v-model="search"></el-input>
    </div>
    <div class="content-table">
      <div class="content-table-top">
        <el-button :disabled="selectedLocation.length !== 1" @click="$router.push({ name: 'asset',query: { mode: 'add', location_id:selectedLocation[0].id } })">
          <i class="fa-solid fa-plus mgr-20 pointer"></i>
        </el-button>
        <el-button :disabled="selectedAsset.length !== 1" @click="onOpenAsset">
          <i class="fa-solid fa-folder-open mgr-20 pointer"></i>
        </el-button>
        <el-button :disabled="selectedAsset.length === 0" @click="onDeleteAsset">
        <i class="fa-solid fa-x mgr-20 pointer"></i>
        </el-button>
        <el-button>
        <i class="fa-solid fa-file-import mgr-20 pointer"></i>
        </el-button>
        <el-button>
        <i class="fa-solid fa-file-export pointer"></i>
        </el-button>
        <span style="float: right">1 of 1</span>
      </div>
      <div class="content-table-main">
        <ag-grid-vue
          style="height: 100%"
          class="ag-theme-alpine"
          @grid-ready="onGridReady"
          @rowDoubleClicked="onRowDoubleClick"
          :columnDefs="columnDefs"
          :rowData="rowData"
          rowSelection="single"
          @selection-changed="onSelectionChanged"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { AgGridVue } from "ag-grid-vue"
import { mapState } from 'vuex'

export default {
  name: "LocationComponent",
  components: {
    AgGridVue,
  },
  computed: mapState([
    'user',
    'selectedLocation',
    'selectedAsset'
  ]),
  data() {
    return {
      columnDefs: [
      { field: "id", hide: true },
      { field: "name", headerName: 'Name' },
      { field: "address", headerName: 'Address' },
      { field: "city", headerName: 'City' },
      { field: "postal_code", headerName: 'Postal Code' },
      { field: "state_province", headerName: 'State/Province' },
      { field: "country", headerName: 'Country' },
      { field: "company_company", headerName: 'Company' },
      { field: "region", headerName: 'Region' },
      { field: "division", headerName: 'Division' }
      ],
      rowData: [],
      search: "",
    };
  },
  async beforeMount() {
    await this.getAssets()
  },
  mounted() {

  },
  watch: {
    search(newSearch, oldSearch) {
      this.gridApi.setQuickFilter(newSearch);
    }
  },
  methods: {
    async getAssets(){
      const rs = await window.electronAPI.getAssets(this.user.id)
      if (rs.success){
        this.rowData = rs.data;
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    onRowDoubleClick(event) {
      const data = event.data
      const asset_id = data.id
      
      this.$router.push({ name: 'location', query: { mode: 'edit', asset_id: asset_id }})
    },
    onSelectionChanged() {
      const selectedAsset = this.gridApi.getSelectedRows()[0];
      this.$store.dispatch('setSelectedAsset', selectedAsset)
    },
    onOpenAsset(){
      this.$router.push({ name: 'asset', query: { mode: 'edit', asset_id: this.selectedAsset.id }})
    },
    onDeleteAsset(){
      const sel = this;
      const assetId = this.selectedAsset.id
      this.$confirm('Do you want to delete this asset?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await window.electronAPI.deleteAsset(assetId)
          sel.$message({
            type: 'success',
            message: 'Delete completed'
          });
          await sel.getAssets()
        }).catch(() => {
          return         
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.location {
  height: 100%;

      .el-button{
        border: none;
        background: inherit;
        border-radius: 0;
        margin: 0;
        padding: 0;
      }

  .top-table {
    height: 50px;
    line-height: 30px;
    background-color: #d5d8dc;
    margin-bottom: 5px;
    padding: 10px;
    box-sizing: border-box;
  }

  .content-table {
    height: calc(100% - 55px);
    background-color: #eaecee;
    padding: 10px;
    box-sizing: border-box;

    .content-table-top {
      height: 30px;
      line-height: 30px;
    }

    .content-table-main {
      height: calc(100% - 30px);
    }
  }
}
</style>
