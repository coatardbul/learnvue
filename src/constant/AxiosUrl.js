const label = {
    stock: 'stock',
    river: 'river'
}


const stock = {
    label: 'stock',
    static: {
        getDateStatic: label.stock + '/stockQuery/getAllStatic'
    },
    staticTemplate: {
        findAll: label.stock + '/staticTemplate/findAll'
    },
    stockMinuteStatic: {
        refreshDay: label.stock + '/stockMinuteStatic/refreshDay',
        supplementRefreshDay: label.stock + '/stockMinuteStatic/supplementRefreshDay',
        refreshDayRange: label.stock + '/stockMinuteStatic/refreshDayRange',
        getDayDetail: label.stock + '/stockMinuteStatic/getDayDetail',
        getDayStatic: label.stock + '/stockMinuteStatic/getDayStatic',
        getRangeStatic:label.stock + '/stockMinuteStatic/getRangeStatic',
    },
    stockDayStatic: {
        refreshDay: label.stock + '/stockQuery/refreshDay',
        refreshDayRange: label.stock + '/stockQuery/refreshDayRange',
        forceRefreshDayRange: label.stock + '/stockQuery/forceRefreshDayRange',
        getDayDetail: label.stock + '/stockQuery/getDayDetail',
        getDayStatic: label.stock + '/stockQuery/getDayStatic',
        getRangeStatic:label.stock + '/stockQuery/getRangeStatic',
    },
    marketValueScatterStatic:{
        refreshDay: label.stock + '/scatter/refreshDay',
        refreshDayRange: label.stock + '/scatter/refreshDayRange',
        forceRefreshDayRange: label.stock + '/scatter/forceRefreshDayRange',
        getRangeStatic:label.stock + '/scatter/getRangeStatic',
    },
    callAuctionScatterStatic:{
        refreshDay: label.stock + '/scatter/upLimit/refreshDay',
        refreshDayRange: label.stock + '/scatter/upLimit/refreshDayRange',
        forceRefreshDayRange: label.stock + '/scatter/upLimit/forceRefreshDayRange',
        getRangeStatic:label.stock + '/scatter/upLimit/getRangeStatic',
    },
    stockWatch: {
        findAll: label.stock +'/stockStrategyWatch/findAll',
        add:label.stock +'/stockStrategyWatch/add',
        modify:label.stock +'/stockStrategyWatch/modify',
        delete:label.stock +'/stockStrategyWatch/delete',
    },
    stockOptionalPool: {
        findAll: label.stock +'/stockOptionalPool/findAll',
        add:label.stock +'/stockOptionalPool/add',
        modify:label.stock +'/stockOptionalPool/modify',
        delete:label.stock +'/stockOptionalPool/delete',
    },
    stockWarnLog: {
        findAll: label.stock +'/stockWarnLog/findAll',
    },
    stockQuery:{
        strategy:label.stock + '/stockQuery/strategy',
    },
}
const river = {

    menu: {
        getAllMenu: 'river/menu/getAllMenu',
        editMenu: 'river/menu/modify',
        addMenu: 'river/menu/add'
    },
    stockTemplate: {
        getQuery:'river/api/stockTemplate/getQuery',
        getList: 'river/api/stockTemplate/getList',
        add:'river/api/stockTemplate/add',
        modify:'river/api/stockTemplate/modify',
        addHot: 'river/api/stockTemplate/addHot',
        delete:'river/api/stockTemplate/delete',
    },
    intervalTime: {
        getIntervalStatic: 'river/timeInterval/getIntervalList',
        getTimeList: 'river/timeInterval/getTimeList',
        refresh: 'river/timeInterval/refresh',
    },
    calendar:{
        getSpecialDay:label.river+'/api/calendar/getSpecialDay',
        getSubtractDay:label.river+'/api/calendar/getSubtractDay',
    }


}
export default {
    stock, river, label
}
