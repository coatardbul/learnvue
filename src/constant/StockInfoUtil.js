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
    increaseRateColor, forMatIncreaseRate, forMatMoneyNum
}
