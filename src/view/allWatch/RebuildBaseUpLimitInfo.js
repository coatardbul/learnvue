import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import {ref} from "vue";
import StockBaseInfoObject from "@/module/StockBaseInfo";

export default function (queryParam) {
     function getStockInfoArr(stockInfoArr) {
        if (!queryParam) {
            return
        }
         axios.post(AxiosUrl.stock.stockQuery.strategy, {
            riverStockTemplateId: queryParam.id,
            riverStockTemplateSign: queryParam.objectSign,
            dateStr: queryParam.dateStr,
            timeStr: isNowRequest() ? '' : '09:25',
        }).then((res) => {
            res.data.forEach(item => {
                let stockInfo = rebuildStockInfo(item);
                stockInfoArr.push(stockInfo);
            })
        })
    }


    function deleteStockInfo(stockInfoArr,item) {
        let findIndex = stockInfoArr.findIndex(stockInfo => stockInfo.code == item.code);
        stockInfoArr.splice(findIndex, 1)
    }


    function rebuildStockInfo(item) {
        let stockInfo = '';
        if (isNowRequest()) {
            stockInfo = rebuildNowStockInfo(item);
        } else {
            stockInfo = rebuildHisStockInfo(item);
        }
        return stockInfo;
    }

    /**
     * 默认为空按照历史处理
     * @returns {boolean}
     */
    function isNowRequest() {
        if (!queryParam.hisNowFlag) {
            return false;
        }
        if ('now' == queryParam.hisNowFlag) {
            return true;
        }
        if ('his' == queryParam.hisNowFlag) {
            return false;
        }
        return false;
    }


    function rebuildCommonStockInfo(stockDetailIndex, key, stockInfo, dateStr) {
        if (key == '封单范围') {
            stockInfo.upLimitVolRange = stockDetailIndex[key];
        }
        if (key == '首次封单差值') {
            stockInfo.upLimitMixSubVolRange = stockDetailIndex[key];
        }
        if (key == '有效封单差值') {
            stockInfo.upLimitMaxSubVolRange = stockDetailIndex[key];
        }
        if (key == '打开涨停次数') {
            stockInfo.upLimitOpenNum = stockDetailIndex[key];
        }
        if (key == '涨停强弱概览') {
            stockInfo.upLimitDetail = stockDetailIndex[key];
        }
        if (key == 'code') {
            stockInfo.code = stockDetailIndex[key];
        }
        if (key == '股票简称') {
            stockInfo.name = stockDetailIndex[key];
        }
        if (key.indexOf('竞价涨幅') > -1 && key.indexOf(dateStr) > -1
        ) {
            stockInfo.auctionIncreaseRate = stockDetailIndex[key];
        }
        //昨日竞价涨幅
        if (key.indexOf('竞价涨幅') > -1 && key.indexOf(dateStr) == -1
        ) {
            stockInfo.lastAuctionIncreaseRate = stockDetailIndex[key];
        }
        if (key.indexOf('竞价金额') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('{/}') < 0
        ) {
            stockInfo.auctionTradeAmount = stockDetailIndex[key];
        }
        if (key.indexOf('总市值') > -1 && key.indexOf(dateStr) > -1
        ) {
            stockInfo.marketValue = stockDetailIndex[key];
        }
        if (key.indexOf('涨停原因类别') > -1
        ) {
            stockInfo.theme = stockDetailIndex[key];
        }
        if (key.indexOf('市值') > -1 && key.indexOf('总') < 0
        ) {
            stockInfo.circulationMarketValue = stockDetailIndex[key];
        }
        if (key.indexOf('股票代码') > -1
        ) {
            let codeArr = stockDetailIndex[key].split('.');
            stockInfo.codeUrl = codeArr[1].toLowerCase() + codeArr[0];
        }

    }

    function rebuildNowStockInfo(stockDetailIndex) {
        let dateStr = queryParam.dateStr.replaceAll("-", "");
        let stockInfo = new StockBaseInfoObject();
        Object.keys(stockDetailIndex).forEach(key => {
            rebuildCommonStockInfo(stockDetailIndex, key, stockInfo, dateStr);

            if (key.indexOf('涨跌幅') > -1 && key.indexOf(dateStr) > -1
            ) {
                stockInfo.newIncreaseRate = stockDetailIndex[key];
            }
            if (key.indexOf('成交额') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('{/}') < 0
            ) {
                stockInfo.tradeAmount = stockDetailIndex[key];
            }
            if (key.indexOf('分时换手率') > -1 && key.indexOf(dateStr) > -1
            ) {
                stockInfo.auctionTurnOverRate = stockDetailIndex[key];
            }
            if (key.indexOf('换手率') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('分时') < 0
            ) {
                stockInfo.turnOverRate = stockDetailIndex[key];
            }
            if (key.indexOf('收盘价') > -1 && key.indexOf(dateStr) > -1
            ) {
                stockInfo.newPrice = stockDetailIndex[key];
            }

        });
        stockInfo.subIncreaseRate = stockInfo.newIncreaseRate - stockInfo.auctionIncreaseRate;
        return stockInfo;
    }


    function rebuildHisStockInfo(stockDetailIndex) {
        let dateStr = queryParam.dateStr.replaceAll("-", "");
        let stockInfo = new StockBaseInfoObject();
        Object.keys(stockDetailIndex).forEach(key => {
            rebuildCommonStockInfo(stockDetailIndex, key, stockInfo, dateStr);

            if (key.indexOf('分时涨跌幅') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('09:25') < 0
            ) {
                stockInfo.newIncreaseRate = stockDetailIndex[key];
            }
            if (key.indexOf('分时成交额') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('{/}') < 0
            ) {
                stockInfo.tradeAmount = stockDetailIndex[key];
            }
            if (key.indexOf('分时换手率') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('09:25') > 0
            ) {
                stockInfo.auctionTurnOverRate = stockDetailIndex[key];
            }
            if (key.indexOf('分时换手率') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('09:25') < 0
            ) {
                stockInfo.turnOverRate = stockDetailIndex[key];
            }
            if (key.indexOf('分时收盘价') > -1 && key.indexOf(dateStr) > -1
            ) {
                stockInfo.newPrice = stockDetailIndex[key];
            }

        });
        stockInfo.subIncreaseRate = stockInfo.newIncreaseRate - stockInfo.auctionIncreaseRate;
        return stockInfo;
    }


    return {
        getStockInfoArr,deleteStockInfo
    }
}
