Ext.define('JxkpApp.view.user.Attendence' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.attendencelist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        // 'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: 'Attendences',

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
        this.itemId = 'attendence',
        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 30},
            {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', locked: true, width: 80, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 人', value);
                }
            },
            { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', locked: true, width: 80, align: 'left'},
            { header: "年休假", menuDisabled: true, dataIndex: 'GXJ', width: 60, align: 'right', tooltip: '工休假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "产假", menuDisabled: true,  dataIndex: 'CJ', width: 60, align: 'right', tooltip: '产假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "延长产假", menuDisabled: true,  dataIndex: 'YCCJ', width: 60, align: 'right', tooltip: '延长产假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "计划生育假", menuDisabled: true,  dataIndex: 'JHSYJ', width: 60, align: 'right', tooltip: '计划生育假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "哺乳假", menuDisabled: true,  dataIndex: 'BRJ', width: 60, align: 'right', tooltip: '哺乳假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "探亲假", menuDisabled: true,  dataIndex: 'TQJ', width: 60, align: 'right', tooltip: '探亲假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "婚假", menuDisabled: true,  dataIndex: 'HJ', width: 60, align: 'right', tooltip: '婚假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "丧假", menuDisabled: true,  dataIndex: 'SANGJ', width: 60, align: 'right', tooltip: '丧假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "旷工", menuDisabled: true,  dataIndex: 'KG', width: 60, align: 'right', tooltip: '旷工', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "病假", menuDisabled: true,  dataIndex: 'BJ', width: 60, align: 'right', tooltip: '病假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "事假", menuDisabled: true,  dataIndex: 'SHIJ', width: 60, align: 'right', tooltip: '事假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "公假", menuDisabled: true,  dataIndex: 'GJ', width: 60, align: 'right', tooltip: '公假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },
            { header: "工伤假", menuDisabled: true, dataIndex: 'GSJ', width: 60, align: 'right', tooltip: '工伤假', summaryType: 'sum', editor: new Ext.form.NumberField({ allowBlank: true }) },            
            { header: "合计", menuDisabled: true, dataIndex: 'TOTAL', width: 80,  sortable: true, align: 'right', summaryType: 'sum' },
            { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left', editor: new Ext.form.TextField({ allowBlank: true }) },
            { header: "IDS", hidden: true, hidden: true, dataIndex: 'IDS'},
            { header: "状态", menuDisabled: true, dataIndex: 'MODILOCK', width: 60, align: 'right',hidden: true
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
            {text:'获取数据', iconCls:'database_connect', action: 'attendence_fetch'},"-",       
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