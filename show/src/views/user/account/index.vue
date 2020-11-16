<template>
  <div class="user-control container">
    <UserTitle
      :stat-list="statList"
      :show-avatar="false"
      :title="activeName == 'first' ? title : secondTitle"
      :description="activeName == 'first' ? description : (activeName == 'second' ? secondDescription : thirdDescription)"
    />
    <!-- <div class="titleText">
      <span>基础信息</span>
    </div>-->
    <el-tabs class="contentBox" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
        <gray-block>
          <el-form ref="form" :model="userInfo" label-width="80px" size="small">
            <el-form-item label="用户名称">
              <p>{{userInfo.username}}</p>
            </el-form-item>
            <el-form-item label="手机号码">
              <p>{{userInfo.mobile}}</p>
            </el-form-item>
            <el-form-item label="密码设置">
              <p>********</p>
              <span class="btn c00b3f5" @click="dialogVisible = true">修改</span>
            </el-form-item>
          </el-form>
        </gray-block>
      </el-tab-pane>
      <el-tab-pane label="参赛信息管理" name="second" v-if="type == 5 || type == 4">
        <gray-block>
          <Personal-information v-if="type == 5"></Personal-information>
          <Agency-information v-if="type == 4"></Agency-information>
        </gray-block>
      </el-tab-pane>
      <el-tab-pane label="参赛证管理" name="third" v-if="type == 5 || type == 4">
        <gray-block>
          <div style="position: relative;">
            <img v-if="type == 5" :src="certificate" class="Image" />
            <img v-if="type == 4" :src="AgencyImage" class="Image" />
            <div v-if="type == 5" class="userName">{{competitorName}}</div>
            <div v-if="type == 4" class="userName">{{organizationName}}</div>
          </div>
          <p class="certificateText">此证明仅作为中华商标协会内部身份认定使用。</p>
        </gray-block>
      </el-tab-pane>
      <!-- <el-tab-pane label="机构参赛信息管理" name="four">
        <gray-block>
          <Agency-information></Agency-information>
        </gray-block>
      </el-tab-pane>-->
    </el-tabs>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="medium"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="ruleForm.oldPassword"
            @input="ruleForm.oldPassword=ruleForm.oldPassword.replace(/[^\w_]/g, '')"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            @input="ruleForm.password=ruleForm.password.replace(/[^\w_]/g, '')"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="ruleForm.confirmPassword"
            @input="ruleForm.confirmPassword=ruleForm.confirmPassword.replace(/[^\w_]/g, '')"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" class="btn">取 消</el-button>
        <el-button type="primary" @click="modifyFun" class="btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getFun, postFun } from "@/api/transit.js";
import GrayBlock from "../components/GrayBlock.vue";
import UserTitle from "../components/UserTitle.vue";
import PersonalInformation from "./PersonalInformation/index";
import AgencyInformation from "./AgencyInformation/index";
export default {
  computed: {
    ...mapGetters(["userinfo", "auth"])
  },
  components: {
    GrayBlock,
    UserTitle,
    PersonalInformation,
    AgencyInformation
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      type: 1,
      title: "我的账户",
      description: "修改个人信息",
      secondTitle: "参赛信息管理",
      secondDescription:
        "参赛信息一旦填写即不可变更，推荐人信息需在三日内完成。",
      thirdDescription: "仅作内部使用",
      statList: [],
      activeName: "first",
      passwordShow: true,
      userInfo: {
        username: "",
        mobile: ""
      },
      certificate: require("@/assets/img/grcsz.png"),
      AgencyImage: require("@/assets/img/jgcsz.png"),
      dialogVisible: false,
      ruleForm: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码应不少于6个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码应不少于6个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 6, message: "密码应不少于6个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      competitorName: "",
      organizationName: ""
    };
  },
  watch: {
    $route: function(to, from) {
      //执行数据更新查询
      this.changePage();
    }
  },
  mounted() {},
  created() {
    this.changePage();
  },
  methods: {
    changePage() {
      this.activeName = this.$route.query.tabIndex === 2 ? "third" : "first";
      this.type = this.userinfo.roleType;
      this.userInfo = this.userinfo;
      if (this.type == 5) {
        this.currentUserFun();
      } else if (this.type == 4) {
        this.currentFun();
      }
    },
    handleClick() {},
    /**修改密码 */
    modifyFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          postFun("/trade-web/api/user/modifyPassword", this.ruleForm).then(
            res => {
              if (res.code == 200) {
                this.dialogVisible = false;
                this.$message.success(res.message);
              } else {
                this.$message.error(res.message);
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    /**查询个人参赛信息 */
    currentUserFun() {
      getFun("/trade-web/api/competitor/user/current").then(res => {
        if (res.code == 200 && res.data) {
          this.competitorName = res.data.competitorName;
        }
      });
    },
    /**查询机构参赛信息 */
    currentFun() {
      getFun("/trade-web/api/competitor/organization/current").then(res => {
        if (res.code == 200 && res.data) {
          this.organizationName = res.data.organizationName;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.ruleForm.oldPassword = "";
      this.ruleForm.password = "";
      this.ruleForm.confirmPassword = "";
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>
<style scoped lang="scss">
.titleText {
  padding: 0px 20px;
  span {
    margin-left: 16px;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 2px solid #ff0000;
    color: #ff0000;
    font-size: 16px;
  }
}
.contentBox p {
  width: 280px;
  margin-right: 10px;
  display: inline-block;
}
.btn {
  height: 20px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  display: inline-block;
  padding-left: 1px;
  cursor: pointer;
}
.c00b3f5 {
  color: #00b3f5;
}
.Btn {
  width: 132px;
  height: 46px;
  padding: 9px 15px !important;
}
.Btn + .Btn {
  margin-left: 21px;
}
.Image {
  width: 830px;
}
.certificateText {
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  width: 400px !important;
  margin-top: 24px;
}
.dialog-footer {
  .btn {
    padding: 12px 20px !important;
    height: auto;
  }
}
.userName {
  position: absolute;
  top: 238px;
  left: 245px;
  color: #bb9c56;
  font-size: 20px;
}
</style>
<style  lang="scss">
.contentBox {
  .el-input {
    width: 280px !important;
    margin-right: 10px;
  }
  .el-tabs__nav-wrap::after {
    background: #fff !important;
  }
  .el-tabs__header {
    margin-bottom: 0 !important;
  }
  .el-tabs__nav-scroll {
    margin-left: 36px;
  }
}
</style>