export default class StockBaseInfo {
    constructor() {
        this.upLimitVolRange = '';
        this.upLimitMixSubVolRange = '';
        this.upLimitMaxSubVolRange = '';
        //昨日竞价涨幅
        this.lastAuctionIncreaseRate='';
        this.lastNewIncreaseRate='';
        this.lastSubIncreaseRate='';

        this.upLimitOpenNum = '';
        this.upLimitDetail = '';
        this.name = '';
        this.code = '';
        //sh001234
        this.codeUrl='';
        this.auctionIncreaseRate = '';
        this.newIncreaseRate = '';
        this.subIncreaseRate = '';
        this.auctionTradeAmount = '';
        this.tradeAmount = '';
        this.auctionTurnOverRate = '';
        this.turnOverRate = '';

        this.marketValue = '';
        this.circulationMarketValue = '';
        this.newPrice = '';
        this.theme = '';

        return this;
    }
}
