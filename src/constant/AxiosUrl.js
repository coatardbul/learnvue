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
        forceRefreshDay: label.stock + '/stockMinuteStatic/forceRefreshDay',
        supplementRefreshDay: label.stock + '/stockMinuteStatic/supplementRefreshDay',
        refreshDayRange: label.stock + '/stockMinuteStatic/refreshDayRange',
        getDayDetail: label.stock + '/stockMinuteStatic/getDayDetail',
        getDayStatic: label.stock + '/stockMinuteStatic/getDayStatic',
        filterDate:label.stock + '/stockMinuteStatic/filterDate',
        quickRefreshDay:label.stock + '/stockMinuteStatic/quickRefreshDay',
        quickSaveRedisData:label.stock + '/stockMinuteStatic/quickSaveRedisData',

    },
    stockDayStatic: {
        refreshDay: label.stock + '/stockQuery/refreshDay',
        deleteDay:label.stock + '/stockQuery/deleteDay',
        refreshDayRange: label.stock + '/stockQuery/refreshDayRange',
        forceRefreshDayRange: label.stock + '/stockQuery/forceRefreshDayRange',
        getDayDetail: label.stock + '/stockQuery/getDayDetail',
        getDayStatic: label.stock + '/stockQuery/getDayStatic',
        getRangeStatic:label.stock + '/stockQuery/getRangeStatic',
    },
    themeStatic: {
        refreshDay: label.stock + '/themeStatic/refreshDay',
        deleteDay:label.stock + '/themeStatic/deleteDay',
        refreshDayRange: label.stock + '/themeStatic/refreshDayRange',
        forceRefreshDayRange: label.stock + '/themeStatic/forceRefreshDayRange',
        getDayDetail: label.stock + '/themeStatic/getDayDetail',
        getDayStatic: label.stock + '/themeStatic/getDayStatic',
        getRangeStatic:label.stock + '/themeStatic/getRangeStatic',
    },
    scatterStatic:{
        refreshDay: label.stock + '/scatter/refreshDay',
        deleteDay:label.stock + '/scatter/deleteDay',
        refreshDayRange: label.stock + '/scatter/refreshDayRange',
        forceRefreshDayRange: label.stock + '/scatter/forceRefreshDayRange',
        getRangeStatic:label.stock + '/scatter/getRangeStatic',
    },
    stockWatch: {
        findAll: label.stock +'/stockStrategyWatch/findAll',
        add:label.stock +'/stockStrategyWatch/add',
        modify:label.stock +'/stockStrategyWatch/modify',
        delete:label.stock +'/stockStrategyWatch/delete',
        hisSimulate:label.stock +'/stockStrategyWatch/hisSimulate',
    },
    stockOptionalPool: {
        findAll: label.stock +'/stockOptionalPool/findAll',
        add:label.stock +'/stockOptionalPool/add',
        addPlateStock:label.stock +'/stockOptionalPool/addPlateStock',
        modify:label.stock +'/stockOptionalPool/modify',
        delete:label.stock +'/stockOptionalPool/delete',

    },
    stockOptionalPlate: {
        findAll: label.stock +'/stockOptionalPlate/findAll',
        add:label.stock +'/stockOptionalPlate/add',
        modify:label.stock +'/stockOptionalPlate/modify',
        delete:label.stock +'/stockOptionalPlate/delete',
    },
    stockWarnLog: {
        findAll: label.stock +'/stockWarnLog/findAll',
        delete: label.stock +'/stockWarnLog/delete',
    },
    stockQuery:{
        strategy:label.stock + '/stockQuery/strategy',
        getStatic:label.stock + '/stockQuery/getStatic',
        saveDate:label.stock + '/stockQuery/saveDate',
        getAllStatic:label.stock + '/stockQuery/getAllStatic',
    },
    stockFilter:{
        save:label.stock + '/stockFilter/save',
        delete:label.stock + '/stockFilter/delete',
        modify:label.stock + '/stockFilter/modify',
        getFilterInfo:label.stock + '/stockFilter/getFilterInfo',
        getDirectFilterInfo:label.stock + '/stockFilter/getDirectFilterInfo',
    },
    stockPredict:{
        execute:label.stock + '/stockPredict/execute',
        getAll:label.stock + '/stockPredict/getAll',
        deleteById:label.stock + '/stockPredict/deleteById',
    },
    stockValPrice:{
        execute:label.stock + '/stockValPrice/execute',
        getDescribe:label.stock + '/stockValPrice/getDescribe',
        delete:label.stock + '/stockValPrice/delete',
        getAll:label.stock + '/stockValPrice/getAll',
    },
    specialStrategy:{
        getUpLimitInfo:label.stock + '/specialStrategy/getUpLimitInfo',
        getUpLimitTheme:label.stock + '/specialStrategy/getUpLimitTheme',
    },
    stockAnomalousBehavior:{
        buildLastUpLimitInfo:label.stock + '/stockAnomalousBehavior/buildLastUpLimitInfo',
        forceBuildLastUpLimitInfo:label.stock + '/stockAnomalousBehavior/forceBuildLastUpLimitInfo',
        getAllAnomalousBehaviorData:label.stock + '/stockAnomalousBehavior/getAllAnomalousBehaviorData',
        deleteAnomalousBehaviorData:label.stock + '/stockAnomalousBehavior/deleteAnomalousBehaviorData',
        getAbStatic:label.stock + '/stockAnomalousBehavior/getAbStatic',

    },
    cookie:{
        simpleModify:label.stock + '/cookie/simpleModify',
    },
    ip:{
        getAllIps:label.stock + '/ip/getAllIps',
    }
}
const river = {
    user:{
        login: 'river/user/login',
        getUserInfo: 'river/user/getUserInfo',
    },
    menu: {
        getAllMenu: 'river/menu/getAllMenu',
        getAllMenuByUser: 'river/menu/getAllMenuByUser',

        editMenu: 'river/menu/modify',
        addMenu: 'river/menu/add',
        delete: 'river/menu/delete'
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
        getDate:label.river+'/api/calendar/getDate',
    }


}
export default {
    stock, river, label
}
