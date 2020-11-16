import { getList, postFun, getFun } from '@/api/common' /*表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /*消息提示*/
import { stateList } from '@/utils/selectData' /*select数据*/
import Pagination from '@/components/Pagination' // 分页
export default {
	name: 'systemMenu', //返回页面之后input值不消失，与routes下index.js中name一致
	components: {
		Pagination,
	},
	filters: {
		/*等级*/
		severity(status) {
			var statusMap = status == "0" ? 'danger' : 'success'
			return statusMap
		}
	},
	data() {
		return {
			list: [],
			formData: {
				paras: {
					ifsId: '',
					ifsName: '',
					controllerMethod: '',
				},
				pageNumber: 1,
				pageSize: 10,
				totalRow: -1
			},
			/*状态*/
			stateList: stateList(),
			listLoading: false,
			/**接口隐藏显示 */
			dialogVisible: false,
			dialogType: 'new',
			/**接口数据 */
			role: {
				ifsName: '',
				controllerMethod: '',
				status: 1,
			},
			/**验证 */
			rules: {
				ifsName: [
					{ required: true, message: '请输入接口名称', trigger: 'blur' },
				],
				controllerMethod: [
					{ required: true, message: '请输入控制方法', trigger: 'blur' },
				],
				status: [
					{ required: true, message: '请选择接口状态', trigger: 'change' }
				]
			},
			menuList: [],
			loading: false
		}
	},
	/*进入页面就调用*/
	mounted() {

	},
	//在实例被创建之后被调用
	created() {
		/**表格 */
		//this.getList();
	},
	//被 keep-alive 缓存的组件激活时调用
	activated() {
		/**传-1 后台计算总条数 */
		this.formData.totalRow = -1
		/**分页默认从第一页开始 */
		this.formData.pageNumber = 1
		this.getList()
	},
	methods: {
		/**表格 */
		getList() {
			setTimeout(() => {
				this.listLoading = false;
			}, 3000)
			this.formData.paras = this.util.nullValueFun(this.formData.paras)
			getList('/trade-admin/api/interfaces/list', this.formData).then(response => {
				if (response.code == 200) {
					this.list = response.data.list;
					this.formData.totalRow = response.data.totalRow;
					this.listLoading = false;
				}
			})
		},
		/**菜单名称 */
		menuListFun() {
			getList('/trade-admin/api/menu/listjson', { 'menuId': 0 }).then(response => {
				if (response.code == 200) {
					this.menuList = response.data;
				}
			})
		},
		/**添加显示 */
		addShow() {
			this.dialogVisible = true;
			this.dialogType = 'new';
			/**菜单名称 */
			//this.menuListFun();
		},
		/**详情 */
		editFun(row) {
			this.dialogVisible = true;
			this.dialogType = 'edit';
			this.role.ifsId = row.ifsId;
			this.role.ifsName = row.ifsName;
			this.role.controllerMethod = row.controllerMethod;
			this.role.status = Number(row.status);
		},
		/**添加接口 */
		addFun() {
			this.$refs['role'].validate((valid) => {
				if (valid) {
					this.loading = true;
					postFun('/trade-admin/api/interfaces/add', this.role).then(response => {
						if (response.code == 200) {
							this.loading = false;
							alertMsg('success', response.message);
							this.handleClose();
							/**传-1 后台计算总条数 */
							this.formData.totalRow = -1
							this.getList();
						}
					}).catch(error => {
						this.loading = false;
					})
				}
			})
		},
		/**编辑接口 */
		modifyFun() {
			this.$refs['role'].validate((valid) => {
				if (valid) {
					this.loading = true;
					postFun('/trade-admin/api/interfaces/modify', this.role).then(response => {
						if (response.code == 200) {
							this.loading = false;
							alertMsg('success', response.message);
							this.handleClose();
							/**传-1 后台计算总条数 */
							this.formData.totalRow = -1
							this.getList();
						}
					}).catch(error => {
						this.loading = false;
					})
				}
			})
		},
		/*删除*/
		deleteFun(ifsId) {
			/*询问框*/
			this.$confirm('是否删除此接口', '确认信息', {
				distinguishCancelAndClose: true,
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				confirmButtonClass: 'btndele',
				type: 'warning'
			}).then(() => {
				/*删除*/
				postFun('/trade-admin/api/interfaces/delete', {
					'ifsId': ifsId
				}).then(response => {
					if (response.code == 200) {
						alertMsg('success', response.message);
						/**传-1 后台计算总条数 */
						this.formData.totalRow = -1
						/*刷新列表*/
						this.getList();
					}
				})
			}).catch(action => {
				return false
			});
		},
		/**关联菜单点击 */
		handleCheckChange() {
			this.role.menuIdList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
			return this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
		},
		/**关闭弹框 */
		handleClose() {
			this.dialogVisible = false;
			/**恢复初始化数据 */
			this.role = this.$options.data().role;
			this.$refs['role'].clearValidate()
		}
	}
}
