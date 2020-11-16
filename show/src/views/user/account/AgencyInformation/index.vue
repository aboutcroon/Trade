<template>
  <div class="trade-upload">
    <el-form ref="form" :model="infoData" label-width="120px" size="medium" :rules="rules">
      <el-form-item label="机构名称" prop="organizationName">
        <el-input v-model="infoData.organizationName" :disabled="disabled" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码" prop="uniformSocialCreditCode">
        <el-input
          v-model="infoData.uniformSocialCreditCode"
          :disabled="disabled"
          placeholder="请输入社会信用代码"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="organizationContact">
        <el-input v-model="infoData.organizationContact" :disabled="disabled" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="organizationMobile">
        <el-input v-model="infoData.organizationMobile" :disabled="disabled" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="营业执照上传" class="large-item">
        <div class="upload-container">
          <el-upload
            ref="uploadFile2"
            class="upload-left"
            name="file1"
            :multiple="false"
            :with-credentials="true"
            :limit="limit"
            :auto-upload="false"
            :show-file-list="false"
            :data="infoData"
            :on-success="handleImageSuccess"
            :on-change="handleImageSelect"
            action="/trade-web/api/works/upload"
            :disabled="disabled"
          >
            <div>
              <img v-show="imageUrl" :src="imageUrl" class="upload-profile" />
              <img v-show="!imageUrl" :src="uploadImgUrl" class="upload-img" />
              <div v-show="!imageUrl" class="upload-placeholder">上传图片</div>
            </div>
          </el-upload>
          <div class="upload-right">
            <div>
              <div class="upload-label" style="padding-top: 30px">
                点击新增/修改图片，推荐大小为200*200；
                上传图片不超过3M，格式为jpg，png。
              </div>
              <el-button
                class="upload-delete-btn"
                type="primary"
                size="small"
                @click="uploadDelete()"
                :disabled="disabled"
              >删除</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
      <div style="margin-top:74px">
        <el-button type="primary" class="Btn primaryBtn" @click="addFun">确认</el-button>
        <el-button type="info" class="Btn infoBtn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getFun, postFun, postFile } from "@/api/transit.js";
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入社会信用代码"));
      }
      var reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("社会信用代码不正确"));
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
        organizationName: "",
        uniformSocialCreditCode: "",
        organizationContact: "",
        organizationMobile: ""
      },
      // 文件限制
      limit: 1,
      imageUrl: "",
      uploadImgUrl: require("@/assets/img/upload_img.png"),
      file1: "",
      rules: {
        organizationName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        uniformSocialCreditCode: [
          { required: true, validator: checkNumber, trigger: "blur" }
        ],
        organizationContact: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        organizationMobile: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { required: true, validator: validatePhone, trigger: "blur" }
        ]
      },
      disabled: false
    };
  },
  mounted() {
    this.currentFun();
  },
  methods: {
    /**查询参赛信息 */
    currentFun() {
      getFun("/trade-web/api/competitor/organization/current").then(res => {
        if (res.code == 200) {
          this.infoData.organizationName = res.data.organizationName;
          this.infoData.uniformSocialCreditCode =
            res.data.uniformSocialCreditCode;
          this.infoData.organizationContact = res.data.organizationContact;
          this.infoData.organizationMobile = res.data.organizationMobile;
          this.imageUrl = res.data.businessLicenseUrl;
          if (
            res.data.organizationName != "" &&
            res.data.organizationName != null
          ) {
            this.disabled = true;
          }
        }
      });
    },
    addFun() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let formData = new FormData();

          for (let key in this.infoData) {
            formData.append(key, this.infoData[key]);
          }
          if (this.file1) {
            formData.append("file", this.file1.raw, this.file1.raw.name);
          }
          postFile("/trade-web/api/competitor/organization/add", formData).then(
            res => {
              if (res.code == 200) {
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
    /**修改推荐人 */
    referrerModifyFun() {},
    handleImageSuccess(res, file) {},
    handleImageSelect(file, fileList) {
      if (file) {
        console.log(file);
        const isJPG = file.raw.type === "image/jpeg";
        if (isJPG) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.file1 = file;
          // this.infoData.file = file.name;
        } else {
          this.$message.error("上传的电子照片只能JPG格式");
        }
      }
    },
    uploadDelete(){
      this.imageUrl = '';
    }
  }
};
</script>
<style scoped lang="scss">
.trade-upload {
  font-family: "SourceHanSansCN-Regular", "Microsoft YaHei", sans-serif;

  .el-form-item__label {
    font-size: 16px;
  }

  .small-item {
    width: 416px;
    height: 40px;
    margin-bottom: 40px;

    .el-select {
      width: 100%;

      .el-icon-arrow-up:before {
        content: "\e78f" !important;
      }
    }

    .el-form-item__content {
      height: 40px;
      line-height: 40px;

      .el-input__inner {
        background: #f9f9f9;
        border: 1px solid #e5e5e5;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
      }
    }
  }

  .middle-item {
    width: 700px;
    height: 144px;
    margin-bottom: 40px;

    .el-textarea__inner {
      height: 144px;
      background: #f9f9f9;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    }
  }

  .large-item {
    width: 826px;
    height: 170px;

    .upload-container {
      width: 726px;
      height: 170px;
      display: flex;

      .upload-left {
        display: inline-flex;
        width: 294px;
        height: 170px;
        background: #ffffff;
        border: 1px solid #e5e5e5;

        div {
          width: 294px;
          height: 170px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .upload-img {
          width: 52px;
          margin: 0 auto;
        }

        .upload-placeholder {
          margin-top: 10px;
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }

        .upload-profile {
          z-index: 2;
          max-width: 294px;
          max-height: 170px;
          margin: auto;
        }
      }
      .upload-right {
        margin-left: 34px;
        width: 396px;
        height: 170px;

        .upload-label {
          width: 396px;
          height: 138px;
          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
          color: #bbbbbb;
        }
      }
    }
  }

  .upload-delete-btn {
    width: 84px;
    height: 32px;
    border: 1px solid #00b3f5;
    border-radius: 3px;
    background-color: transparent;
    font-size: 14px;
    padding: 0;
    font-weight: 400;
    color: #00b3f5;
  }
  .upload-delete-btn:hover {
    background-color: #00b3f5;
    color: #ffffff;
  }

  .btn-confirm {
    width: 132px;
    height: 46px;
    background: #ff0000;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
  }
  .btn-cancel {
    width: 132px;
    height: 46px;
    background: #d1d1d1;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
  }
}
.referrer {
  margin-bottom: 20px;
  width: 305px !important;
  display: inline-block;
}
.btn {
  width: 84px;
  height: 32px;
  border: 1px solid #00b3f5;
  border-radius: 3px;
  color: #00b3f5;
  background: #fff;
  padding: 9px 15px;
  margin-left: 85px;
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