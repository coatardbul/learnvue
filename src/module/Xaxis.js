export default class Xaxis {
    constructor() {
        this.name = '日期';
        this.type = 'category';

        this.boundaryGap = false;
        //名称位置
        this.nameLocation = "end";
        this.nameGap = 0;
        // x轴绑定事件标签
        this.triggerEvent = true;
        this.axisLabel = {
            show: true,
            //标签之间间隔距离
            // interval: 0,
            inside: false,
            //标签与坐标轴的距离
            margin: 1,
        };
        this.splitLine = {
            show: true
        };
        this.data=[];
        this.boundaryGap=false;
        this.axisLine= { onZero: true };

        return this;
    }
}
