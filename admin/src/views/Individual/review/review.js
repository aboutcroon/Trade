import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { stateList, menuFlag, hiddenList } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import collapseTransition from '@/components/collapse'// 筛选
import childMenu from '@/components/menu' // 导航
import Sortable from 'sortablejs'
import dragTreeTable from 'drag-tree-table'
export default {
  name: 'review', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    childMenu,
    collapseTransition,
    dragTreeTable
  },
  filters: {
    /* 等级*/
    severity(status) {
      var statusMap = null
      if(status == 0 ){
        statusMap = '未初筛'
      } else if( status == 1 ) {
        statusMap = '初筛通过'
      } else if( status == 2 ) {
        statusMap = '初筛驳回'
      } else if( status == 3 ) {
        statusMap = '未初审'
      } else if( status == 4 ) {
        statusMap = '初审通过'
      } else if( status == 5 ) {
        statusMap = '初审驳回'
      } else if( status == 6 ) {
        statusMap = '未复审'
      } else if( status == 7 ) {
        statusMap = '已评分'
      } else if( status == 8 ) {
        statusMap = '已获奖'
      }
      return statusMap
    }
  },
  data() {
    return {
      list:[],
      formData: {
        paras: {
          competitionName:'',//赛事名称	
          categoryName:'',//赛事类型	
          propertyName:'',//作品属性	
          prizeName:'',//奖项类型	
          prizeRateName:'',//所获奖项
          worksStatus:'',//作品状态 0-未初筛 1-初筛通过 2-初筛驳回 3-未初审 4-初审通过 5-初审驳回 6-未复审 7-已评分 8-已获奖
          judgeUserName:'',//评委用户名
          startTime:'',//上传开始时间	
          endTime:'',//上传结束时间	
          userName:'',//用户名
          worksStatusList:[6,7]
        },
        pageSize: 10,
        pageNumber: 1,
        totalRow: -1
      },
      competitionId:'',//当前大赛id
      // /* 奖项类型*/
      // stateList: [],
      // /* 赛事名称 */
      // ssList:[],
      /*作品属性 */
      zpsxList:[],
      /*作品类型 */
      zplxList:[],
      /* 普通用户 */
      userList:[],
      /*评委*/
      pwuserList:[],
      /*作品状态*/
      zpztList:[],
      /*所获奖项*/
      jxList:[],
      /*个人奖*/
      grList:[],
      /*人气奖*/
      rqList:[],
      // 大赛名称
      gamesList:[],
      listLoading: false,
      /** 选中的值 */
      selecData: '',
      /** 菜单隐藏显示 */
      dialogVisible: false,
      dialogType: 'new',
      /** 菜单类型 */
      menuFlagList: menuFlag(),
      hiddenList: hiddenList(),
      /** 菜单详情数据 */
      role: {
        competitionName:''
      },
      /** 验证 */
      rules: {
        competitionName: [{
          required: true,
          message: '请输入赛事名称',
          trigger: 'blur'
        }],
        menuFlag: [{
          required: true,
          message: '请选择菜单类型',
          trigger: 'change'
        }]
      },
      checkBoxData: [],
      loading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      /** 筛选数组 */
      showFilter: false,
      collapseData: [],
    }
  },
  /* 进入页面就调用*/
  mounted() {
    // this.getList()
  },
  // 在实例被创建之后被调用
  created() {
    /** 表格 */
    // this.getList();
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.initData()
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  methods: {
    /* 初始化数据 */
    async initData () {
      /** 传-1 后台计算总条数 */
      this.formData.totalRow = -1
      /** 分页默认从第一页开始 */
      this.formData.pageNumber = 1
      this.dictDataFun()
      this.gamesNameList()
    },
    /** 大赛名称接口 */
    async gamesNameList(){
      const { data } = await getFun('/trade-admin/api/competition/list')
      console.log(data,'大赛名称');
      this.gamesList = data
      this.formData.paras.competitionName = data[0].competitionName // 默认选择第一个大赛,产品要求!
      // this.competitionId = data[0].competitionId // 默认选择第一个大赛,产品要求!
      this.sl()
    },
    sl(e){
      console.log(e,'val');
      let obj = {};
      obj = this.gamesList.find((item)=>{//model就是上面的数据源
      return item.competitionName ===  this.formData.paras.competitionName;//筛选出匹配数据
    });
    console.log(obj,'obj');
    if (obj == undefined ) {
      this.competitionId == ''
    }else {
      this.competitionId = obj.competitionId
      console.log(this.competitionId,'this.competitionId');
    }
    this.getList()
    },
    /** 表格 */
    async getList() {
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      for (const key in this.formData.paras) { 
        if (this.formData.paras[key] == '')  this.formData.paras[key] = null
      }
      try {
        this.formData.totalRow = -1
        const { data } = await getList('/trade-admin/api/judge/pageList', this.formData)
          this.list = data.list
          this.formData.totalRow = data.totalRow;
          this.listLoading = false
          
      } catch (error) {
        // this.$message.error('查询列表失败,数据为空')
        this.loading = false
      }
    },
    /** 通过 */
    adoptFun(row) {
      console.log(row,'初筛通过');
      this.$confirm('复审确认，是否进入下一阶段？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postFun('/trade-admin/api/judge/operate',{
          worksStatus:'8',
          worksIdList:Array(row.worksId)
        }).then(res=>{
          alertMsg('success', res.message)
            /** 刷新表格 */
            this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确定'
        });          
      });
    },
    /* 批量通过 */
    successFun(){

    },
    goOpus(worksId,worksStatus,str) { // 跳转作品内页 
      this.$router.push({ path: "zuoPinNeiYe" });
      this.$store.commit('export/setWorksId',worksId)
      this.$store.commit('export/worksStatus',worksStatus)
      this.$store.commit('export/str',str)
    },
    /** 确认 */
    addShow() {
      this.$confirm('复审确认，是否进入下一阶段？？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          postFun('/trade-admin/api/judge/confirm',{
            worksStatus:'8',
            competitionId:this.competitionId
          }).then(res=>{
            alertMsg('success', res.message)
              /** 刷新表格 */
              this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确定'
        });          
      });
    },
    /* 驳回*/
    deleteFun(row) {
      /* 询问框*/
      this.$confirm('是否驳回此作品', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '驳回',
        cancelButtonText: '取消',
        confirmButtonClass: 'btndele',
        type: 'warning'
      }).then(() => {
        /* 删除*/
        postFun('/trade-admin/api/judge/operate',{
          worksStatus:'2',
          worksIdList:Array(row.worksId)
        }).then(res=>{
          alertMsg('success', res.message)
            /** 刷新表格 */
            this.getList()
        })
      }).catch(action => {
        return false
      })
    },
    /* 重置 */
    reset() {
      for (const key in this.formData.paras) { this.formData.paras[key] = ''}
      this.getList()
    },
    // 多选框选中的内容id
    changeFun(val) {
      this.checkBoxData = val.map(x => {
        return x.id
      })
      var a = val.map(x => {
        return Number(x.id)
      })
      this.a = a.includes(1)
    },
    menuListFun(item, index) {
      if (item.menuList) {
        item.menuList.forEach((c, index) => {
          this.updateOrderByMenuId.push({
            'menuId': c.menuId, // 菜单ID
            'orderNumber': index, // 排序号
            'parentMenuId': c.parentMenuId
          })
          this.menuListFun(c, index)
        })
      }
    },
    /** 筛选 */
    dictDataFun() {
      this.collapseData = []
      // /** 赛事名称 */
      // this.dictFun({ key: '赛事名称' }).then(res => {
      //   if (res.code == '200') {
      //     this.stateList = res.data
      //     this.collapseData.push({
      //       resData: { status: res.data },
      //       typeTitle: '赛事名称'
      //     })
      //   }
      // })
      // /** 奖项类型 */
      // this.dictFun({ key: '奖项类型' }).then(res => {
      //   if (res.code == '200') {
      //     this.stateList = res.data
      //     this.collapseData.push({
      //       resData: { status: res.data },
      //       typeTitle: '奖项类型'
      //     })
      //   }
      // })
      /** 作品属性 */
      this.dictFun({ key: '作品属性' }).then(res => {
        if (res.code == '200') {
          // console.log('this.typeList')
          console.log(this.zpsxList)
          this.zpsxList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '作品属性'
          })
        }
      })
      this.dictFun({ key: '作品类型' }).then(res => {
        if (res.code == '200') {
          // console.log('this.typeList')
          console.log(this.zplxList)
          this.zplxList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '作品类型'
          })
        }
      })
      this.dictFun({ key: '普通用户名' }).then(res => {
        if (res.code == '200') {
          // console.log('this.typeList')
          console.log(this.userList)
          this.userList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '普通用户名'
          })
        }
      })
      this.dictFun({ key: '评委用户名' }).then(res => {
        if (res.code == '200') {
          // console.log('this.typeList')
          console.log(this.pwuserList)
          this.pwuserList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '评委用户名'
          })
        }
      })
      this.dictFun({ key: '作品状态' }).then(res => {
        if (res.code == '200') {
          // console.log('this.zp')
          console.log(this.zpztList)
          this.zpztList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '作品状态'
          })
        }
      })
      this.dictFun({ key: '个人奖' }).then(res => {
        if (res.code == '200') {
          // console.log('this.zp')
          console.log(this.grList)
          this.grList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '个人奖'
          })
        }
      })
      this.dictFun({ key: '人气奖' }).then(res => {
        if (res.code == '200') {
          // console.log('this.zp')
          console.log(this.rqList)
          this.rqList = res.data
          this.collapseData.push({
            resData: { type: res.data },
            typeTitle: '人气奖'
          })
        }
      })
      // this.dictFun({ key: '' }).then(res => {
      //   if (res.code == '200') {
      //     // console.log('this.zp')
      //     console.log(this.jxList)
      //     this.jxList = res.data
      //     this.collapseData.push({
      //       resData: { type: res.data },
      //       typeTitle: '所获奖项'
      //     })
      //   }
      // })
    },
    /**筛选调用的方法 */
    collapseFun(type, value) {
      this.formData.paras[type] = value
      this.formData.totalRow = -1
      this.formData.pageNumber = 1
      this.getList()
    },
    

  }
}
