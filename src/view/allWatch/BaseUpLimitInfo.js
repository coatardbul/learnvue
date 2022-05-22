import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import {ref} from "vue";
import StockBaseInfoObject from "@/module/StockBaseInfo";

export default function (queryRef, styleInfo, hisNowFlag, queryParam) {
    const stockInfoArr = ref([])
    const stockCodeMap = ref(new Map())
    const stockThemeMap = ref(new Map())
    const dragonTigerMap = ref(new Map())
    const dialogFormVisible = ref(false)
    const time = ref()
    const simHisTimeStr = ref('09:25')

    function getStockInfoArr() {
        if (!queryRef.value.queryParam) {
            return
        }
        stockInfoArr.value.length = 0
        dragonTigerMap.value = new Map()
        stockThemeMap.value = new Map()
        stockCodeMap.value = new Map()
        axios.post(AxiosUrl.stock.stockQuery.strategy, {
            riverStockTemplateId: queryRef.value.queryParam.id,
            riverStockTemplateSign: queryRef.value.queryParam.templateSign,
            dateStr: queryRef.value.queryParam.dateStr,
            timeStr:isNowRequest()?'':simHisTimeStr.value,
        }).then((res) => {
            res.data.forEach(item => {
                let stockInfo = rebuildStockInfo(item);
                stockInfoArr.value.push(stockInfo);
                addStockCodeMapAndThemeMap(stockInfo);
            })
        });
    }

    function clearStockCodeMapAndThemeMap() {
        stockCodeMap.value = new Map();
        stockThemeMap.value = new Map();

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
        if (!hisNowFlag) {
            return false;
        }
        if ('now' == hisNowFlag) {
            return true;
        }
        if ('his' == hisNowFlag) {
            return false;
        }
        return false;
    }


    function addStockCodeMapAndThemeMap(stockInfo) {
        stockCodeMap.value.set(stockInfo.code, stockInfo);
        if (stockInfo.theme.indexOf("+" > -1)) {
            let strings = stockInfo.theme.split("+");
            strings.forEach(themeTemp => {
                if (stockThemeMap.value.has(themeTemp)) {
                    stockThemeMap.value.set(themeTemp, stockThemeMap.value.get(themeTemp) + 1);
                } else {
                    stockThemeMap.value.set(themeTemp, 1);

                }
            })
        } else if (stockInfo.theme) {
            if (stockThemeMap.value.has(stockInfo.theme)) {
                stockThemeMap.value.set(stockInfo.theme, stockThemeMap.value.get(stockInfo.theme) + 1);
            } else {
                stockThemeMap.value.set(stockInfo.theme, 1);
            }
        }
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
        let dateStr = queryRef.value.queryParam.dateStr.replaceAll("-", "");
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
        let dateStr = queryRef.value.queryParam.dateStr.replaceAll("-", "");
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

    function getUpdateStockInfoArr() {
        if (stockInfoArr.value.length > 0) {
            simHisTimeStr.value = getValidAfterMinuterStr(simHisTimeStr.value, 1);
            axios.post(AxiosUrl.stock.stockQuery.strategy, {
                riverStockTemplateId: queryRef.value.queryParam.id,
                dateStr: queryRef.value.queryParam.dateStr,
                riverStockTemplateSign: queryRef.value.queryParam.templateSign,
                timeStr: isNowRequest() ? '' : simHisTimeStr.value,
            }).then((res) => {
                let allInfo = []
                res.data.forEach(item => {
                    let stockInfo = rebuildStockInfo(item);
                    allInfo.push(stockInfo);
                })
                let newInfo = []
                stockInfoArr.value.forEach(item => {
                    let find = allInfo.find(itemTemp => itemTemp.code == item.code);
                    if (find) {
                        let code = find.code;
                        if (dragonTigerMap.value.has(code)) {
                            find.dragonTiger = dragonTigerMap.value.get(code);
                        }
                        newInfo.push(find);
                    }
                })
                stockInfoArr.value.length = 0;
                stockInfoArr.value = newInfo;
            });
        }
        time.value = new Date().getTime();
    }

    function getValidAfterMinuterStr(timeStr, intervalMinuter) {
        let afterMinuterStr = getAfterMinuterStr(timeStr, intervalMinuter);
        let strings = afterMinuterStr.split(':');

        if (Number(strings[0]) < 11 || Number(strings[0]) == 13 || Number(strings[0]) == 14) {
            return afterMinuterStr;
        }
        if (Number(strings[0]) == 11) {
            if (Number(strings[1]) <= 30) {
                return afterMinuterStr;
            } else {
                return '13:00';
            }
        }
        if (Number(strings[0]) >= 15) {
            return '15:00';
        }
    }


    function getAfterMinuterStr(timeStr, intervalMinuter) {
        let timeArr = timeStr.split(':');
        if (Number(timeArr[1]) + Number(intervalMinuter) < 60) {
            if (Number(timeArr[1]) + Number(intervalMinuter) < 10) {
                return timeArr[0] + ':0' + (Number(timeArr[1]) + Number(intervalMinuter));
            } else {
                return timeArr[0] + ':' + (Number(timeArr[1]) + Number(intervalMinuter));
            }
        } else {
            return (Number(timeArr[0]) + 1) + ':' + '00';
        }
    }

    function deleteStockInfo(item) {
        let findIndex = stockInfoArr.value.findIndex(stockInfo => stockInfo.code == item.code);
        stockInfoArr.value.splice(findIndex, 1)
        let strings = item.theme.split("+");
        strings.forEach(themeTemp => {
            if (stockThemeMap.value.has(themeTemp)) {
                if (stockThemeMap.value.get(themeTemp) > 1) {
                    stockThemeMap.value.set(themeTemp, stockThemeMap.value.get(themeTemp) - 1);
                } else {
                    stockThemeMap.value.delete(themeTemp)
                }
            }
        })
        stockCodeMap.value.delete(item.code)
    }

    function deleteTheme(theme) {
        stockThemeMap.value.delete(theme)
        while (true) {
            let findIndex = stockInfoArr.value.findIndex(stockInfo => stockInfo.theme.indexOf(theme) > -1);
            if (findIndex > -1) {
                //根据主题找到股票信息，根据股票信息找到相关的主题删除
                deleteStockInfo(stockInfoArr.value[findIndex]);
            } else {
                break;
            }
        }

    }

    function sortAndRefresh(key) {
        sortKeyDesc(key);
        time.value = new Date().getMilliseconds();

    }

    function sortKeyDesc(key) {
        stockInfoArr.value = stockInfoArr.value.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            if(typeof (x)=='string'){
                if (x.indexOf("千万") > -1) {
                    x = a[key].split('千万')[0];
                    y = b[key].split('千万')[0];
                } else if (x.indexOf("万") > -1) {
                    x = a[key].split('万')[0];
                    y = b[key].split('万')[0];
                }
            }

            return ((Number(x) > Number(y)) ? -1 : (Number(x) < Number(y)) ? 1 : 0)
        })
    }

    function showTheme(key) {
        styleInfo.value.bigDiv = key;
        time.value = new Date().getTime();
    }

    function clickTheme(key) {
        styleInfo.value.bigDiv = key;
        let hasTheme = []
        let noHasTheme = []
        stockInfoArr.value.forEach(item => {
            if (item.theme.indexOf(key) > -1) {
                hasTheme.push(item);
            } else {
                noHasTheme.push(item);
            }
        })
        stockInfoArr.value.length = 0;
        hasTheme.forEach(item => {
            stockInfoArr.value.push(item);
        })
        noHasTheme.forEach(item => {
            stockInfoArr.value.push(item);
        })
        time.value = new Date().getTime();
    }


    /**
     * 适用于 历史，开盘的过滤
     * @param val
     */
    function filterCallAuctionStockInfo(val) {
        if (val) {
            axios.post(AxiosUrl.stock.stockFilter.getDirectFilterInfo, {
                templateSign: queryRef.value.queryParam.templateSign,
                date: queryRef.value.queryParam.dateStr,
            }).then((res) => {
                stockInfoArr.value = stockInfoArr.value.filter((item) => {
                    let findIndex = res.findIndex(stockInfo => stockInfo.stockCode == item.code);
                    if (findIndex < 0) {
                        return false;
                    } else {
                        return true;
                    }
                })
                clearStockCodeMapAndThemeMap();
                stockInfoArr.value.forEach(item => {
                    addStockCodeMapAndThemeMap(item);
                })
            });
        }
    }

    function increaseRateSort(val) {
        if (val) {
            sortAndRefresh('auctionIncreaseRate');
        }
        setTimeout(() => {
            queryParam.value.callAuctionIncreaseRateSortFlag = false;
        }, 3000);
    }

    function turnOverSort(val) {
        if (val) {
            sortAndRefresh('auctionTurnOverRate');
        }
        setTimeout(() => {
            queryParam.value.callAuctionTurnOverFlag = false;
        }, 3000);

    }

    function tradeAmountSort(val) {
        if (val) {
            sortAndRefresh('auctionTradeAmount');
        }
        setTimeout(() => {
            queryParam.value.callAuctionTradeAmountFlag = false;
        }, 3000);
    }

    function ergodic() {
        for (let i = 0; i < stockInfoArr.value.length; i++) {
            let code = stockInfoArr.value[i].code;
            if (dragonTigerMap.value.has(code)) {
                stockInfoArr.value[i].dragonTiger = dragonTigerMap.value.get(code);
            }
        }
    }

    /**
     * 五虎
     */
    function dragonTiger() {
        dragonTigerMap.value = new Map()
        //竞价涨幅
        sortAndRefresh('auctionIncreaseRate');
        setDragonTigerDescribeMap('涨幅');
        //换手率
        sortAndRefresh('auctionTurnOverRate');
        setDragonTigerDescribeMap('换手');
        //竞价金额
        sortAndRefresh('auctionTradeAmount');
        setDragonTigerDescribeMap('金额');
        ergodic();
        time.value = new Date().getTime();
    }

    function setDragonTigerDescribeMap(describe) {
        if (stockInfoArr.value.length > 0) {
            let maxLength = 0;
            if (stockInfoArr.value.length > 10) {
                maxLength = 10;
            } else {
                maxLength = stockInfoArr.value.length;
            }
            for (let i = 0; i < maxLength; i++) {
                let code = stockInfoArr.value[i].code;
                if (dragonTigerMap.value.has(code)) {
                    dragonTigerMap.value.set(code, dragonTigerMap.value.get(code) + '-' + describe + (i + 1));
                } else {
                    dragonTigerMap.value.set(code, describe + (i + 1));
                }
            }
        }

    }


    return {
        getStockInfoArr,
        getUpdateStockInfoArr,
        deleteStockInfo,
        deleteTheme,
        sortAndRefresh,
        showTheme,
        clickTheme,
        addStockCodeMapAndThemeMap,
        clearStockCodeMapAndThemeMap,
        filterCallAuctionStockInfo,
        increaseRateSort,
        turnOverSort,
        tradeAmountSort,
        dragonTiger,
        isNowRequest,
        stockInfoArr,
        dialogFormVisible,
        stockThemeMap,
        stockCodeMap,
        simHisTimeStr,
        dragonTigerMap,
        time,
    }
}
