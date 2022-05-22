import ToolTip from "@/module/ToolTip";
import EchartsStyle from "@/module/EchartsStyle";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
import Grid from "@/module/Grid";
import Legend from "@/module/Legend";
import AxisPointer from "@/module/AxisPointer";

export default class BaseEcharts {
    constructor() {
        //调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
        // this.color=[];
        this.stype = new EchartsStyle();
        //提示框组件。
        this.tooltip = {};
        //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
        this.toolbox = {};
        //标题
        this.title={};
        //缩放
        this.dataZoom=[];
        this.xAxis = [];
        this.yAxis =[];
        //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        this.legend =[];
        this.series = [];
        //分成几份
        this.grid = this.getDefaultGrid();
        //x轴时间
        this.hasXaxisEvent = false;
        this.xAxisRouter = '';
        //坐标轴指示器（axisPointer）的全局公用设置。
        this.axisPointer={};
        //ECharts 4 开始支持了 数据集（dataset）组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以自由指定数据到视觉的映射。这在不少场景下能带来使用上的方便。
        this.dataset=[];
        // 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）
        this.visualMap=[]
        return this;
    }

    getDefaultGrid() {
        let arr = [];
        arr.push(new Grid());
        return arr;
    }

}
