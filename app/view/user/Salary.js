Ext.define('JxkpApp.view.user.Salary' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.salarylist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    // title : 'All Users', 

    requires: [
        // 'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: 'Salarys',

    features: [{
        ftype: 'summary'
    }],

    selModel : {
        selType : 'rowmodel',
        mode : 'SINGLE'
    },

    plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 2          
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
        this.itemId = 'salary';
        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 60},
            {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', locked: true, width: 80, summaryType: 'count', 
                summaryRenderer: function (value, summaryData, dataIndex) {
                    // return Ext.String.format('{0} 人{1}', value, value !== 1 ? 's' : '');
                    return Ext.String.format('{0} 人', value);
                }
            },
            { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', locked: true, width: 80, align: 'left'
            },
            { header: '离职?', menuDisabled: true, xtype: 'checkcolumn',  dataIndex: 'QUIT', width: 50, stopSelection: false
            },
            { header: "岗位名称", menuDisabled: true, dataIndex: 'STATION', width: 130, tooltip: '岗位名称', align: 'right', editor: {xtype: 'combostation'}
                    ,
                    renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Stations');
                        var type = record.get("TYPE"); 

                        var index  = store1.findBy(function(record, id){
                            return (record.get('dd_id') == type && record.get('di_value') == value);
                        });
                        
                        if (index != -1) {
                            var rec = store1.getAt(index); 
                            return rec.data.di_caption;
                        }
                    }
            },
            { header: "段道", menuDisabled: true, dataIndex: 'SEGMENT', width: 130, tooltip: '段道', align: 'right', editor: {xtype: 'combosegment'},
                    renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('Segments');
                        var index = store1.find('di_value', value); 
                        if (index != -1) {
                            var rec = store1.getAt(index);
                            return rec.data.di_caption;
                        }
                    }
            },
            // { header: "误歺费天数", menuDisabled: true, dataIndex: 'ATTENDENCE', width: 70, tooltip: '误歺费天数', align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "绩效得分", menuDisabled: true, dataIndex: 'JXDF', width: 70, tooltip: '绩效得分', sortable: true, align: 'right', summaryType: 'average' },
            { header: "绩效", menuDisabled: true, dataIndex: 'JXGZ', width: 70, tooltip: '绩效', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "日常加班", menuDisabled: true, dataIndex: 'RCJB', width: 70, tooltip: '日常加班', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "车贴", menuDisabled: true, dataIndex: 'CT', width: 70, tooltip: '车贴', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "一次性奖金", menuDisabled: true, dataIndex: 'YCXJJ', width: 70, tooltip: '一次性奖金', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "班组长津贴", menuDisabled: true, dataIndex: 'BZZJT', width: 70, tooltip: '班组长津贴', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "夜班津贴", menuDisabled: true, dataIndex: 'YBJT', width: 70, tooltip: '夜班津贴', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "外勤津贴", menuDisabled: true, dataIndex: 'WQJT', width: 70, tooltip: '外勤津贴', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "法定假日加班", menuDisabled: true, dataIndex: 'JBGZ', width: 70, tooltip: '法定假日加班', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "其他奖", menuDisabled: true, dataIndex: 'QTJ', width: 70, tooltip: '其他奖', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "补发", menuDisabled: true, dataIndex: 'BF', width: 70, tooltip: '补发', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "公司考核", menuDisabled: true, dataIndex: 'BMKH', width: 70, tooltip: '部门考核', sortable: true, align: 'right', summaryType: 'sum'
                // , editor: new Ext.form.field.Number({ allowBlank: true, decimalPrecision: 2 }) 
            },
            { header: "部门考核", menuDisabled: true, dataIndex: 'GSKH', width: 70, tooltip: '延期发放', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "延期发放", menuDisabled: true, dataIndex: 'XJFF', width: 70, tooltip: '现金发放', sortable: true, align: 'right', summaryType: 'sum', editor: new Ext.form.field.Number({ allowBlank: true }) },
            { header: "合计", menuDisabled: true, dataIndex: 'TOTAL', width: 80,  sortable: true, align: 'right', summaryType: 'sum' },
            { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left', editor: new Ext.form.TextField({ allowBlank: true }) },
            // { header: "状态", menuDisabled: true, dataIndex: 'MODILOCK', width: 60, align: 'right',
            //         renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
            //             var store1 = Ext.StoreMgr.lookup('States');
            //             var index = store1.find('di_value', value); 
            //             if (index != -1) {
            //                 var rec = store1.getAt(index);
            //                 return rec.data.di_caption;
            //             }
            //         }
            // },
            { header: "IDS", hidden: true, hidden: true, dataIndex: 'IDS'},
            { header: "check", hidden: true, menuDisabled: true, dataIndex: 'check', width: 80,  sortable: true, align: 'right'}
        ];

        this.tbar = [
            // {
            //     xtype: 'userdept',
            //     labelWidth: 30,
            //     width: 200,
            //     fieldLabel: '部门'
            // },
            Ext.widget('userdept', {labelWidth: 30, width: 200, fieldLabel: '部门'}),
            {  
                xtype: 'monthfield',
                submitFormat: 'Ym',
                name: 'month',
                fieldLabel: '月份',
                id: 'salarymonth',
                width: 120,
                labelWidth: 30,
                format: 'Ym',
                invalidText: '{0} 不是正确的日期格式 - 格式必须是 {1}，如201602'
            },
            {text:'获取数据', iconCls:'database_connect', action: 'salary_fetch'},'-',       
            {text:'导入计件工资', iconCls:'import', action: 'import'},"-",
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