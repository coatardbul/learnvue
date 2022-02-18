function compareDesc(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
function compareAsc(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}


function getAsc(key, list) {
     list.sort(compareDesc(key))
}
function getDesc(key, list) {
     list.sort(!compareDesc(key))
}

export default {
    getAsc,getDesc,compareDesc,compareAsc
}
