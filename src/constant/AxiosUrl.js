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
    }
}
const river = {
    menu: {
        getAllMenu: 'river/menu/getAllMenu',
        editMenu: 'river/menu/modify',
        addMenu: 'river/menu/add'
    },
    stockTemplate: {
        getList: 'river/api/stockTemplate/getList',
        addHot: 'river/api/stockTemplate/addHot'
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
