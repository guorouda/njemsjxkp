Ext.define('JxkpApp.view.crowdshare.DeployQuery' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.deployquerylist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users',

    requires: [
        'Ext.form.field.Date'
    ],

    store: Ext.create('JxkpApp.store.crowdshare.DeployQuerys'),

    features: [{
        ftype: 'summary'
    }],

    selType: 'checkboxmodel',

    viewConfig: {
        stripeRows: true
    },

    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            // store : me.buildStore(),
            columns : [
                {xtype: 'rownumberer', header: '序号', width: 30},
                {header: "区块",  menuDisabled: true, dataIndex: 'ADDRESS', width: 80, sortable: true, align: 'right',
                    renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('Directions');
                        console.log(store1);
                        var index = store1.find('di_value', value);
                        if (index != -1) {
                            var rec = store1.getAt(index);
                            return rec.data.di_caption;
                        }
                    }
                },
                {header: "手机", menuDisabled: true, dataIndex: 'MOBILE',width: 120,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "数量", menuDisabled: true, dataIndex: 'MAILNUMBER',width: 120,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "总数量", menuDisabled: true, dataIndex: 'DEALMAILNUMBER',width: 120,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "发布员工", menuDisabled: true, dataIndex: 'EMPLOYEE_ID',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "接单雇员", menuDisabled: true, dataIndex: 'USERNAME',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "生成日期", menuDisabled: true, dataIndex: 'FREQUENCY',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                },
                {header: "状态", menuDisabled: true, dataIndex: 'STATE',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                }
            ],
            tbar : [
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    name: 'registerdate',
                    maxValue: new Date(),  // limited to the current date or prior
                    fieldLabel: '申请日期'
                },
                {text:'获取数据', iconCls:'database_connect', action: 'deployquery_fetch'},"-",
                {text:'遍历', iconCls:'search', action: 'search'},
                {text:'清空', iconCls:'delete', action: 'deleteAll'},"-",
                {text:"Excel导出", iconCls:"exportexcel", action: 'exportExcel'}
            ]

        });

        this.callParent(arguments);
    },
    buildStore : function() {
        return Ext.create('JxkpApp.store.Users', {
            //...

        });
    }
});