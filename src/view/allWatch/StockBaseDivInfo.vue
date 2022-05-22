<template>
  <div :style="masterDivStyle">
    <div style="display: inline-block; width: 200px;margin: 0px 2px;">
      <p :style="pStyle">
        封单范围：{{ stockInfo.upLimitVolRange }}
      </p>
      <p :style="  pStyle">
        封单差值：{{ stockInfo.upLimitMixSubVolRange }}--{{ stockInfo.upLimitMaxSubVolRange }}
      </p>
      <p :style="pStyle">
        <span>昨日涨幅：</span>
        <span :style="getIncreaseRateColor(stockInfo.lastAuctionIncreaseRate)">{{
            forMatIncreaseRate(stockInfo.lastAuctionIncreaseRate)
          }}
        </span>
        <span>-></span>
        <span>涨停</span>
      </p>
      <p :style=" getOpenNumColor(stockInfo.upLimitOpenNum)">
        开板次数：{{ stockInfo.upLimitOpenNum }}
      </p>
      <el-tooltip
          trigger='hover'
          class="box-item"
          effect="dark"
          :content="getDescribe( stockInfo.upLimitDetail)"
          raw-content
          placement="top"
      >
        <span :style="  pColStyle">
          涨停详情
        </span>
      </el-tooltip>
      <span>----</span>
      <span @click="dialogFormVisible(stockInfo.codeUrl)" :style="  pColStyle">分时图</span>

    </div>
    <div style="display: inline-block; width: 230px; margin: 0px  2px;">
      <p :style="  pStyle">
        <span>股票名称：</span>
        <span>{{ stockInfo.name }}</span>
      </p>
      <p :style="getIncreaseRateCalcColor(stockInfo)">
        <span>涨幅：</span>
        <span :style="getIncreaseRateColor(stockInfo.auctionIncreaseRate)">{{
            forMatIncreaseRate(stockInfo.auctionIncreaseRate)
          }}
        </span>
        <span>-></span>
        <span :style="getIncreaseRateColor(stockInfo.newIncreaseRate)">{{
            forMatIncreaseRate(stockInfo.newIncreaseRate)
          }}
        </span>
        <span>=</span>
        <span :style="getIncreaseRateColor(stockInfo.subIncreaseRate)">{{
            forMatIncreaseRate(stockInfo.subIncreaseRate)
          }}
        </span>
      </p>
      <p :style="  pStyle">
        <span>金额：</span>
        <span>{{ forMatMoneyNum(stockInfo.auctionTradeAmount) }}</span>
        <span>--</span>
        <span>{{ forMatMoneyNum(stockInfo.tradeAmount) }}</span>
      </p>
      <p :style="  pStyle">
        <span>换手率：</span>
        <span>{{ forMatIncreaseRate(stockInfo.auctionTurnOverRate) }}</span>
        <span>--</span>
        <span>{{ forMatIncreaseRate(stockInfo.turnOverRate) }}</span>
      </p>
      <p :style="Object.assign( {color: '#ef0d05'},pStyle)">{{ stockInfo.dragonTiger }}</p>
    </div>
    <div style="display: inline-block; width: 130px; margin: 0px  1px;">
      <p :style="  pStyle">
        <span>代码：</span>
        <span>{{ stockInfo.code }}</span>
        <button style="color: #ec0a33;" size="mini" @click="close(stockInfo)">X</button>
      </p>
      <p :style="  pStyle">
        <span>市值：</span>
        <span>{{ forMatMoneyNum(stockInfo.marketValue) }}</span>
      </p>
      <p :style="  pStyle">
        <span>流通市值：</span>
        <span>{{ forMatMoneyNum(stockInfo.circulationMarketValue) }}</span>
      </p>
      <p :style="  pStyle">
        <span>换手率：</span>
        <span>{{ forMatIncreaseRate(stockInfo.turnOverRate) }}</span>
      </p>
      <p :style="  pStyle">
        <span>当前价格：</span>
        <span>{{ stockInfo.newPrice }}</span>
      </p>
    </div>
    <p :style="  pStyle">
      <el-row :gutter="20">
        <el-col :span="12">
          <span>所属题材：</span>
          <span style="color: #18bd18">{{ stockInfo.theme }}</span>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </p>
  </div>

</template>

<script>
import StockBaseInfo from "@/module/StockBaseInfo";
import StockInfoUtil from '@/constant/StockInfoUtil'
import {onMounted, ref} from "vue";

export default {
  name: "StockBaseInfo.vue",
  props: {
    stockInfo: {
      type: Object,
      default: function () {
        return new StockBaseInfo();
      }
    },
    styleInfo: {
      type: Object,
    }
  },

  setup(props, context) {

    const masterDivStyle = ref({display: 'inline-block', margin: '10px', backgroundColor: 'rgba(163,199,173,0.15)'})


    function dialogFormVisible(codeUrl){
      context.emit('dialog-form-visible',codeUrl)
    }
    const pStyle = ref({marginTop: '0px', marginBottom: '0px', lineWidth: '10px', fontSize: '14px'})
    const pColStyle = ref({color:'rgba(250,3,37,0.96)', marginTop: '0px', marginBottom: '0px', lineWidth: '5px', fontSize: '14px'})

    const pInlineStyle = ref({display: 'inline-block', width: '120px', margin: '0px  2px'})

    function getDescribe(propValue) {
      return '<span>' + (propValue.replaceAll('\n', '<br>')) + '</span>';

    }

    function close(stockInfo) {
      context.emit('close', stockInfo)
    }

    function getIncreaseRateColor(value) {
      return StockInfoUtil.increaseRateColor(value);
    }

    function getOpenNumColor(value){
      let tempStyle={};
      Object.assign(tempStyle,pStyle.value) ;
      return Object.assign(tempStyle,StockInfoUtil.openNumColor(value));

    }

    function getIncreaseRateCalcColor(value) {
      let calc = {marginTop: '0px', marginBottom: '0px', lineWidth: '10px', fontSize: '14px',};
      if (Number(value.newIncreaseRate) > 9) {
        return Object.assign(calc, {backgroundColor: '#e3b726'})
      } else if (Number(value.newIncreaseRate) > 8) {
        return Object.assign(calc, {backgroundColor: '#26e34c'})
      }
      return calc;
    }


    function forMatIncreaseRate(cellValue) {
      return StockInfoUtil.forMatIncreaseRate(cellValue);
    }

    function forMatMoneyNum(cellValue) {
      return StockInfoUtil.forMatMoneyNum(cellValue);
    }


    onMounted(() => {
      if (props.styleInfo.bigDiv && props.stockInfo.theme.indexOf(props.styleInfo.bigDiv) > -1) {
        masterDivStyle.value = Object.assign(masterDivStyle.value, {backgroundColor: '#ecce0a'})
      }
    })
    return {
      close,
      getIncreaseRateColor,
      getOpenNumColor,
      forMatIncreaseRate,
      forMatMoneyNum,
      masterDivStyle,
      getDescribe,
      pStyle,
      pColStyle,
      dialogFormVisible,
      pInlineStyle,
      getIncreaseRateCalcColor
    }
  }

}
</script>

<style scoped>

</style>
