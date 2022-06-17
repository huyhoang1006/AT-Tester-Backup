<template>
  <div id="home">
    
    <div id="header">
      <div class="app-name" style="font-weight: bolder;">AT Digital Tester</div>
    </div>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" style="font-size:200%; color:white; font-weight: bolder;">
        Account
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      </span>

      <!-- Form change password -->
      <el-dialog title="Change password" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Current password" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="New password" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.newpass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="changePass">Save change</el-button>
        </span>
      </el-dialog>


      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-if="this.user.id == 1" command="manage_user">User Manager </el-dropdown-item>
        <el-dropdown-item command="update_password">Change password</el-dropdown-item>
        <el-dropdown-item command="log_out">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div id="content">
      <div class="home-menu">
        <el-button @click="$router.push({ name: 'manage'})">
          <i class="fa-solid fa-folder-open" style="font-size: 80px;"></i>
          <div class="mgt-10">Manage</div>
        </el-button>
        

        <!-- Recent jobs -->
        <div class="recent-job">
          <h4 id="recent-job-title">Recent jobs</h4>
          <div class="menu-recent-job">
            <div class="recent-job-type">Guided</div>
            <div class="recent-job-type">Manual</div>
          </div>
          <div class="fields-recent-job">
            <div class="field-recent-job">Serial number</div>
            <div class="field-recent-job">Asset</div>
            <div class="field-recent-job">Location</div>
            <div class="field-recent-job">Job</div>
            <div class="field-recent-job">Status</div>
          </div>
          <div class="detail-recent-job"></div>
        </div>
      </div>

      <div class="home-option">
        <div class="home-device">
          <!-- <div class="device-title">Device</div>
                        <div class="device-detail">
                            <div></div>
                            <div class="device-status">- no device online -</div>
                            <div class="list-device-icon">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                        <button>Connect</button>
                        <div class="device-option-icon">
                            <i class="ti-more-alt" style="transform: rotate(90deg);"></i>
                        </div> -->
        </div>

        <div class="home-data"></div>

        <div class="home-information"></div>
      </div>
    </div>

    <div id="footer">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {setUser} from '@/utils/auth'

export default {
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      dialogFormVisible: false,
      user_object: null,
      errors: [],
      form: {
        oldpass: '',
        newpass: '',
      },
      formLabelWidth: '120px'
    }
  },
  name: "HomeView",
  computed: mapState([
    // map this.count to store.state.count
    'user'
  ]),
  methods: {
    handleCommand(command){
      if(command =="log_out"){
        this.$store.dispatch('removeUser')
        setUser(null)
        this.$router.push({ path: '/login' })
      }
      if(command =="update_password"){
        this.dialogFormVisible = true
      }
      if(command =="manage_user"){
        this.$router.push({ path: '/manage-user'})
      }
    },
    checkForm(){
      this.errors = []
      if(this.form.oldpass.match(/[=<>";]/g)){
        this.errors.push("Old password containing special characters is not allowed")
        this.$message.error("Old password containing special characters is not allowed")
      }
      if(this.form.oldpass.length < 8){
        this.errors.push("Old password length should be at least 8 characters")
        this.$message.error("Old password length should be at least 8 characters")
      }
      if(!this.form.oldpass){
        this.errors.push("Old password required")
        this.$message.error("Old password could not empty")
      }
      if(this.form.newpass.match(/[=<>";]/g)){
        this.errors.push("New password containing special characters is not allowed")
        this.$message.error("New password containing special characters is not allowed")
      }
      if(this.form.newpass.length < 8){
        this.errors.push("New password length should be at least 8 characters")
        this.$message.error("New password length should be at least 8 characters")
      }
      if(!this.form.newpass){
        this.errors.push("New password required")
        this.$message.error("New password could not empty")
      }
    },
    async changePass(){
      this.checkForm()
      if (this.user.password == this.form.oldpass){
        if(Object.keys(this.errors).length == 0){
          this.user.password = this.form.newpass
          const rs = await window.electronAPI.changePass(this.user)
          console.log('update', rs)
          this.$message.success("Changed password successfully")
          this.dialogFormVisible = false
          this.handleCommand("log_out")
        }
      }else{
        this.$message.error("Old password is incorrect")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100vw;
  height: 100vh;
  // background-color: #18549c;
  background-color: #cccccc;
  // background-repeat: no-repeat;
  // background-image: linear-gradient(0, rgba(204,204,204,0.8),rgba(1,37,150,0.8));
  // background-size: 100% 100%;
  // background-attachment: fixed;
  // background-blend-mode: lighten;
  padding: 20px 30px;
  box-sizing: border-box;
}
#header {
  display: inline-block;
}
#header .app-name {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  color: #fff;
  margin: 30px 5px 30px 5px;
}
#content .home-menu {
  display: inline-block;
  width: calc(100% * 2 / 3);
}
.menu-item {
  text-align: center;
  height: 120px;
  width: 120px;
  display: inline-block;
  padding: 10px 10px;
  margin: 0px 5px 0 5px;
  background-color: #10447c;
  cursor: pointer;
}
.menu-item .label-menu-item {
  text-align: center;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
#recent-job-title {
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px 5px 5px 5px;
  color: #fff;
  margin-bottom: 0px;
}
.menu-recent-job {
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 2px solid rgb(51, 153, 255);
}
.menu-recent-job .recent-job-type {
  color: #fff;
  display: inline-block;
  padding: 5px 20px;
  cursor: pointer;
}
.fields-recent-job {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #10447c;
}
.fields-recent-job .field-recent-job {
  color: #fff;
  font-weight: bold;
  display: inline-block;
  padding: 10px 25px;
  cursor: pointer;
}
.detail-recent-job {
  width: 100%;
}
.home-option {
  display: inline-block;
  top: 0;
  width: calc(100% / 3 - 5px);
}
.home-option .device-detail {
  display: inline-block;
}
.el-dropdown-link {
  cursor: pointer;
  color: #FFFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  display: inline-block;
  position: absolute;
  right: 1%;
}
</style>