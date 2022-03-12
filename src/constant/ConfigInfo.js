import moment from "moment";

const emotionInfo = {
    defaultMinuterObjectSign: 'minute_emotion_statistic',
    defaultDayObjectSign: 'day_up_dow_limit_statistic',

    defaultTimeInterval: 5
}
const DateFormat = {
    yyyymmddSplit: 'YYYY-MM-DD',
    hhmmSplit:'HH:mm',
    second:'ss',

}

const dateUtil={
    rangeDateArray:[ moment(moment(new Date()).format(DateFormat.yyyymmddSplit),DateFormat.yyyymmddSplit).subtract(30, "days").format(DateFormat.yyyymmddSplit),
        moment(new Date()).format(DateFormat.yyyymmddSplit)]
}



const nowDate= moment(new Date()).format(DateFormat.yyyymmddSplit)

function getBeforeEndDayStr(dateStr,num){
   return  moment(dateStr,DateFormat.yyyymmddSplit).subtract(num, "days").format(DateFormat.yyyymmddSplit);
}
function getDayStr(date){
    return  moment(date).format(DateFormat.yyyymmddSplit);
}
function getTimeStr(date){
    return  moment(date).utc() .format(DateFormat.hhmmSplit);
    // return  moment(date) .format(DateFormat.hhmmSplit);

}
function getSecond(date){
    return  moment(date).format(DateFormat.second);
}
const jiangEnNum=21;

export default {
    emotionInfo, nowDate, DateFormat,getBeforeEndDayStr,dateUtil,getDayStr,jiangEnNum,getTimeStr,getSecond
}
