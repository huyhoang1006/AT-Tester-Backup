<template>
  <div id="manage">
    <el-row class="top-bar">
      <el-col :span="24">
        <el-button @click="backToManage" style="box-sizing: border-box; border-right: 1px solid #aeb6bf">
        <i class="fa-solid fa-circle-arrow-left display-block fa-2x"></i>
        <div class="mgt-10">Manage</div>
        </el-button>
        <el-button @click="saveLocation('ruleForm')">
          <i class="fa-solid fa-floppy-disk display-block fa-2x"></i>
          <div class="mgt-10">Save Location</div>
        </el-button>
        <el-button @click="deleteLocation" style="box-sizing: border-box" :disabled="mode === 'add'">
          <i class="fa-solid fa-xmark display-block fa-2x" style="color: #f56c6c"></i>
          <div class="mgt-10">Delete</div>
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="content">
      <el-col :span="8" class="col-content">
        <el-form ref="ruleForm" :rules="rules" :model="location.properties" :inline-message="true" label-width="140px" size="mini" label-position="left">
          <span class="bolder">Properties</span>
          <el-divider></el-divider>
          <el-form-item label="Name" prop="name">
            <el-input v-model="location.properties.name"></el-input>
          </el-form-item>
          <el-form-item label="Region">
            <el-input v-model="location.properties.region"></el-input>
          </el-form-item>
          <el-form-item label="Division">
            <el-input v-model="location.properties.division"></el-input>
          </el-form-item>
          <el-form-item label="Area">
            <el-input v-model="location.properties.area"></el-input>
          </el-form-item>
          <el-form-item label="Plant">
            <el-input v-model="location.properties.plant"></el-input>
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="location.properties.address"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="location.properties.city"></el-input>
          </el-form-item>
          <el-form-item label="State/Province">
            <el-input v-model="location.properties.state_province"></el-input>
          </el-form-item>
          <el-form-item label="Postal code">
            <el-input type="tel" v-model="location.properties.postal_code"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="location.properties.country"></el-input>
          </el-form-item>
          <el-form-item label="Geo coordinates">
            <el-input v-model="location.properties.geo_coordinates"></el-input>
          </el-form-item>
          <el-form-item label="Location system code">
            <el-input v-model="location.properties.location_system_code"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="col-content">
        <el-form :model="location.contact_person" label-width="140px" size="mini" label-position="left">
          <span class="bolder">Contact person</span>
          <el-divider></el-divider>
          <el-form-item label="Name">
            <el-input v-model="location.contact_person.name"></el-input>
          </el-form-item>
          <el-form-item label="Phone no.1">
            <el-input type="tel" v-model="location.contact_person.phone_no1"></el-input>
          </el-form-item>
          <el-form-item label="Phone no.2">
            <el-input type="tel"  v-model="location.contact_person.phone_no2"></el-input>
          </el-form-item>
          <el-form-item label="Fax no">
            <el-input type="tel"  v-model="location.contact_person.fax_no"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="location.contact_person.email"></el-input>
          </el-form-item>
          <span class="bolder">Comment</span>
          <el-divider></el-divider>
          <el-input type="textarea" v-model="location.comment"></el-input>
        </el-form>
      </el-col>
      <el-col :span="8" class="col-content">
        <el-form :model="location.company" label-width="140px" size="mini" label-position="left">
          <span class="bolder">Company</span>
          <el-divider style="margin: 5px 0;"></el-divider>
          <el-form-item label="Company">
            <el-input v-model="location.company.company"></el-input>
          </el-form-item>
          <el-form-item label="Department">
            <el-input v-model="location.company.department"></el-input>
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="location.company.address"></el-input>
          </el-form-item>
          <el-form-item label="City">
            <el-input v-model="location.company.city"></el-input>
          </el-form-item>
          <el-form-item label="State/Province">
            <el-input v-model="location.company.state_province"></el-input>
          </el-form-item>
          <el-form-item label="Postal code">
            <el-input type="tel"  v-model="location.company.postal_code"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="location.company.country"></el-input>
          </el-form-item>
          <el-form-item label="Phone no">
            <el-input type="tel"  v-model="location.company.phone_no"></el-input>
          </el-form-item>
          <el-form-item label="Fax no">
            <el-input type="tel"  v-model="location.company.fax_no"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="location.company.email"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "LocationView",
  components: {
    // LocationComponent,
  },
  data() {
    return {
      mode: 'add',
      location_id: null,
      saved: false,
      location: {
        id: "",
        properties: {
          name: "",
          region: "",
          division: "",
          area: "",
          plant: "",
          address: "",
          city: "",
          state_province: "",
          postal_code: "",
          country: "",
          geo_coordinates: "",
          location_system_code: ""
        },
        contact_person: {
          name: "",
          phone_no1: "",
          phone_no2: "",
          fax_no: "",
          email: ""
        },
        comment: "",
        company: {
          company: "",
          department: "",
          address: "",
          city: "",
          state_province: "",
          postal_code: "",
          country: "",
          phone_no: "",
          fax_no: "",
          email:""
        }
      },
      rules: {
        name: [
            { required: true, message: 'Please input location name', trigger: 'blur' },
          ],
      }
    };
  },
  computed: mapState([
    // map this.count to store.state.count
    'user'
  ]),
  async beforeMount() {
    this.mode = this.$route.query.mode
    if (this.mode === 'edit'){
      this.location_id = this.$route.query.location_id
      const rs = await window.electronAPI.getLocationById(this.location_id)
      if (rs.success){
        const data = rs.data
        this.location = {
          id: data.id,
          properties: {
            name: data.name,
            region: data.region,
            division: data.division,
            area: data.area,
            plant: data.plant,
            address: data.address,
            city: data.city,
            state_province: data.state_province,
            postal_code: data.postal_code,
            country: data.country,
            geo_coordinates: data.geo_coordinates,
            location_system_code: data.location_system_code
          },
          contact_person: {
            name: data.person_name,
            phone_no1: data.person_phone_no1,
            phone_no2: data.person_phone_no2,
            fax_no: data.person_fax_no,
            email: data.person_email
          },
          comment: data.comment,
          company: {
            company: data.company_company,
            department: data.company_department,
            address: data.company_address,
            city: data.company_city,
            state_province: data.company_state_province,
            postal_code: data.company_postal_code,
            country: data.company_country,
            phone_no: data.company_phone_no,
            fax_no: data.company_fax_no,
            email:data.company_email
          }
        }
      }
    }
  },
  mounted() {},
  methods: {
    saveLocation(formName) {
      const sel = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (sel.mode === 'add'){
            await sel.insertLocation()
            sel.$message({
                type: 'success',
                message: 'Insert completed'
            });
            this.$router.push({ name: 'manage'})
          }
          else{
            await sel.updateLocation()
            sel.$message({
                type: 'success',
                message: 'Update completed'
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteLocation(){
      const sel = this;
      this.$confirm('Do you want to delete this location?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          await window.electronAPI.deleteLocation(sel.location_id)
          sel.$message({
            type: 'success',
            message: 'Delete completed'
          });
          sel.$router.push({ name: 'manage'})
        }).catch(() => {
          return         
        });
    },
    async insertLocation(){
      const rs = await window.electronAPI.insertLocation(this.user.id, this.location)
      console.log('insert', rs)
    },
    async updateLocation(){
      const rs = await window.electronAPI.updateLocation(this.location)
      console.log('update', rs)
    },
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
  padding: 5px;

  .col-content {
    height: 100%;
  }
}
</style>
