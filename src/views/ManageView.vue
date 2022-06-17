<template>
  <div id="manage">
    <el-row class="top-bar">
      <el-col :span="24" >
        <router-link :to="{ name: 'home'}">
          <el-button style="box-sizing: border-box; border-right: 1px solid #AEB6BF;">
              <i class="fa-solid fa-circle-arrow-left display-block fa-2x"></i>
              <div class="mgt-10">Home</div>
            </el-button>
          </router-link>
          <el-button 
          style="float: right;
              text-align: right;
              width: fit-content;
              cursor: default">
            <img src="@/assets/images/logo.png" style="max-height:60px">
          </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="content">
      <el-col :span="8" class="col-content">
        <location-component></location-component>
      </el-col>
      <el-col :span="8" class="col-content">
        <asset-component></asset-component>
      </el-col>
      <el-col :span="8" class="col-content">
        <job-component></job-component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import LocationComponent from "@/components/LocationComponent";
import AssetComponent from "@/components/AssetComponent";
import JobComponent from "@/components/JobComponent";


export default {
  name: "ManageView",
  components: {
    LocationComponent,
    AssetComponent,
    JobComponent
  },
  data(){
    return {

    }
  },
  beforeMount() {
    
  },
  destroyed() {
      this.$store.dispatch('setSelectedLocation', [])
      this.$store.dispatch('setSelectedAsset', [])
      this.$store.dispatch('setSelectedJob', [])
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  height: 100px;
  padding: 5px;
  background-color: #EBEDEF;
  box-sizing: border-box;
  border-bottom: 1px solid #AEB6BF;

    .el-button{
        width: 120px;
        height: 90px;
        border: none;
        background: inherit;
        border-radius: 0;
      }
}

.content {
  height: calc(100vh - 100px);
  margin: 0 !important;
  padding: 5px;

  .col-content{
    height: 100%;
  }
}
</style>
