Ext.define('JxkpApp.view.crowdshare.Register' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.registerlist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'Ext.form.field.Date'
    ],

    store: Ext.create('JxkpApp.store.crowdshare.Users'),

    features: [{
        ftype: 'summary'
    }],

    selType: 'checkboxmodel',

    // plugins: [{
    //         ptype: 'cellediting',
    //         clicksToEdit: 1          
    // }],

    viewConfig: {
        stripeRows: true
    }, 

    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            // store : me.buildStore(),
            columns : [
                        {xtype: 'rownumberer', header: '序号', width: 30},
                        {header: "登陆名", menuDisabled: true, dataIndex: 'emp_id',width: 70, sortable: true,align: 'left'//, editor: new Ext.form.NumberField({allowBlank: true })
                        },                                   
                        {header: "姓名", menuDisabled: true, dataIndex: 'emp_name',width: 80,align: 'left',summaryType: 'count'//, editor: new Ext.form.TextField({allowBlank: true})
                        },
                        {header: "身份证号", menuDisabled: true, dataIndex: 'pid',width: 80, sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true})
                        },
                        {header: "状态", menuDisabled: true, dataIndex: 'active',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                        },
                        {header: "注册日期", menuDisabled: true, dataIndex: 'registerdate',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                        },
                        {header: "联系人", menuDisabled: true, dataIndex: 'emgency',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        },
                        {header: "联系人电话", menuDisabled: true, dataIndex: 'emgencymobile',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
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
                                {text:'获取数据', iconCls:'database_connect', action: 'user_fetch'},"-",
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