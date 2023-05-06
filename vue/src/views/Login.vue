<template>
  <div class="login">
    <div class="tab">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form
            ref="user1"
            label-position="left"
            label-width="80px"
            :rules="rules1"
            :model="user"
          >
            <el-form-item style="color: #000000" label="账号" prop="username">
              <el-input
                v-model="user.username"
                style="width: 200px"
                placeholder="请输入账号"
                prefix-icon="el-icon-user"
                size="small"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="user.password"
                style="width: 200px"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                required
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item prop="role">
              <el-radio-group v-model="user.role">
                <el-radio label="用户"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('user1')"
                size="small"
                round
                ><i class="el-icon-user"></i>登录</el-button
              >
              <el-button @click="resetForm('user1')" size="small" round
                ><i class="el-icon-lock"></i>重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="register">
          <el-form
            ref="user"
            label-position="left"
            label-width="80px"
            :rules="rules2"
            :model="user"
          >
            <el-form-item style="color: #000000" label="账号" prop="username">
              <el-input
                v-model="user.username"
                style="width: 200px"
                placeholder="请输入账号"
                prefix-icon="el-icon-user"
                size="small"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="user.password"
                style="width: 200px"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                required
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item prop="role">
              <el-radio-group v-model="user.role">
                <el-radio label="用户"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="registerForm('user')"
                size="small"
                round
                ><i class="el-icon-user"></i>注册</el-button
              >
              <el-button @click="resetForm('user')" size="small" round
                ><i class="el-icon-lock"></i>重置</el-button
              >
            </el-form-item>
          </el-form></el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { LoginAPI, RegisterAPI, BookRturnSellctAPI } from "@/request/api";
export default {
  data() {
    return {
      tabPosition: "left",
      labelPosition: "right",
      isRequired: true,
      activeName: "login",
      user: {
        username: "",
        password: "",
        role: "",
      },
      rules1: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
      },
      rules2: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapMutations(["saveUsername","saverole"]),
    //登录确认
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //登录
          let users = {};
          users.username = this.user.username;
          users.password = this.user.password;
          users.role = this.user.role === "用户" ? 2 : 1;
          // console.log(users);
          let res = await LoginAPI(users);
          // console.log(res);

          //登陆成功
          if (res.status == 0) {
            this.$message({
              message: res.message,
              type: "success",
            });
            //保存token
            localStorage.setItem("book_token", res.token);
            //保存用户名
            this.saveUsername(this.user.username);
            //保存权限
            this.saverole(this.user.role)
            //清空内容
            this.user = {};
            //催还提示
            this.Reminder();
            this.$router.push("/home");
          } else {
            this.$message.error(res.message);
          }
        } else {
          this.$message({
            message: "信息未填写完整!",
            type: "warning",
          });
          return false;
        }
      });
    },
    //催还提示
    async Reminder(list) {
      let res =await BookRturnSellctAPI({currentPage:1,size:8});
      let j =0
      for (let i=0;i<res.data.length;i++) {
        if(res.data[i].urgerepayment === 0){
          this.$notify({
          title: '催还消息',
          message: `管理员催还了《${res.data[i].bookname}》`,
          type: 'warning',
          offset: 80*j
        });
        j++
        }
      }
    },
    //注册确认
    registerForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //注册
          let users = {};
          users.username = this.user.username;
          users.password = this.user.password;
          users.role = this.user.role === "用户" ? 2 : 1;
          console.log(users);
          let res = await RegisterAPI(users);
          console.log(res);

          if (res.status == 0) {
            //注册成功!
            this.$message({
              message: res.message,
              type: "success",
            });
            this.activeName = "login"; // 切换到登录标签页
          } else {
            this.$message.error(res.message);
          }
        } else {
          this.$message({
            message: "信息未填写完整!",
            type: "warning",
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.login {
  width: 1536px;
  height: 791px;
  background-image: url("../assets/img/logon.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  .tab {
    width: 500px;
    height: 350px;
    position: absolute;
    top: 180px;
    left: 518px;
    border-radius: 15px;
    box-shadow: 0 10px 50px 0 #121013d1;
    background-color: #e4e7ed00;

    .el-form-item__label,
    .el-radio,
    .el-tabs__item {
      color: #f0f9eb;
      font-size: 15px;
    }
    .el-tabs__content {
      margin-top: 40px;
    }
    .el-tabs__item.is-active {
      color: #fdf6ec;
      background-color: #9addbc8f;
    }
    #tab-login {
      border-radius: 15px 0 0 0;
    }
  }
}
</style>