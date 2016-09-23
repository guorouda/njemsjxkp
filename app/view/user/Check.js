Ext.define('JxkpApp.view.user.Check' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.checklist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        // 'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: 'Checks',

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
        this.itemId = 'check';
        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 60},
            {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', locked: true, width: 80, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 人', value);
                }
            },
            { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', locked: true, width: 80, align: 'left'},

            // { header: "岗位名称", menuDisabled: true, dataIndex: 'STATION', width: 130, tooltip: '岗位名称', align: 'right', editor: {xtype: 'combostation'},
            //         renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
            //             var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Stations');
            //             var index = store1.find('di_value', value);                        
            //             if (index != -1) {
            //                 var rec = store1.getAt(index);
            //                 return rec.data.di_caption;
            //             }
            //         }
            // },
            // { header: "段道", menuDisabled: true, dataIndex: 'SEGMENT', width: 130, tooltip: '段道', align: 'right', editor: {xtype: 'combosegment'},
            //         renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
            //             var store1 = Ext.StoreMgr.lookup('Segments');
            //             var index = store1.find('di_value', value); 
            //             if (index != -1) {
            //                 var rec = store1.getAt(index);
            //                 return rec.data.di_caption;
            //             }
            //         }
            // },
            { header: "考核金额", menuDisabled: true, dataIndex: 'MONEY', width: 80,  sortable: true, align: 'right', summaryType: 'sum',
                editor: new Ext.form.field.Number({ allowBlank: true })
            },
            { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left', editor: new Ext.form.TextField({ allowBlank: true }) },
            { header: "状态", menuDisabled: true, dataIndex: 'MODILOCK', width: 60, align: 'right',
                    renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('States');
                        var index = store1.find('di_value', value); 
                        if (index != -1) {
                            var rec = store1.getAt(index);
                            return rec.data.di_caption;
                        }
                    }
            }
        ];

        this.tbar = [
            // {
            //     xtype: 'userdept',
            //     labelWidth: 30,
            //     width: 200,
            //     fieldLabel: '部门'
            // },            
            Ext.widget('usercheckdept', {labelWidth: 30, width: 200, fieldLabel: '部门'}),
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
            {text:'获取数据', iconCls:'database_connect', action: 'FetchChecklist'},'-',            
            // {text:'上报', iconCls: 'upreport', action: 'upreport'},
            // {text:'发回', iconCls: 'backreport', action: 'backreport'},
            "->",
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