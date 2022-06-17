<template>
  <div id="manage">
    <el-row class="top-bar">
      <el-col :span="24">
        <el-button @click="backToManage" style="box-sizing: border-box; border-right: 1px solid #aeb6bf">
        <i class="fa-solid fa-circle-arrow-left display-block fa-2x"></i>
        <div class="mgt-10">Manage</div>
        </el-button>
        <el-button>
          <i class="fa-solid fa-floppy-disk display-block fa-2x"></i>
          <div class="mgt-10">Save Location</div>
        </el-button>
        <el-button style="box-sizing: border-box" :disabled="mode === 'add'">
          <i class="fa-solid fa-xmark display-block fa-2x" style="color: #f56c6c"></i>
          <div class="mgt-10">Delete</div>
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="content">
      <el-tabs tab-position="left" type="border-card" style="height: 100%;">
        <el-tab-pane>
          <span slot="label"><i class="fa-solid fa-book"></i> Overview</span>
          <div id="overview">



          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="fa-solid fa-calculator"></i> Tests</span>
          <div id="tests"></div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "JobView",
  components: {
    // LocationComponent,
  },
  data() {
    return {

    };
  },
  computed: mapState([
    // map this.count to store.state.count
    'user'
  ]),
  beforeMount() {

  },
  mounted() {},
  methods: {
    backToManage(){
        const sel = this;
        this.$confirm('Do you want to exit?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(async () => {
            sel.$router.push({ name: 'manage'})
            }).catch(() => {
            return         
            });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  height: 100px;
  padding: 5px;
  background-color: #ebedef;
  box-sizing: border-box;
  border-bottom: 1px solid #aeb6bf;

  .el-button {
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

  #overview, #tests{
    width: calc(100vw - 145px);
    height: calc(100vh - 120px);
  }
}
</style>
