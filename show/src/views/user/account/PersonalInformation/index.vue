<template>
  <el-form ref="form" :rules="rules" :model="infoData" label-width="120px" size="medium">
    <el-form-item label="真实姓名" prop="competitorName">
      <el-input v-model="infoData.competitorName" :disabled="disabled" placeholder="请输入真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="competitorIdCardNumber">
      <el-input
        v-model="infoData.competitorIdCardNumber"
        :disabled="disabled"
        placeholder="请输入身份证号"
      ></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="competitorMobile">
      <el-input v-model="infoData.competitorMobile" :disabled="disabled" placeholder="请输入联系电话"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱" prop="competitorEmail">
      <el-input v-model="infoData.competitorEmail" :disabled="disabled" placeholder="请输入电子邮箱"></el-input>
    </el-form-item>
    <el-form-item label="用户类型" prop="competitorType">
      <el-select v-model="infoData.competitorType" :disabled="disabled" placeholder="请选择用户类型">
        <el-option :value="0" label="学生"></el-option>
        <el-option :value="1" label="设计师"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="用户类型" prop="competitorType">
      <el-select v-model="infoData.competitorType" :disabled="disabled" placeholder="请选择用户类型">
        <el-option
          v-for="item in matchList"
          :value="item.value"
          :key="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-form-item>-->
    <el-form-item label="所在企业/学校" prop="competitorOrganization">
      <el-input
        v-model="infoData.competitorOrganization"
        :disabled="disabled"
        placeholder="请输入所在企业/学校"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="所在专业"
      v-if="infoData.competitorType == 0"
      :prop="infoData.competitorType == 0 ? 'competitorMajor' : ''"
    >
      <el-input v-model="infoData.competitorMajor" :disabled="disabled" placeholder="请输入所在专业"></el-input>
    </el-form-item>
    <el-divider></el-divider>
    <div>
      <p class="referrer">推荐人信息（非必填）</p>
      <span class="btn c00b3f5" @click="referrerModifyFun">修改推荐人信息</span>
    </div>
    <el-form-item label="推荐人">
      <el-input v-model="infoData.referenceName" :disabled="referrerDisabled" placeholder="请输入推荐人"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="referenceContactInformation">
      <el-input
        v-model="infoData.referenceContactInformation"
        :disabled="referrerDisabled"
        placeholder="请输入联系电话"
      ></el-input>
    </el-form-item>
    <div style="margin-top:74px">
      <el-button type="primary" class="Btn primaryBtn" @click="addFun">确认</el-button>
      <el-button
        type="info"
        class="Btn infoBtn"
        @click="referrerDisabled == true ? '' : currentFun()"
      >取消</el-button>
    </div>
  </el-form>
</template>
<style scoped>
.referrer {
  margin-bottom: 20px;
  width: 305px !important;
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
</style>
<script>
import { getFun, postFun } from "@/api/transit.js";
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("身份证号码不正确"));
      }
    };
    // 手机号验证
    const validatePhone = (rule, value, callback) => {
      if (value != "") {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的联系电话"));
        } else {
          callback();
        }
      }
    };
    return {
      infoData: {
        competitorName: "", //真实姓名
        competitorIdCardNumber: "", //身份证号
        competitorMobile: "",
        competitorEmail: "",
        competitorType: 0,
        competitorOrganization: "",
        competitorMajor: "",
        referenceName: "",
        referenceContactInformation: ""
      },
      rules: {
        competitorName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        competitorIdCardNumber: [
          { required: true, validator: checkNumber, trigger: "blur" }
        ],
        competitorMobile: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        competitorEmail: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        competitorType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        competitorOrganization: [
          { required: true, message: "请输入所在企业/学校", trigger: "blur" }
        ],
        competitorMajor: [
          { required: true, message: "请输入所在专业", trigger: "blur" }
        ],
        referenceContactInformation: [
          { validator: validatePhone, trigger: "blur" }
        ]
      },
      disabled: false,
      referrerDisabled: false,
      matchList: []
    };
  },
  mounted() {
    this.getDictData();
    this.currentFun();
  },
  methods: {
    // 获取作者属性
    getDictData() {
      this.getDict().then(response => {
        if (response.code === "200" || response.code === 200) {
          let data = response.data;
          for (let i of data["作者属性"]) {
            this.matchList.push({
              value: i.key,
              label: i.value
            });
          }
        } else {
          this.$message.error(message);
        }
      });
    },
    /**查询参赛信息 */
    currentFun() {
      getFun("/trade-web/api/competitor/user/current").then(res => {
        if (res.code == 200 && res.data) {
          this.infoData = res.data;
          if (res.data.competitorName) {
            this.disabled = true;
            this.referrerDisabled = true;
          }
        }
      });
    },
    addFun() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.infoData.competitorMajor =
            this.infoData.competitorType == "1"
              ? null
              : this.infoData.competitorMajor;
          var url =
            this.disabled == false && this.referrerDisabled == false
              ? "/trade-web/api/competitor/user/add"
              : "/trade-web/api/competitor/user/update";
          postFun(url, this.infoData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              this.currentFun();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    /**修改推荐人 */
    referrerModifyFun() {
      this.referrerDisabled = false;
    },
    // 获取筛选列表
    getDict(param) {
      return getFun("/trade-web/api/dict", param);
    }
  }
};
</script>