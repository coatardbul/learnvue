const isOpenTradeList=[
    {
        value: 1,
        label: '是',
    },
    {
        value: 0,
        label: '否',
    },
]
const typeList=[
    {
        value: 1,
        label: '已购股票',
    },
    {
        value: 2,
        label: '定时任务策略扫描',
    },
    {
        value: 3,
        label: '需要发送邮件',
    },
    {
        value: 4,
        label: '交易',
    },
    {
        value: 5,
        label: '策略模拟',
    },
]
const sellTypeList=[
    {
        value: 1,
        label: '定时卖出',
    },
    {
        value: 2,
        label: '条件卖出',
    },
    {
        value: 3,
        label: '邮件提醒',
    },
]
const sellStatusList=[
    {
        value: 1,
        label: '未卖出',
    },
    {
        value: 2,
        label: '已卖出',
    },
]

const buyTypeList=[
    {
        value: 1,
        label: '直接买入',
    },
    {
        value: 2,
        label: '需要发送邮件',
    },
    {
        value: 3,
        label: '固定策略',
    },

]
export default {
    isOpenTradeList,typeList,sellTypeList,sellStatusList,buyTypeList
}
