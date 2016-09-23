Ext.define('JxkpApp.view.user.Score' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.scorelist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        // 'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: 'Scores',

    features: [{
        ftype: 'summary'
    }],

    plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1          
    }],

    viewConfig: {
        stripeRows: true
    }, 

    initComponent: function() {
        // this.store = { 
        //     fields: ['name', 'email'],
        //     data  : [
        //         {name: 'Ed',    email: 'ed@sencha.com'}, 
        //         {name: 'Tommy', email: 'tommy@sencha.com'} 
        //    ] 
        // };
        this.itemId = 'score';
        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 30},
            {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', locked: true, width: 80, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 人', value);
                }
            },
            { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', locked: true, width: 80, align: 'left'},            
            {header: "工作质量", menuDisabled: true, dataIndex: 'GZZL',width: 90, align: 'right', summaryType: 'sum', editor: new Ext.form.NumberField({allowBlank: true,maxValue:60,maxText:'工作质量最高分60分'})},                      
            {header: "工作纪律", menuDisabled: true, dataIndex: 'GZJL',width: 90, align: 'right', summaryType: 'sum', editor: new Ext.form.NumberField({allowBlank: true,maxValue:40,maxText:'工作纪律最高分40分'})},                      
            {header: "禁止行为", menuDisabled: true, dataIndex: 'JZXW',width: 90, align: 'right', editor: new Ext.form.NumberField({allowBlank: true, minValue:0, minText:'禁止行为不能为负数'})},            
            { header: "合计", menuDisabled: true, dataIndex: 'TOTAL', width: 80,  sortable: true, align: 'right', summaryType: 'sum' },
            { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left', editor: new Ext.form.TextField({ allowBlank: true }) },
            { header: "状态", menuDisabled: true, dataIndex: 'MODILOCK', width: 60, align: 'right',hidden:true
                    // renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                    //     var store1 = Ext.StoreMgr.lookup('States');
                    //     var index = store1.find('di_value', value); 
                    //     if (index != -1) {
                    //         var rec = store1.getAt(index);
                    //         return rec.data.di_caption;
                    //     }
                    // }
            }
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
            {text:'获取数据', iconCls:'database_connect', action: 'score_fetch'},"-",       
            {text:'清空', iconCls:'delete', action: 'deleteAll'},"-",
            {
                xtype: 'form',                            
                items: [
                    {
                        xtype: 'filefield',
                        fieldLabel: '文件',
                        labelWidth: 30,
                        width: 400,
                        flex: 1,
                        msgTarget: 'side',
                        name: 'file',
                        allowBlank: false,
                        buttonText: '选择一个文件...'
                    }
                ]
            },
            {text:'Excel导入', iconCls:'disk', action: 'inExcel'},
            "->",
            {text:"Excel导出", iconCls:"exportexcel", action: 'exportExcel'}
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