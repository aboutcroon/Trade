<template>
  <div class="trade-upload">
    <el-form
      class="contentBox"
      ref="formTrade"
      :model="formTrade"
      :rules="ruleValidate"
      label-width="106px">
      <el-form-item label="作品名称：" class="small-item" size="medium" prop="worksName">
        <el-input v-model="formTrade.worksName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="赛事选择：" class="small-item" size="medium">
        <el-select v-model="formTrade.competitionId" placeholder="请选择" @change="handleMatchChange">
          <el-option v-for="item in matchList" :value="item.value" :key="item.value" :label="item.label">{{ item.label
            }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品类型：" class="small-item" size="medium">
        <el-select v-model="formTrade.categoryId" placeholder="请选择">
          <el-option v-for="item in tradeTypeList" :value="item.value" :key="item.value" :label="item.label">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品属性：" class="small-item" size="medium">
        <el-select v-model="formTrade.worksPropertyId" placeholder="请选择">
          <el-option v-for="item in tradeAttrList" :value="item.value" :key="item.value" :label="item.label">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖项类型：" class="small-item" size="medium">
        <el-select v-model="formTrade.prizeId" placeholder="请选择">
          <el-option v-for="item in awardList" :value="item.value" :key="item.value" :label="item.label">{{ item.label
            }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品说明：" class="middle-item" size="medium">
        <el-input type="textarea" v-model="formTrade.worksDescription" placeholder="提示：300字以内，包含作品创意及创作目的"></el-input>
      </el-form-item>
      <el-form-item label="上传作品：" class="large-item" size="medium">
        <div class="upload-container">
          <el-upload
            ref="uploadFile"
            class="upload-left"
            name="file1"
            :multiple="false"
            :with-credentials="true"
            :limit="limit"
            :auto-upload="false"
            :show-file-list="false"
            :data="formTrade"
            :on-success="handleVectorSuccess"
            :on-change="handleVectorSelect"
            action="/trade-web/api/works/upload">
            <div>
              <img v-show="vectorUrl" :src="vectorUrl" class="upload-profile">
              <img v-show="!vectorUrl" :src="uploadImgUrl" class="upload-img"/>
              <div v-show="!vectorUrl" class="upload-placeholder">{{vectorTip}}</div>
            </div>

          </el-upload>
          <div class="upload-right">
            <div>
              <div class="upload-label" style="padding-top: 60px">请上传矢量图，格式：CDR或AI、eps格式</div>
              <el-button class="upload-delete-btn" type="primary" size="small" @click="deleteFile1">删除</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label=" " class="large-item" size="medium">
        <div class="upload-container">
          <el-upload
            ref="uploadFile2"
            class="upload-left"
            name="file2"
            :multiple="false"
            :with-credentials="true"
            :limit="limit"
            :auto-upload="false"
            :show-file-list="false"
            :data="formTrade"
            :on-success="handleImageSuccess"
            :on-change="handleImageSelect"
            action="/trade-web/api/works/upload">
            <div>
              <img v-show="imageUrl" :src="imageUrl" class="upload-profile">
              <img v-show="!imageUrl" :src="uploadImgUrl" class="upload-img"/>
              <div v-show="!imageUrl" class="upload-placeholder">上传电子照片</div>
            </div>

          </el-upload>
          <div class="upload-right">
            <div>
              <div class="upload-label" style="padding-top: 30px">请上传jpg格式图片，图形应清晰，图样文件小于200KB，
                且图形像素介于“400*400”-“1500*1500”之间。如果通过扫描获得商标图样的，应按24位彩色、RGB格式、
                300dpi分辨率扫描符合商标法律法规的图形（图形清晰，大于5*5cm且小于10*10cm）
              </div>
              <el-button class="upload-delete-btn" type="primary" size="small" @click="deleteFile2">删除</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label=" " class="small-item" size="medium">
        <el-checkbox v-model="formTrade.agree">是否同意版权协议</el-checkbox>
      </el-form-item>
    </el-form>
    <div>
      <el-button class="btn-confirm" style="margin: 0 20px 0 100px" @click="submit" :loading="loading">确定</el-button>
      <router-link to="/user">
        <el-button class="btn-cancel">取消</el-button>
      </router-link>
    </div>
  </div>

</template>
<script>
  import {getFun, postFun, postFile} from '@/api/transit.js'
  export default {
    props: {
      title: {
        default: '新闻标题'
      },
    },
    data() {
      return {
        uploadImgUrl: require("@/assets/img/upload_img.png"),
        // 表单数据
        formTrade: {
          // 作品名称
          worksName: '',
          // 作品类型
          categoryId: '',
          // 作品属性
          worksPropertyId: '',
          // 赛事选择
          competitionId: '',
          // 奖项类型
          prizeId: '',
          // 作品说明
          worksDescription: '',
          // 0：矢量图，1：电子图
          // 版权
          agree: false,
        },
        // 文件限制
        limit: 100,
        // 作品类型
        tradeTypeList: [],
        // 作品属性
        tradeAttrList: [],
        matchList: [],
        awardList: [],
        // 矢量图和电子照片数据
        vectorUrl: '',
        vectorTip: '上传矢量图',
        imageUrl: '',
        file1: '',
        file2: '',
        // loading
        loading: false,
        // 修改作品id
        workId: '',

        ruleValidate: {
          worksName: [
            {required: true, message: '作品名称不能为空', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '作品名称不能使用特殊字符', trigger: 'blur'}
          ],
        },
      }

    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let worksId = this.$route.query.worksId
        if (worksId) {
          // 修改作品状态：等获取到作品数据后再获取赛事列表
          this.worksId = worksId
          this.getWorkData(worksId)
        } else {
          this.getCompetitionListData()
        }
        this.getDictData()
      },
      // 上传文件处理
      handleVectorSuccess(res, file) {

      },
      handleVectorSelect(file, fileList) {
        if (file) {
          const fileExt = ['cdr', 'CDR', 'ai', 'AI', 'EPS', 'eps'].includes(file.name.split('.').pop().toLocaleLowerCase())
          if (fileExt) {
            this.file1 = file
            this.vectorTip = '已选择文件：' + file.name
          } else {
            this.$message.error('请上传指定格式的矢量图')
          }
        }
      },
      handleImageSuccess(res, file) {

      },
      handleImageSelect(file, fileList) {
        if (file) {
          // 当前支持png格式
          let types = ['image/jpeg'];
          const isJPG = types.includes(file.raw.type);
          // 字面限制200k，实际220k
          if (file.size > 220 * 1024) {
            this.$message.error('上传的电子照片过大')
          } else if (isJPG) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.file2 = file
          } else {
            this.$message.error('上传的电子照片只能JPG格式')
          }
        }
      },
      // 提交
      submit() {
        if (this.formTrade.worksName.trim().length === 0) {
          this.$message.error('请填写作品名称')
          return false
        }
        if (!this.formTrade.competitionId) {
          this.$message.error('暂无可参加的赛事')
          return false
        }
        if (!this.formTrade.agree) {
          this.$message.error('请同意版权协议')
          return false
        }
        if (this.worksId) {
          // 修改作品
          this.updataWork()
          return false
        }
        if (!this.file1) {
          this.$message.error('请上传矢量图')
          return false
        }
        if (!this.file2) {
          this.$message.error('请上传电子照片')
          return false
        }
        if (this.loading) {
          return false
        } else {
          this.loading = true
        }
        // 同时上传两个文件，手动上传
        let formData = new FormData()
        for (let key in this.formTrade) {
          formData.append(key, this.formTrade[key])
        }
        formData.append('file1', this.file1.raw, this.file1.raw.name)
        formData.append('file2', this.file2.raw, this.file2.raw.name)

        // 上传
        this.postWork(formData).then(response => {
          this.loading = false
          if (response.code === '200' || response.code === 200) {
            this.$message.success('作品已上传')
            this.$router.push({
              name: 'userControl', // 跳转的页面
            })
          } else {
            this.$message.error(response.message)
          }
        })
      },
      // 赛事选择
      handleMatchChange(val) {
        if (!val) {
          return false
        }
        const param = {
          competitionId: val
        }
        this.getPrize(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            let list = response.data
            this.awardList = []
            for (let i of list) {
              this.awardList.push({
                value: i.prizeId,
                label: i.prizeName
              })
            }
            if (this.awardList && !this.worksId) {
              this.formTrade.prizeId = this.awardList[0].value
            }
          } else {
            this.$message.error(message)
          }
        })

      },
      // 获取赛事名称
      getCompetitionListData() {
        this.getCompetitionList().then(response => {
          if (response.code === '200' || response.code === 200) {
            let list = response.data
            for (let i of list) {
              this.matchList.push({
                value: i.competitionId,
                label: i.competitionName
              })
            }
            if (this.matchList) {
              if (!this.worksId) {
                this.formTrade.competitionId = this.matchList[0].value
              }
              // 获取其它数据
              this.handleMatchChange(this.formTrade.competitionId)
            }
          } else {
            this.$message.error(message)
          }
        })
      },
      // 获取筛选列表
      getDictData() {
        this.getDict().then(response => {
          if (response.code === '200' || response.code === 200) {
            let data = response.data
            this.tradeAttrList = []
            for (let i of data['作品属性']) {
              this.tradeAttrList.push({
                value: i.key,
                label: i.value
              })
            }
            if (this.tradeAttrList && !this.worksId) {
              this.formTrade.worksPropertyId = this.tradeAttrList[0].value
            }
            this.tradeTypeList = []
            for (let i of data['作品类型']) {
              this.tradeTypeList.push({
                value: i.key,
                label: i.value
              })
            }
            if (this.tradeTypeList && !this.worksId) {
              this.formTrade.categoryId = this.tradeTypeList[0].value
            }
          } else {
            this.$message.error(message)
          }
        })
      },
      // 修改作品 获取数据
      getWorkData(worksId) {
        const param = {
          worksId: worksId
        }
        this.getWork(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const data = response.data
            this.formTrade.worksId = this.worksId
            this.formTrade.worksName = data.worksName
            this.formTrade.categoryId = data.categoryId
            this.formTrade.worksPropertyId = data.worksPropertyId
            this.formTrade.competitionId = data.competitionId
            this.formTrade.prizeId = data.prizeId
            this.formTrade.worksDescription = data.worksDescription
            this.formTrade.agree = true
            this.imageUrl = data.worksJpgUrl
            this.$emit('getModifyNum', data.modifyNumber)
            let vectorFiles = data.worksVectorUrl.split('/')
            this.vectorTip = '已上传文件:' + vectorFiles[vectorFiles.length - 1]
            this.getCompetitionListData()
          } else {
            this.$message.error(message)
          }
        })
      },
      // 修改作品
      updataWork() {
        // 同时上传两个文件，手动上传
        let formData = new FormData()
        for (let key in this.formTrade) {
          formData.append(key, this.formTrade[key])
        }
        if (this.file1) {
          formData.append('file1', this.file1.raw, this.file1.raw.name)
        }
        if (this.file2) {
          formData.append('file2', this.file2.raw, this.file2.raw.name)
        }
        if (this.loading) {
          return false
        } else {
          this.loading = true
        }

        this.postWorkUpdata(formData).then(response => {
          this.loading = false
          if (response.code === '200' || response.code === 200) {
            this.$message.success('作品已修改')
            this.$router.push({
              name: 'userControl', // 跳转的页面
            })
          } else {
            this.$message.error(response.message)
          }
        })
      },
      // 删除
      deleteFile1() {
        this.file1 = ''
        this.vectorTip = '上传矢量图'
      },
      deleteFile2() {
        this.file2 = ''
        this.imageUrl = ''
      },
      // 获取作品信息
      getWork(param) {
        return postFun('/trade-web/api/works/selectByWorksId', param)
      },
      // 获取赛事名称
      getCompetitionList(param) {
        return getFun('/trade-web/api/competition/list', param)
      },
      // 获取奖项
      getPrize(param) {
        return postFun('/trade-web/api/prize/listByCompetitionId', param)
      },
      // 获取筛选列表
      getDict(param) {
        return getFun('/trade-web/api/dict', param)
      },
      // 上传作品
      postWork(param) {
        return postFile('/trade-web/api/works/upload', param)
      },
      // 修改作品
      postWorkUpdata(param) {
        return postFile('/trade-web/api/works/update', param)
      }
    }
  }
</script>
<style lang="scss">
  .trade-upload {
    font-family: "SourceHanSansCN-Regular", "Microsoft YaHei", sans-serif;

    .el-form-item__label {
      font-size: 16px;
      text-align: left;
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
          background: #F9F9F9;
          border: 1px solid #E5E5E5;
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
        background: #F9F9F9;
        border: 1px solid #E5E5E5;
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
          background: #FFFFFF;
          border: 1px solid #E5E5E5;

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
            line-height: 20px;
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
            color: #BBBBBB;
          }
        }
      }
    }

    .upload-delete-btn {
      width: 84px;
      height: 32px;
      border: 1px solid #00B3F5;
      border-radius: 3px;
      background-color: transparent;
      font-size: 14px;
      padding: 0;
      font-weight: 400;
      color: #00B3F5;
    }
    .upload-delete-btn:hover {
      background-color: #00B3F5;
      color: #ffffff;
    }

    .btn-confirm {
      width: 132px;
      height: 46px;
      background: #FF0000;
      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      padding: 0;

    }
    .btn-cancel {
      width: 132px;
      height: 46px;
      background: #D1D1D1;
      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      padding: 0;
    }
  }
</style>