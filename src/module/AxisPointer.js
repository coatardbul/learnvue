export default class AxisPointer{
    constructor() {
        this.link=this.getDefaultLink();
    }
    getDefaultLink(){
        let arr=[];
        let obj={
            xAxisIndex: 'all'
        }
        arr.push(obj);
        return arr;
    }
}
