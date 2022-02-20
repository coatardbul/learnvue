import ToolTip from "@/module/ToolTip";
import EchartsStyle from "@/module/EchartsStyle";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
import YrightAxis from "@/module/YrightAxis";
import Grid from "@/module/Grid";
import Legend from "@/module/Legend";
import AxisPointer from "@/module/AxisPointer";

export default class BaseLineEcharts {
    constructor() {
        this.stype = new EchartsStyle();
        this.tooltip = new ToolTip();
        this.toolbox = {};
        this.xAxis = this.getDefaultXaxis();
        this.yAxis = this.getDefaultYaxis();
        this.legend = new Legend();
        this.series = [];
        this.grid = this.getDefaultGrid();
        this.hasXaxisEvent = true;
        this.xAxisRouter = '/index4';
        this.axisPointer=new AxisPointer();

        return this;
    }

    getDefaultYaxis() {
        let arr = []
        arr.push(new YleftAxis());
        // arr.push(new YrightAxis());
        return arr;
    }

    getDefaultXaxis() {
        let arr = []
        arr.push(new Xaxis());
        return arr;
    }

    getDefaultGrid() {
        let arr = [];
        arr.push(new Grid());
        return arr;
    }



}
