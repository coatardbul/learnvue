import ToolTip from "@/module/ToolTip";
import EchartsStyle from "@/module/EchartsStyle";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
import Grid from "@/module/Grid";
import Legend from "@/module/Legend";
import AxisPointer from "@/module/AxisPointer";

export default class GraphEcharts {
    constructor() {
        //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
        this.toolbox = {};
        //标题
        this.title = {};

        //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        this.legend = [];

        //提示框组件。
        this.tooltip = {};

        this.series = [];

        return this;
    }


}
