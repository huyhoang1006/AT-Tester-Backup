<template>
  <div class="container-fluid mt-4">
    <h1 id="title" class="h1">Users Manager</h1>
    <el-button id="return-button" type="primary" icon="el-icon-arrow-left" @click="backHome()">Return Home</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="addUser()"></el-button>

    <!-- Form add user -->
    <el-dialog title="Add user" :visible.sync="dialogFormVisibleAdd">
      <el-form 
        :model="added_user"
      >
        <el-form-item label="User name" :label-width="formLabelWidth">
          <el-input type="text" v-model="added_user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="added_user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input type="text" v-model="added_user.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input type="text" v-model="added_user.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">Cancel</el-button>
        <el-button type="primary" @click="insertUser()">Save change</el-button>
      </span>
    </el-dialog>


    <!-- <b-alert :show="loading" variant="info">Loading...</b-alert> -->
    <el-table :data="users" style="width: 100%">
      <el-table-column label="ID" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="User Name" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>username: {{ scope.row.username }}</div>
              <div>passwrod: {{ scope.row.password }}</div>
              <div>address: {{ scope.row.address }}</div>
              <div>gender: {{ scope.row.gender }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.username }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="Address" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Gender" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!-- <el-icon><timer /></el-icon> -->
            <span style="margin-left: 10px">{{ scope.row.gender }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="UserToEdit(scope.row)"
            >Edit</el-button
          >
          <template>
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="deleteUser(scope.row)"
            >
            <el-button
              slot="reference"
              size="small"
              type="danger"
              >Delete</el-button
            >
          </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form edit user -->
    <el-dialog title="Edit infomation user" :visible.sync="dialogFormVisible">
      <el-form 
        :model="model"
      >
        <el-form-item label="User name" :label-width="formLabelWidth">
          <el-input type="text" v-model="model.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth">
          <el-input type="text" v-model="model.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender" :label-width="formLabelWidth">
          <el-input type="text" v-model="model.gender" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editUserInfo()">Save change</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>

export default {
  name:"ManageUserView",
  data () {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      user_selected: {},
      users: [],
      model: [],
      added_user: {},
      formLabelWidth: '120px'
    }
  },
  async created () {
    this.refreshUser()
  },
  methods: {
    handleCurrentChange (row) {
      this.user_selected = row
    },
    backHome () {
        this.$router.push("/home")
    },
    async refreshUser () {
      this.loading = true
      this.users = await window.electronAPI.getAllUser()
      this.loading = false
    },
    async UserToEdit (user) {
      this.dialogFormVisible = true
      this.model = Object.assign({}, user)
    },
    async editUserInfo () {
      if (this.model.id) {
        await window.electronAPI.editUserInfo(this.model)
      } else {
        this.$message.error("Edit failed")
      }
      this.model = {} // reset form
      this.dialogFormVisible = false
      await this.refreshUser()
    },
    async addUser (user) {
      this.dialogFormVisibleAdd = true
      this.added_user = Object.assign({}, user)
    },
    async insertUser () {
      const rs = await window.electronAPI.addUser(this.added_user)
      if (rs.success === true){
        this.$message.success("Add user successfully")
      }else{
        this.$message.error(rs.message)
      }
      this.added_user = {}
      this.dialogFormVisibleAdd = false
      await this.refreshUser()
    },
    async deleteUser (user) {
      if (user.role == 1){
        this.$message.error("Can't delete admin account")
      }else{
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === user.id) {
          this.model = {}
        }
        await window.electronAPI.deleteUser(user.id)
        await this.refreshUser()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#title {
    display: inline-block;
}
#return-button {
    display: inline-block;
    position: absolute;
    right: 1%;
}
</style>