Ext.define('JxkpApp.view.user.PersonSalary' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.personsalarylist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'JxkpApp.store.PersonSalary'
    ],

    store: 'PersonSalary',

    initComponent: function() {
        var me = this;
        this.itemId = 'salary';
        Ext.applyIf(me, {
            columns : [
                {xtype: 'rownumberer', header: '序号', width: 60},
                {header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', width: 80
                },
                { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', width: 80, align: 'left'},
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
                { header: "误歺费天数", menuDisabled: true, dataIndex: 'ATTENDENCE', width: 70, tooltip: '误歺费天数', align: 'right' },
                { header: "绩效得分", menuDisabled: true, dataIndex: 'JXDF', width: 70, tooltip: '绩效得分', sortable: true, align: 'right', summaryType: 'average' },
                { header: "绩效", menuDisabled: true, dataIndex: 'JXGZ', width: 70, tooltip: '绩效', sortable: true, align: 'right'},
                { header: "日常加班", menuDisabled: true, dataIndex: 'RCJB', width: 70, tooltip: '日常加班', sortable: true, align: 'right'},
                { header: "车贴", menuDisabled: true, dataIndex: 'CT', width: 70, tooltip: '车贴', sortable: true, align: 'right'},
                { header: "一次性奖金", menuDisabled: true, dataIndex: 'YCXJJ', width: 70, tooltip: '一次性奖金', sortable: true, align: 'right'},
                { header: "班组长津贴", menuDisabled: true, dataIndex: 'BZZJT', width: 70, tooltip: '班组长津贴', sortable: true, align: 'right'},
                { header: "夜班津贴", menuDisabled: true, dataIndex: 'YBJT', width: 70, tooltip: '夜班津贴', sortable: true, align: 'right'},
                { header: "外勤津贴", menuDisabled: true, dataIndex: 'WQJT', width: 70, tooltip: '外勤津贴', sortable: true, align: 'right'},
                { header: "法定假日加班", menuDisabled: true, dataIndex: 'JBGZ', width: 70, tooltip: '法定假日加班', sortable: true, align: 'right'},
                { header: "其他奖", menuDisabled: true, dataIndex: 'QTJ', width: 70, tooltip: '其他奖', sortable: true, align: 'right'},
                { header: "补发", menuDisabled: true, dataIndex: 'BF', width: 70, tooltip: '补发', sortable: true, align: 'right'},
                { header: "公司考核", menuDisabled: true, dataIndex: 'BMKH', width: 70, tooltip: '部门考核', sortable: true, align: 'right'},
                { header: "部门考核", menuDisabled: true, dataIndex: 'GSKH', width: 70, tooltip: '延期发放', sortable: true, align: 'right'},
                { header: "延期发放", menuDisabled: true, dataIndex: 'XJFF', width: 70, tooltip: '现金发放', sortable: true, align: 'right'},
                { header: "合计", menuDisabled: true, dataIndex: 'TOTAL', width: 80,  sortable: true, align: 'right', summaryType: 'sum' },
                { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left'},
                { header: "IDS", hidden: true, dataIndex: 'IDS'},
                { header: "check", hidden: true, menuDisabled: true, dataIndex: 'check', width: 80,  sortable: true, align: 'right'}
            ],
            listeners: {
                show: {
                    fn: me.onGridpanelShow,
                    scope: me
                },
                afterrender: {
                    fn: me.onGridpanelAfterRender,
                    scope: me
                }
            }
        });
        me.callParent(arguments);
    },

    onGridpanelShow: function(component, eOpts) {

    },
    onGridpanelAfterRender: function(component, eOpts) {
        var me = component;
        me.getStore().load();
    }
});