<template>
  <div class="contentBox baas-agent" id="networkRealTimeNode">
    <div style="background: #fff;width:100%">
      <el-row
        :gutter="40"
        class="widthHeight"
        style="margin:0 0 20px 0;padding-top:5px;"
      >
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="title-tool" style="margin-bottom: 20px;">
            <span class="title-h1">{{chainName}}</span>
            <div class="title-tool-right" >
              <span class="title-h3" style="vertical-align: top;margin-right: 15px;line-height: 42px;">实时数据:</span>
              <el-form ref="form" class="option" :model="formData" label-width="85px" :inline="true" style="display: inline-block">
                <el-form-item>
                  <el-switch
                    v-model="value1"
                    active-text="关闭"
                    inactive-text="开启"
                    active-color="#EFEFEF"
                    style="height: 42px;"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    type="datetime"
                    v-model="startTime"
                    size="large"
                    :clearable="false"
                    :editable="false"
                    @change="handleTime"
                    placeholder="选择开始时间"
                    :picker-options="startPickerOptions"
                    :default-time="['12:00:00']">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    type="datetime"
                    v-model="endTime"
                    size="large"
                    :clearable="false"
                    :editable="false"
                    @change="handleTime"
                    placeholder="选择结束时间"
                    :picker-options="endPickerOptions"
                    :default-time="['12:00:00']">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="all-net-total">
            <net-total
              v-for="i in 4"
              :key="i"
              :title="tableData[i - 1].name"
              description="截至当前时间"
              :several="tableData[i - 1].value + tableData[i - 1].after"
              :before-color="totalColorList[i - 1]"
            ></net-total>
          </div>
          <!--<el-table-->
            <!--:data="tableData"-->
            <!--:header-cell-style="{ background: '#F2F6FD' }"-->
            <!--stripe-->
          <!--&gt;-->
            <!--<el-table-column-->
              <!--v-for="(item, index) in tableRealTimeData"-->
              <!--:key="index"-->
              <!--prop="date"-->
              <!--:label="item.name"-->
              <!--width="60"-->
            <!--&gt;-->
              <!--<span>{{ item.value }}</span><span>{{ item.after }}</span>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        </el-col>
        <el-col :xs="18" :sm="18" :lg="18" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">内存使用率变化趋势（%）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="内存变化"
                beforeColor="#BF495A">

              </net-legend>
              <div style="float: right">
                <data-card
                  :data="usedMemory"
                  description="当前已使用内存"
                  style="margin-right: 52px;">
                </data-card>
                <data-card
                  :data="freeMemory"
                  description="剩余内存"
                  style="margin-right: 52px;">
                </data-card>
                <data-card
                  :data="totalMemory"
                  description="总内存"
                  style="margin-right: 40px;">
                </data-card>
              </div>
            </div>
            <trend-chart
              :LineData="chartDataList.memoryDataList"
              :xAxis="chartDataList.localTimeList"
              height="214px">

            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" style="margin-top: 25px">
          <div style="height: 310px; text-align: center">
            <gauge-chart
              :GaugeData="memoryScale"
              :GaugeColor="memoryGaugeColor"
              :height="gaugeHeight">
            </gauge-chart>
            <div class="title-h3" style="margin-top: 12px">{{needMoreMemory?'当前内存使用率偏高':'当前内存使用率正常'}}</div>
            <div class="title-h3" style="margin-top: 6px" v-show="needMoreMemory">请紧急扩容</div>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="18" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">CPU使用率变化趋势（%）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="CPU变化"
                beforeColor="#FAAD14"
                :showMessage="false"
                :message="warnMessage">

              </net-legend>
              <div style="float: right">
                <data-card
                  :data="nowCPU"
                  description="当前运行值"
                  style="margin-right: 52px;">
                </data-card>
                <data-card
                  :data="averageCPU"
                  description="平均运行值"
                  style="margin-right: 52px;">
                </data-card>
                <data-card
                  :data="maxCPU"
                  description="最高运行值"
                  style="margin-right: 40px;">
                </data-card>
              </div>
            </div>
            <trend-chart
              lineColor="rgba(250,173,20,1)"
              areaColor="rgba(250,173,20,0.2)"
              LineName="CPU使用率"
              :LineData="chartDataList.cpuDataList"
              :xAxis="chartDataList.localTimeList"
              height="214px">

            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" style="margin-top: 25px">
          <div style="height: 310px; text-align: center">
            <gauge-chart
              :GaugeData="nowCPU"
              :GaugeColor="cpuGaugeColor"
              :height="gaugeHeight">
            </gauge-chart>
            <div class="title-h3" style="margin-top: 12px">{{showCpuMessage?'当前CPU使用率偏高':'当前CPU使用率正常'}}</div>
            <div class="title-h3" style="margin-top: 6px" v-show="showCpuMessage">请紧急扩容</div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">根分区使用率变化趋势（%）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="根分区变化"
                beforeColor="#495ABF">

              </net-legend>
            </div>
            <trend-chart
              lineColor="rgba(73,90,191,1)"
              areaColor="rgba(73,90,191,0.2)"
              LineName="根分区使用率"
              :LineData="chartDataList.rootPartitionList"
              :xAxis="chartDataList.localTimeList"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">数据分区使用率变化趋势（%）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="数据分区变化"
                beforeColor="#495ABF">

              </net-legend>
            </div>
            <trend-chart
              lineColor="rgba(73,90,191,1)"
              areaColor="rgba(73,90,191,0.2)"
              LineName="数据分区使用率"
              :LineData="chartDataList.dataPartitionList"
              :xAxis="chartDataList.localTimeList"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">日志分区使用率变化趋势（%）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="日志分区变化"
                beforeColor="#495ABF">

              </net-legend>
            </div>
            <trend-chart
              lineColor="rgba(73,90,191,1)"
              areaColor="rgba(73,90,191,0.2)"
              LineName="日志分区使用率"
              :LineData="chartDataList.logPartitionList"
              :xAxis="chartDataList.localTimeList"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24" style="margin-top: 25px">
          <net-title
            :title="boyachainNetwork"
            before-color="#FAAD14"
          ></net-title>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" style="margin-top: 25px">
          <div style="height: 278px;">
            <div class="title-h2">链节点网卡接收流量（{{rxUnit}}）</div>
            <trend-chart
              lineColor="rgba(73,90,191,1)"
              areaColor="rgba(73,90,191,0.2)"
              LineName="接收流量"
              :LineData="chartDataList.rxRateList"
              :xAxis="chartDataList.localTimeList"
              :unit="rxUnit"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" style="margin-top: 25px">
          <div style="height: 278px;">
            <div class="title-h2">链节点网卡发送流量（{{txUnit}}）</div>
            <trend-chart
              LineName="发送流量"
              :LineData="chartDataList.txRateList"
              :xAxis="chartDataList.localTimeList"
              :unit="txUnit"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">共识节点数量变化趋势（个）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="共识节点数量"
                beforeColor="#21BF74">

              </net-legend>
            </div>
            <trend-chart
              lineColor="rgba(33,191,116,1)"
              areaColor="rgba(33,191,116,0.2)"
              LineName="共识节点数量"
              :LineData="chartDataList.peerDataList"
              :xAxis="chartDataList.localTimeList"
              unit="个"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" style="margin-top: 25px">
          <div style="height: 310px;">
            <div class="title-h2">成员节点变化趋势（个）</div>
            <div style="margin-top: 12px;">
              <net-legend
                title="成员节点数量"
                beforeColor="#21BF74">

              </net-legend>
            </div>
            <trend-chart
              lineColor="rgba(73,90,191,1)"
              areaColor="rgba(73,90,191,0.2)"
              LineName="成员节点数量"
              :LineData="chartDataList.compDataList"
              :xAxis="chartDataList.localTimeList"
              unit="个"
              height="214px">
            </trend-chart>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import realTimeNode from './realTimeNode.js'
  export default {
    ...realTimeNode
  }
</script>
<style lang="scss">
#networkRealTimeNode {
  .all-net-total {
    /*width: 200%;*/
    display: flex;
    justify-content: space-between;
    padding-bottom: 38px;
    margin: 0 -12px;
  }

  .title-tool {
    height: 63px;
    border-bottom: 1px solid #EFF1F4;

    .title-tool-right {
      float: right;
      width: auto;

      .option {
        display: inline-block;
        vertical-align: top;
        height: 42px;
      }

      .el-switch {
        .el-switch__core{
          background-color: #fff;

          &::after {
            background-color: #21BF74;
          }
        }
        .el-switch__label.is-active {
          color: #21BF74;
        }
      }
      .el-switch.is-checked {
        .el-switch__core{
          background-color: #fff;

          &::after {
            background-color: #fff;
          }
        }
      }
      .el-date-editor.el-input {
        width: 210px;
      }
    }
  }

  .title-h1 {
    font-size:18px;
    font-weight:400;
    color: #141C49;
    line-height:42px;
  }
  .title-h2 {
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(20,28,73,1);
    line-height:22px;
  }
  .title-h3 {
    font-size: 14px;
    font-weight: 700;
    color: #141C49;
    line-height: 20px;
  }
}

</style>
