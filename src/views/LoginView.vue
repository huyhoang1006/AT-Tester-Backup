<template>
  <div id="login">
    <div class="header">
      <h2 class="logo">
        <img src="@/assets/images/logo.png" style="max-height: 60px">
      </h2>
    </div>
    <div class="login">
      <el-card>
        <h2>Login</h2>
        <el-form
          class="login-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.native.prevent="login"
        >
          <el-form-item prop="username">
            <el-input
              v-model="model.username"
              placeholder="Username"
              prefix-icon="fas fa-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="fas fa-lock" placeholder="Password" type="password" v-model="model.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" class="float-left">Remember</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
              >Login</el-button
            >
          </el-form-item>
          <router-link class="forgot-password" :to="{ name: 'signup'}">Sign up</router-link>
        </el-form>
      </el-card>
    </div>

    <div class="footer">
      <div class="links">
        <span>
          <a href="#">
            <img src="@/assets/images/website.png" style="max-height: 32px">
          </a>
        </span>
        <span>
          <a href="#">
            <img src="@/assets/images/facebook.png" style="max-height: 32px">
          </a>
        </span>
        <span>
          <a href="#">
            <img src="@/assets/images/zalo.png" style="max-height: 32px">
          </a>
        </span>
      </div>
      <div class="version">Copyright 2022 © AT Energy</div>
    </div>
  </div>
</template>

<script>
import {setUser} from '@/utils/auth'

export default {
  name: "LoginView",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      remember: false,
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Username length should be at least 5 characters",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 8,
            message: "Password length should be at least 8 characters",
            trigger: "blur",
          },
        ],
      },
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    simulateLogin() {
      return new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      const user = await window.electronAPI.login(this.model)
      await this.simulateLogin()
      this.loading = false;
      if (user !== false) {
        this.$message.success("Login successfully");
        this.$store.dispatch('setUser', user)
        if (this.remember){
          setUser(user)
        }
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      } else {
        this.$message.error("Username or password is invalid");
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  },
};
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>

<style lang="scss" scoped>
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
 #login {
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
    margin: 0;
  padding: 0;
  background: #102a43;
  background-image: url("@/assets/images/dots.png");
  background-size: contain;
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 30px 20px 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>

