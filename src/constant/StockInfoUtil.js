function increaseRateColor(rowValue) {
    if (rowValue > 10) {
        return {color: '#f6061b'};
    }
    if (rowValue > 5) {
        return {color: '#cb1d2c'};
    }
    if (rowValue > 0) {
        return {color: '#8d3a42'};
    }
    if (rowValue < -10) {
        return {color: '#06f806'};
    }
    if (rowValue < 0) {
        return {color: '#2cb42c'};
    }
}

function openNumColor(rowValue){
    if (rowValue >= 10) {
        return {backgroundColor: 'rgba(246,6,27,0.53)'};
    }
    if (rowValue > 5) {
        return {backgroundColor: 'rgba(13,155,231,0.74)'};
    }
    if (rowValue > 0) {
        return {backgroundColor: 'rgba(13,231,107,0.74)'};
    }
}


function forMatMoneyNum(cellValue) {
    if (Number(cellValue) < 1) {
        return null;
    }
    if (Number(cellValue) / 10000 / 10000 > 1) {
        return (Number(cellValue) / 10000 / 10000).toFixed(2) + '亿';
    } else {
        return (Number(cellValue) / 10000).toFixed(2) + '千万';
    }
}

function forMatIncreaseRate(cellValue) {
    return Number(cellValue).toFixed(2) + '%';
}

export default {
    increaseRateColor,openNumColor, forMatIncreaseRate, forMatMoneyNum
}
