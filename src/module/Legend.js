export default class Legend {
    constructor() {

        this.show = true;
        //上面标签是否翻页，标签多的时候使用
        this.type = "scroll";
        this.selected = {};
        this.top=0

        return this;
    }
}
