import { getList, postFun, postHeaderFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { getToken } from '@/utils/auth' /* 获取 Token */
import { v4 as uuidv4 } from 'uuid' /* 获取 UUID */
import Bus from '@/utils/refreshBus' /* 根据提示刷新页面 */
import { setWebSocke, Heartbeat } from '@/api/webSocke'  /* 建立 WebSocke 链接 */
import { statusList, nodeType, statusList1 } from '@/utils/selectData' /* select数据*/
import Pagination from '@/components/Pagination' // 分页
import { startTime } from '@/components/dateTime/dateTime'
import InputNmb from '@/components/InputNumber' // 定时刷新
import collapseTransition from '@/components/collapse'// 筛选
export default {
  name: 'systemMenu', // 返回页面之后input值不消失，与routes下index.js中name一致
  components: {
    Pagination,
    InputNmb,
    collapseTransition
  },
  filters: {
    /* 等级*/
    severity(status) {
      var statusMap = status == '0' ? 'danger' : 'success'
      return statusMap
    },
    /* 节点状态*/
    statusList1Fun(value) {
      var type = ''
      statusList1().forEach(c => {
        if (value == c.value) {
          type = c.label
        }
      })
      return type
    },
    /* 获取存证用户跳转抽屉中类型标题的竖线颜色 */
    lineBgColor (value) {
      let color = value ? value : 0
      if(value === 0) {
        color = 'gray'
      } else if(value === 1) {
        color = 'yellow'
      } else if(value === 2) {
        color = 'red'
      }else if(value === 5) {
        color = 'green'
      }
      return color
    }
  },
  data () {
    return {
      goEvidenceLoading: false, // 跳至存证的确定按钮loading
      evidenceFormLoading: false, // 新增存证用户表单loading
      evidenceLinkLoading: false, // 跳转存证表单loading
      depositCardJump: false, // 存证跳转链接开关
      evidenceUserList: [], // 存证用户列表
      evidenceUserId: null, // 当前被选取存证用户id
      nodeUrl: null, // 当前跳转链接的节点url
      nodeId: null, // 当前添加用户的节点id
      evidenceUserInterface: false, // 添加存证用户界面开关
      evidenceFormData: {
        username: null,
        password: null,
        userType: null
      }, // 添加存证用户信息
      depositUserType: [
        {
          key: 1,
          value: '共识用户'
        },
        {
          key: 2,
          value: '成员节点一级用户'
        },
        {
          key: 4,
          value: '成员节点三级用户'
        },
        {
          key: 5,
          value: '共识&成员用户'
        }
      ],
      addToken: null,
      websocket: null,
      loading: false,
      upLoading: false,
      createdLoading: false,
      list: [],
      formData: {
        UUID: '',
        paras: {
          nodeIp: '', // 链节点的 IP
          nodeType: '', // 任务类型
          nodeName: '', // 节点名称
          chainName: '', // 节点所在链名称
          chainId: '',
          status: '', // 节点状态
          isLeader: ''
        },
        pageNumber: 1,
        pageSize: 10,
        totalRow: -1
      },
      // 共识节点
      peerData: {
        chainId: '',	// 链id-必填
        peerNodeList: [],
        deployTask: {
          name: '' // 任务名称
        },
      },
      // 成员节点
      compData: {
        chainId: '',	// 链id-必填
        compNodeList: [],
        deployTask: {
          name: '' // 任务名称
        },
      },
      /* 状态 */
      // statusList: statusList(),
      statusList1: statusList1(),
      nodeType: nodeType(),
      listLoading: false,
      /** 接口隐藏显示 */
      dialogVisible: false,
      dialogType: 'new',
      /** 接口数据 */
      role: {
        chainId: '',
        nodeList: {
          nodeIp: '', // 节点Ip
          nodeName: '', // 节点名称
          currentNodeHash: '' // 同机构共识节点hash
        },
        deployTask: {
          name: '' // 任务名称
        },
      },
      node: {
        peer: {
          nodeIp: '',
          nodeRpcPort: ''
        },
        comp: {
          nodeIp: '',
          nodePort: ''
        }
      },
      /*时间验证*/
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = this.formData.paras.endTime
          if (beginDateVal) {
            return time.getTime() > new Date(beginDateVal).getTime()
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          const beginDateVal = this.formData.paras.startTime
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime()
          }
        }
      },
      /** 验证 */
      rules: {
        chainId: [
          { required: true, message: '请输入链ID', trigger: '' }
        ],
        'nodeList.nodeIp': [
          { required: true, message: '请输入节点IP', trigger: 'change' }
        ],
        'nodeList.nodeName': [
          { required: true, message: '请输入节点名称', trigger: 'change' }
        ],
        'deployTask.name': [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        'nodeList.currentNodeHash': [
          { required: false, message: '请输入共识节点哈希', trigger: 'blur' }
        ]
      },
      menuList: [],
      nodeIpList: [],
      chainIdList: [],
      chainlist: [],
      // disabled: false,
      a: true,
      time: 5000,
      collapseData: [],
      showFilter:false,
      peerNode:{
        peerNodeList:[],
        pageNumber: 1,
        pageSize: 10,
      }
    }
  },
  /* 进入页面就调用*/
  mounted () {
    this.resetPage()
  },
  // 在实例被创建之后被调用
  created() {
    this.createdWebSocke()
    this.getEvidenceType()
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    this.initData()
  },
  methods: {
    /* 初始化数据 */
    initData () {
      // this.setTimeout()
      this.chainGetList()
      this.list = []
      /** 传-1 后台计算总条数 */
      this.formData.totalRow = -1
      /** 分页默认从第一页开始 */
      this.formData.pageNumber = 1
      if (this.$route.query.chainId != '' && this.$route.query.chainId != null && this.$route.query.chainId != undefined) {
        this.formData.paras.chainId = this.$route.query.chainId
        // this.chainGetList();
      }
      this.dictDataFun()
      this.getList()
    },
    /* 接收通知，刷新当前页面数据 */
    resetPage () {
      Bus.$on('reset-node', (data) => {
        this.initData()
      })
    },
    /* 获取存证用户列表（根据类型分类） */
    getEvidenceUserTypeList (id, url) {
      this.clearSelectEvidenveUser()
      let type = this.getEvidenceDict({key: '跳转存证用户类型'})
      let user = this.getEvidenceUserList({ nodeId: id })
      Promise.all([type, user]).then((respones) => {
        this.evidenceUserList = this.filterEvidenceUserType(respones[0].data, respones[1].data)
        /* 存储当前node节点url */
        this.nodeUrl = url
        /* 关闭loading */
        this.evidenceLinkLoading = null
        /* 打开存证用户选取列表 */
        this.depositCardJump = true
      })

    },
    /* 根据用户类型处理存证用户列表的数据 */
    filterEvidenceUserType (typeList, userList) {
      let data = typeList
      data.forEach((type, index) => {
        data[index].list = []
        userList.forEach((user, i) => {
          if(type.key === user.userType){
            data[index].list.push(user)
          }
        })
      })
      return data
    },
    /* 点击存证链接 */
    clickEvidenceLink (node) {
      /* 获取节点中需要的信息 */
      let {nodeType, url, id, status} = node
      // 判断是否为启动状态 status === '4' || status === 4
      if (status === '4' || status === 4) {
        // 判断它的节点类型
        if (nodeType === '1' || nodeType === 1) {
          window.open(url)
        } else if (nodeType === '0' || nodeType === 0) {
          /* 打开链接的loading */
          this.evidenceLinkLoading = id
          /* 获取存证用户列表 */
          this.getEvidenceUserTypeList(id, url)
        }
      } else {
        alertMsg('error', '只能在启动状态下跳转')
      }
    },
    /* 跳转至存证链接 */
    goEvidenceLink () {
      if (this.evidenceUserId) {
        const url = this.nodeUrl
        const userId = this.evidenceUserId
        this.goEvidenceLoading = true
        this.getLinkToken({ id: userId }).then((response) => {
          const token = response.data.token
          window.open(url + '#/datas/status?beaas_token=' + token)
          /* 关闭存证用户选取列表 */
          this.depositCardJump = false
          this.goEvidenceLoading = false
        }).catch((e) => {
          this.goEvidenceLoading = false
        })
      } else {
        alertMsg('error', '请选择一个用户')
      }

    },
    /* 点击添加用户 */
    clickAddButton (id) {
      this.evidenceUserInterface = true
      this.evidenceFormLoading = true
      this.nodeId = id
      /* 将之前选择的存证用户id清空 */
      this.evidenceUserId = null
      this.getEvidenceUserList({ nodeId: id }).then((response) => {
        this.evidenceUserList = response.data
        this.evidenceFormLoading = false
      })
    },
    /* 保存添加的存证用户 */
    saveEvidenceUser () {
      let form = this.evidenceFormData
      if (
        this.evidenceUserId
        && form
        && form.username
        && form.password
        && form.userType
      ) {
        const parame = {
          nodeId: this.nodeId,
          id: this.evidenceUserId,
          user: this.evidenceFormData
        }
        this.addEvidenceUser(parame).then((response) => {
          if(response.code === '200' || response.code === 200) {
            this.closeEvidenceAddUser()
            this.$message.success('添加成功')
          }
        })
      } else {
        if (!this.evidenceUserId) {
          alertMsg('error', '请选择创建人')
        } else if (!form.username) {
          alertMsg('error', '请输入用户名称')
        } else if (!form.password) {
          alertMsg('error', '请输入用户密码')
        } else if (!form.userType) {
          alertMsg('error', '请选择用户类型')
        }
      }
    },
    /* 关闭添加存证界面回调函数 */
    closeEvidenceAddUser () { },
    /* 关闭添加存证界面 */
    offEvidenceUserAdd () {
      this.evidenceUserInterface = false
      this.clearEvidenceForm()
      /* 清除表单验证 */
      this.$refs.form.clearValidate()
    },
    /* 关闭存证用户选择列表 */
    closeEvidenceUserList () {
      this.depositCardJump = false
      this.clearSelectEvidenveUser()
    },
    /* 清除「选择跳转用户」列表 */
    clearSelectEvidenveUser () {
      this.evidenceUserId = null
      this.evidenceUserList = []
      this.nodeUrl = null
    },
    /* 清除「新增存证用户」表单数据 */
    clearEvidenceForm () {
      this.evidenceFormData = {
        username: null,
        password: null,
        userType: null
      }
    },
    /* 获取存证用户类型 */
    getEvidenceType () {
      let parame = {key: '存证用户类型'}
      this.getEvidenceDict(parame).then((response) => {
        this.depositUserType = response.data
      })
    },
    /* 获取字典类型 */
    getEvidenceDict (parame) {
      return getFun('/baas-admin/api/dict', parame)
    },
    /* 添加存证用户 */
    addEvidenceUser (parame) {
      return postFun('/baas-admin/api/czweb/user/add', parame)
    },
    /* 获取链接的 Token */
    getLinkToken (parame) {
      return postFun('/baas-admin/api/token/get', parame)
    },
    /* 获取存证用户列表 */
    getEvidenceUserList (parame) {
      return postFun('/baas-admin/api/czweb/user/select/list', parame)
    },
    /* 获取节点状态的类型列表 */
    dictDataFun() {
      this.collapseData = [
        {
          resData: { nodeType: nodeType() },
          typeTitle: '节点类型'
        }
      ]
      /** 部署任务状态 */
      this.dictFun({ key:'节点状态'}).then(res => {
        if (res.code == '200') {
          this.typeList = res.data
          this.collapseData.push({
            resData: { status: res.data },
            typeTitle: '节点状态'
          })
        }
      })
    },
    // setTimeout() {
    //   setInterval(() => {
    //     this.getList()
    //   }, this.time)
    // },
    // stopTimeout() {
    //   clearInterval(this.setTimeout())
    // },
    /** 链表格 */
    chainGetList() {
      this.createdLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      getList('/baas-admin/api/union/supchainalllist', {
        chainId: this.$route.query.chainId
      }).then(response => {
        if (response.code == 200) {
          this.chainlist = response.data
          this.createdLoading = false
        }
      })
    },
    /** 表格 */
    getList(total) {
      this.createdLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      getList('/baas-admin/api/node/nodelist', {
        paras: this.util.nullValueFun(this.formData.paras),
        pageNumber: this.formData.pageNumber,
        pageSize: this.formData.pageSize,
        totalRow: total == undefined ? this.formData.totalRow : total
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data.list
          this.listLoading = false
          this.createdLoading = false
          this.formData.totalRow = res.data.totalRow
          this.show = this.list.some(function (item) {
            if (item.isLeader === true && item.status == 4) {
              return true
            } else {
              return false
            }
          })
        } else {
          this.createdLoading = false
        }
      }).catch(res => {
        this.createdLoading = false
      })
    },
    /**监管节点 */
    nodelistFun(){
      getList('/baas-admin/api/node/supnodelist', {
        chainId: this.$route.query.chainId
      }).then(res => {
        if (res.code == 200) {
          this.peerNode.peerNodeList = res.data
        } else {
          this.createdLoading = false
        }
      }).catch(res => {
        this.createdLoading = false
      })
    },
    /**滚动select获取更多数据 */
    // load(){
    //   this.peerNode.pageNumber++
    //   this.nodelistFun();
    // },
    // IP
    allList() {
      postFun('/baas-admin/api/network/alllist', { hostStates: 1 }).then(res => {
        if (res.code == 200) {
          this.nodeIpList = res.data
        }
      })
    },
    addShow() {
      this.dialogVisible = true
      this.dialogType = 'alternative'
      this.allList()
      this.supchainalllist()
      this.nodelistFun()
    },
    //  创建监管节点
    // alternative(row) {
    //   this.dialogVisible = true
    //   this.dialogType = 'alternative'
    //   this.allList()
    //   this.supchainalllist()
    //   this.peerData.deployTask.name = this.role.name = row.name
    //   this.peerData.chainId = this.role.chainId = row.chainId
    //   this.peerData.peerNodeList.nodeIp = this.role.nodeIp = row.nodeIp
    //   this.peerData.peerNodeList.nodeName = this.role.nodeName = row.nodeName
    // },
    // 创建计算节点
    // createLetter() {
    //   this.dialogVisible = true
    //   this.allList()
    //   this.supchainalllist()
    //   this.dialogType = 'createLetter'
    // },
    // chainId
    supchainalllist() {
      postFun('/baas-admin/api/union/supchainalllist', {}).then(res => {
        if (res.code == 200) {
          this.chainIdList = res.data
          if (this.$route.query.chainId != '' && this.$route.query.chainId != null && this.$route.query.chainId != undefined) {
            this.role.chainId = Number(this.$route.query.chainId)
          }
        }
      })
    },
    /** 菜单名称 */
    menuListFun() {
      getList('/baas-admin/api/menu/listjson', { 'menuId': 0 }).then(response => {
        if (response.code == 200) {
          this.menuList = response.data
        }
      })
    },

    /** 添加计算节点 */
    addFun() {
      this.compData.compNodeList = []
      this.compData.compNodeList.push(this.util.nullValueFun(this.role.nodeList))
      this.compData.chainId = this.role.chainId
      this.compData.deployTask = this.role.deployTask
      let headers = {
        UUID: this.formData.UUID
      }
      this.$refs['createLetter'].validate((valid) => {
        if (valid) {
          this.createdLoading = true
          postHeaderFun('/baas-admin/api/v2/deploy/comp', this.compData, headers).then(response => {
            if (response.code == 200) {
              alertMsg('success', response.message)
              this.createdLoading = false
              this.handleClose()
              /** 传-1 后台计算总条数 */
              this.formData.totalRow = -1
              this.getList()
            } else {
              this.createdLoading = false
            }
          }).catch(res => {
            this.createdLoading = false
          })
        }
      })
    },
    /** 监管 */
    modifyFun() {
      this.peerData.peerNodeList = []
      this.peerData.peerNodeList.push(this.util.nullValueFun(this.role.nodeList))
      this.peerData.chainId = this.role.chainId
      this.peerData.deployTask = this.role.deployTask
      let uuid = this.formData.UUID
      let headers = {
        UUID: uuid
      }
      this.$refs['alternative'].validate((valid) => {
        if (valid) {
          this.createdLoading = true
          postHeaderFun('/baas-admin/api/v2/deploy/peer', this.peerData, headers).then(response => {
            if (response.code == 200) {

              this.createdLoading = false
              alertMsg('success', response.message)
              this.handleClose()
              /** 传-1 后台计算总条数 */
              this.formData.totalRow = -1
              this.getList()
            } else {
              this.createdLoading = false
            }
          }).catch(res => {
            this.createdLoading = false
          })
        }
      })
    },
    /** 关联菜单点击 */
    handleCheckChange() {
      this.role.menuIdList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      return this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
    },
    /** 关闭弹框 */
    handleClose() {
      this.dialogVisible = false
      /** 恢复初始化数据 */
      this.role = this.$options.data().role
      this.$nextTick(() => {
        this.$refs['alternative'].clearValidate()
        this.$refs['createLetter'].clearValidate()
      })
    },
    /** 切换tab */
    handleClick(tab, event) {
      this.$refs['alternative'].clearValidate()
      this.$refs['createLetter'].clearValidate()
    },
    startFun(row) {
      this.upLoading = true
      let headers = {
        UUID: this.formData.UUID
      }
      if (row.nodeType == 0) {
        // this.disabled = true
        this.node.comp.nodeIp = row.nodeIp
        this.node.comp.nodePort = row.nodePort
        this.compData.compNodeList.push(this.node.comp)
        postHeaderFun('/baas-admin/api/v2/start/comp', {
          compNodeList: [
            {
              nodeIp: row.nodeIp,
              nodePort: row.nodePort,
              id: row.id
            }
          ]
        }, headers).then(res => {
          if (res.code == 200) {
            // this.disabled = false
            // alertMsg('success', '请求成功')
            this.compData.compNodeList = []
            this.getList()
          }
        })
      } else {
        // this.disabled = true
        this.node.peer.nodeIp = row.nodeIp
        this.node.peer.nodeRpcPort = row.nodeRpcPort
        if (row.isLeader == true) {
          postHeaderFun('/baas-admin/api/v2/start/leader', {
            leaderNode: {
              nodeIp: row.nodeIp,
              nodeRpcPort: row.nodeRpcPort,
              id: row.id
            }
          }, headers).then(res => {
            if (res.code == 200) {
              // alertMsg('success', '请求成功')
              // this.disabled = false
              this.node.peer = {}
              this.getList()
              // if (res.data.list.status == 4) {
              this.status == true
              // }
            }
          })
        } else {
          // this.disabled = true
          this.peerData.peerNodeList.push(this.node.peer)
          postHeaderFun('/baas-admin/api/v2/start/peer', {
            peerNodeList: [
              {
                nodeIp: row.nodeIp,
                nodeRpcPort: row.nodeRpcPort,
                id: row.id
              }
            ]
          }, headers).then(res => {
            if (res.code == 200) {
              // alertMsg('success', '请求成功')
              // this.disabled = false
              this.peerData.peerNodeList = []
              this.getList()
            }
          })
        }
      }
    },
    /**筛选调用的方法 */
    collapseFun(type, value) {
      this.formData.paras[type] = value
      this.formData.totalRow = -1
      this.formData.pageNumber = 1
      this.getList()
    },
    createdWebSocke() {
      this.formData.UUID = uuidv4()
      const Authorization = getToken()
      const httpHead = 'ws://192.168.1.34:21080/baas-admin/ws/messageSocket?UUID='
      this.websocket = setWebSocke({
        http: httpHead + this.formData.UUID + "&Authorization=" + Authorization,
        open: this.webSockeOpen,
        message: this.webSockeMessage,
        error: this.webSockeError,
        close: this.webSockeClose
      })
    },
    webSockeOpen () {
      // 创建心跳
      let setBeat = new Heartbeat(this.websocket, this.createdWebSocke)
      setBeat.start()
    },
    webSockeMessage (message) {
      if (message.data === '刷新节点管理页面') {
        this.chainGetList()
        this.getList()
      } else if (message.data === '建立websocket链接成功') {} else {
        this.$message.error(message.data)
      }
    },
    webSockeError () {
      this.createdLoading = false
        //「报错」执行函数
        console.log(e)
    },
    webSockeClose () {},
    // 部署共识节点成功 执行
    deployNodeSuccess() {
      this.createdLoading = false
        //「成功」执行函数
        // this.$confirm(
        //   message.data+'，请前往部署详情查看, 是否前往?',
        //   '提示',
        //   {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   /** 部署详情 */
        //   this.$router.push({ name: 'unionMission' })
        // }).catch(() => {
        //   /** 区块链管理 */
        //   this.$router.push({ name: 'leagueChain' })
        // })
        // this.formData = this.$options.data().formData
    },
    offUpLoading(){
      this.upLoading = false
    }
  }
}
