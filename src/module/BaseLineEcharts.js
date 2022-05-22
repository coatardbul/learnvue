import ToolTip from "@/module/ToolTip";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
import Legend from "@/module/Legend";
import AxisPointer from "@/module/AxisPointer";


export default class BaseLineEcharts {
    constructor() {
        //调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
        //提示框组件。
        this.tooltip = new ToolTip();
        this.xAxis = this.getDefaultXaxis();
        this.yAxis = this.getDefaultYaxis();
        //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        this.legend = new Legend();
        this.color=this.getDefaultColor();
        //x轴时间
        this.hasXaxisEvent = true;
        this.xAxisRouter = '/index4';
        //坐标轴指示器（axisPointer）的全局公用设置。
        this.axisPointer=new AxisPointer();
        return this;
    }

    getDefaultYaxis() {
        let arr = []
        arr.push(new YleftAxis());
        return arr;
    }

    getDefaultXaxis() {
        let arr = []
        arr.push(new Xaxis());
        return arr;
    }
    getDefaultColor(){
        let arr=[
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de',
            '#3ba272',
            '#fc8452',
            '#9a60b4',
            '#ea7ccc',
        ]
        return arr;

    }

}
