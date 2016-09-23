Ext.define('JxkpApp.view.user.InnerSalary_fail_log' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.innersalary_fail_loglist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    // title : 'All Users', 

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: 'InnerSalary_fail_logs',

    features: [{
        ftype: 'summary'
    }],


    viewConfig: {
        stripeRows: true
    },

    initComponent: function() {
        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 60},
            {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', locked: true, width: 80, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 记录', value);
                }
            },
            { header: '错误代码', menuDisabled: true, dataIndex: 'EVENT_ID', width: 70, tooltip: '错误代码', align: 'right'},
            { header: '错误描述', menuDisabled: true, dataIndex: 'EVENT_DESC', width: 70, tooltip: '错误描述', sortable: true, align: 'right'},
            { header: '数据', menuDisabled: true, dataIndex: 'DATA', flex: 1, tooltip: '数据', sortable: true, align: 'right'},
            { header: '时间', menuDisabled: true, dataIndex: 'LOGTIME', width: 120,  sortable: true, align: 'right'}
        ];

        this.tbar = [
            {        
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: '日期',
                labelWidth: 30,
                maxValue: new Date()
            },
            {
                text:'查询', iconCls:'database_connect', action: 'innersalary_fail_log_query'
            }
        ];
        this.callParent(arguments);
    }
});