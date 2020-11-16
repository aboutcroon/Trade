/*
 * @Author: Sroxck 
 * @Date: 2020-11-14 10:47:56 
 * @Last Modified by: Sroxck
 * @Last Modified time: 2020-11-14 16:48:29
 */
import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import Pagination from '@/components/Pagination' /* 分页 */
import ExportBtn from '@/components/ExportBtn' /* 导出 */ 
export default {
  name: 'Selection', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    ExportBtn
  },
  data() {
    return {
      form:{}, // 评奖用的对象,储存评奖选择的奖励类型,功能暂未开通
      gamesList:[], // 大赛名称数组
      tableData:[], // 表格数组
      formData: { // 筛选项
        paras: {
          competitionName: '',
          referenceName:''
        },
        pageSize: 10,
        pageNumber: 1,
        totalRow: -1
      },
      loading:false,
      dialogFormVisible: false, // 评奖dialog
    }
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.gamesNameList()
      this.getList()
    },
    async getList() {
      this.loading = true
      for (const key in this.formData.paras) { 
        if (this.formData.paras[key] == '')  this.formData.paras[key] = null
      }
      try {
        const { data } = await this.getTableList()
        this.tableData = data.list
        this.formData.totalRow = data.totalRow
        this.loading = false
      } catch (error) {
        this.$message.error('查询列表失败,数据为空')
        this.loading = false
      }
    },
    async gamesNameList(){
      const { data } = await this.getGamesList()
      this.gamesList = data
      this.formData.paras.competitionName = data[0].competitionName // 默认选择第一个大赛,产品要求!
    },
    open(val){
      switch (val) {
        case '0': val = '一等奖'
        break;
        case '1': val = '二等奖'
        break;
        case '2': val = '三等奖'
        break;
        default: val = '奖项为空'
        break;
      }
      this.$confirm(`您评定${val}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '确认奖项成功!(假)'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    reset() {
      for (const key in this.formData.paras) { this.formData.paras[key] = ''}
      this.getList()
    },
    /************************ 接口区域 *****************************/
    
    /** 表格数据接口 */
    getTableList(){
      return postFun('/trade-admin/api/judge/group/list', this.formData)
    },
    /** 大赛名称接口 */
    getGamesList(){
      return getFun('/trade-admin/api/competition/list')
    },
  }
}
