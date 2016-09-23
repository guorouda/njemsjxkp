Ext.define('JxkpApp.view.user.List' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.listlist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month'
    ],

    action: 'innersalary',

    store: 'Lists',

    features: [{
        ftype: 'summary'
    }],

    viewConfig: {
        stripeRows: true
    },
    // plugins: [{
    //         ptype: 'rowexpander',
    //         rowBodyTpl : new Ext.XTemplate(
    //             '<p><b>Summary:</b> {YFHJ}</p>'
    //         )
    // },'rowediting'], 

    initComponent: function() {
        // this.store = { 
        //     fields: ['name', 'email'],
        //     data  : [
        //         {name: 'Ed',    email: 'ed@sencha.com'}, 
        //         {name: 'Tommy', email: 'tommy@sencha.com'} 
        //    ] 
        // };
        this.columns = [
            {xtype: 'rownumberer', width: 60},
            {header: '员工工号', menuDisabled: true, dataIndex: 'YGGH', locked: true, width: 50, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 人', value);
                }
            },
            {
                header: '员工工号', menuDisabled: true, dataIndex: 'EMP_NAME', locked: true, width: 50
            },
            {text: '收入提成', menuDisabled: true,
                columns:[
                    {header: '国内标快收入', menuDisabled:true, dataIndex: 'GNBKSR', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '标快收入提成', menuDisabled:true, dataIndex: 'GNBKSRTC', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国内经快收入', menuDisabled:true, dataIndex: 'GNJKSR', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '经快收入提成', menuDisabled:true, dataIndex: 'GNJKSRTC', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际收入', menuDisabled:true, dataIndex: 'GJSR', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际收入提成', menuDisabled:true, dataIndex: 'GJSRTC', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际E邮宝收入', menuDisabled:true, dataIndex: 'GJEYBSR', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际E邮宝收入提成', menuDisabled:true, dataIndex: 'GJEYBSRT', flex: 1, summaryType: 'sum', align: 'right'}
                ]
            },
            {text: '揽收计件绩效', menuDisabled: true,
                columns:[
                    {header: '国内标快件数', menuDisabled:true, dataIndex: 'GNBKJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国内经快件数', menuDisabled:true, dataIndex: 'GNJKJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际件数', menuDisabled:true, dataIndex: 'GJJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '国际E邮宝件数', menuDisabled:true, dataIndex: 'GJEYBJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '大宗客户件数', menuDisabled:true, dataIndex: 'DZKHJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '揽收计件绩效合计', menuDisabled:true, dataIndex: 'LSJXHJ', flex: 1, summaryType: 'sum', align: 'right'}
                ]
            },
            {text: '投递计件绩效', menuDisabled: true,
                columns:[
                    {header: '妥投件数', menuDisabled:true, dataIndex: 'TTJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '及时妥投件数', menuDisabled:true, dataIndex: 'JSTTJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '2小时妥投件数', menuDisabled:true, dataIndex: 'TT2JS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '个性化邮件件数', menuDisabled:true, dataIndex: 'TGXHYJ', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '代收货款件数', menuDisabled:true, dataIndex: 'TDSHKJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '两购件数', menuDisabled:true, dataIndex: 'TLGJS', flex: 1, summaryType: 'sum', align: 'right'},
                    {header: '投递计件绩效合计', menuDisabled:true, dataIndex: 'TDJXHJ', flex: 1, summaryType: 'sum', align: 'right'}
                ]
            },
                        
            // {header: '收入提成合计', dataIndex: 'SRTCHJ', flex: 1},            
            {header: '绩效合计', menuDisabled:true, dataIndex: 'JXHJ', width: 80, summaryType: 'sum', align: 'right'},
            {header: '值6休1补贴', menuDisabled:true, dataIndex: 'ZLXYBT', width: 50, summaryType: 'sum', align: 'right'},
            {header: '法定加班工资', menuDisabled:true, dataIndex: 'FDJBGZ', width: 50, summaryType: 'sum', align: 'right'},
            {header: '揽投部考核', menuDisabled:true, dataIndex: 'LTBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '市场部考核', menuDisabled:true, dataIndex: 'SCBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '人教部考核', menuDisabled:true, dataIndex: 'RJBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '运控部考核', menuDisabled:true, dataIndex: 'YKBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '计财部考核', menuDisabled:true, dataIndex: 'JCBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '发保部考核', menuDisabled:true, dataIndex: 'FBBKH', width: 50, summaryType: 'sum', align: 'right'},
            {header: '网运部考核', menuDisabled:true, dataIndex: 'WYBKH', width: 50, summaryType: 'sum', align: 'right'},            
            {header: '应发合计', menuDisabled:true, dataIndex: 'YFHJ', width: 80, summaryType: 'sum', align: 'right'}
        ];
        this.tbar = [            
            {
                xtype: 'userdept',
                labelWidth: 30,
                width: 200,
                fieldLabel: '部门'
            },
            {  
                xtype: 'monthfield',
                submitFormat: 'Ym',
                name: 'month',
                fieldLabel: '月份',
                width: 120,
                labelWidth: 30,
                format: 'Ym',
                invalidText: '{0} 不是正确的日期格式 - 格式必须是 {1}，如201602'
            },
            {text:'获取数据', iconCls:'database_connect', action: 'fetch'},"-",       
            // {text:'清空', iconCls:'delete', action: 'deleteAll'},"-",
            // {text:'发布', iconCls:'disk', action: 'deploy'},
            "->",
            {text:"搜索", iconCls:"search"}
        ];
        // this.plugins = [{
        //     ptype: 'rowexpander',
        //     rowBodyTpl : new Ext.XTemplate(
        //         '<p><b>Summary:</b> aaaaa</p>'
        //     )
        // }];
        this.callParent(arguments);
    }
});