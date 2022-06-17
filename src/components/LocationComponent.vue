<template>
  <div class="location">
    <div class="top-table">
      <el-button>
      <i class="fa-solid fa-chevron-down mgr-10"></i>
      </el-button>
      <span>Location</span>
      <el-input class="float-right" style="width: 50%" size="mini" v-model="search"></el-input>
    </div>
    <div class="content-table">
      <div class="content-table-top">
        <el-button @click="$router.push({ name: 'location',query: { mode: 'add' } })">
          <i class="fa-solid fa-plus mgr-20 pointer"></i>
        </el-button>
        <el-button :disabled="selectedLocation.length !== 1" @click="onOpenLocation">
          <i class="fa-solid fa-folder-open mgr-20 pointer"></i>
        </el-button>
        <el-button :disabled="selectedLocation.length === 0" @click="onDeleteLocation">
        <i class="fa-solid fa-x mgr-20 pointer"></i>
        </el-button>
        <el-button @click="importLocationCSV">
        <i class="fa-solid fa-file-import mgr-20 pointer"></i>
        </el-button>
        <el-button @click="exportLocationCSV">
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
          :rowMultiSelectWithClick="true"
          rowSelection="multiple"
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
    'selectedLocation'
  ]),
  data() {
    return {
      columnDefs: [
      { field: "id", hide: true },
      { field: "name", 
        headerName: 'Name', 
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true, },
      { field: "address", headerName: 'Address', sortable: true },
      { field: "city", headerName: 'City', sortable: true },
      { field: "postal_code", headerName: 'Postal Code', sortable: true },
      { field: "state_province", headerName: 'State/Province', sortable: true },
      { field: "country", headerName: 'Country', sortable: true },
      { field: "company_company", headerName: 'Company', sortable: true },
      { field: "region", headerName: 'Region', sortable: true },
      { field: "division", headerName: 'Division', sortable: true }
      ],
      rowData: [],
      search: "",
    };
  },
  async beforeMount() {
    await this.getLocations()
  },
  mounted() {

  },
  watch: {
    search(newSearch, oldSearch) {
      this.gridApi.setQuickFilter(newSearch);
    }
  },
  methods: {
    async getLocations(){
      const rs = await window.electronAPI.getLocations(this.user.id)
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
      const location_id = data.id
      
      this.$router.push({ name: 'location', query: { mode: 'edit', location_id: location_id }})
    },
    onSelectionChanged() {
      const selectedLocation = this.gridApi.getSelectedRows();
      this.$store.dispatch('setSelectedLocation', selectedLocation)
    },
    onOpenLocation(){
      this.$router.push({ name: 'location', query: { mode: 'edit', location_id: this.selectedLocation[0].id }})
    },
    onDeleteLocation(){
      const sel = this;
      const locationIds = this.selectedLocation.map(location => location.id)
      this.$confirm('Do you want to delete this location?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await window.electronAPI.deleteLocation(locationIds)
          sel.$message({
            type: 'success',
            message: 'Delete completed'
          });
          sel.$store.dispatch('setSelectedLocation', [])
          sel.$store.dispatch('setSelectedAsset', [])
          sel.$store.dispatch('setSelectedJob', [])
          await sel.getLocations()
        }).catch(() => {
          return         
        });
    },
    exportLocationCSV(){
      const data = this.rowData.map(_data => {
        return {
          Name: _data.name,
          Region: _data.region,
          Division: _data.division,
          Area: _data.area,
          Plant: _data.plant,
          Street: _data.address,
          City: _data.city,
          State: _data.state_province,
          PostalCode: _data.postal_code,
          Country: _data.country,
          ContactPerson: _data.person_name,
          PhoneNumber1: _data.person_phone_no1,
          PhoneNumber2: _data.person_phone_no2,
          Email: _data.person_email,
        }
      })
      
      window.electronAPI.exportLocationCSV(data);
      this.$message({
            type: 'success',
            message: 'Export completed'
          });

    },
    async importLocationCSV(){
      const rs = await window.electronAPI.importLocationCSV(this.user.id);
      await this.getLocations()
      if (rs.success){
        this.$message({
            type: 'success',
            message: 'Import completed'
          });
      }
      else{
          this.$message({
            type: 'warning',
            message: 'Import error'
          });
      }
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
