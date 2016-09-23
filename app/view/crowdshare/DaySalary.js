Ext.define('JxkpApp.view.crowdshare.DaySalary' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.daysalarylist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : '日结', 

    requires: [
        'Ext.form.field.Date'
    ],

    store: Ext.create('JxkpApp.store.crowdshare.AppSalarys'),
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
                        {xtype: 'rownumberer', header: '序号', width: 30
                        },
                        {header: "用户名", menuDisabled: true, dataIndex: 'USERNAME',width: 120,align: 'left'
                        },
                        {header: "姓名", menuDisabled: true, dataIndex: 'USERNAME',width: 120,align: 'left'
                        },
                        {header: "次日结", menuDisabled: true, dataIndex: 'DAYMPNEY',width: 120,align: 'left'
                        },
                        // {header: "待结", menuDisabled: true, dataIndex: 'MONTHMONEY',width: 120,align: 'left'
                        // },
                        {header: "提交时间", menuDisabled: true, dataIndex: 'CREATEDATE',width: 120,align: 'left'
                        },
                        {
                            xtype: 'checkcolumn',
                            header: '确认?',
                            dataIndex: 'CONFIRM',
                            width: 90,
                            stopSelection: false,
                            listeners: {
                                beforecheckchange: function() {
                                    return false; // HERE
                                }
                            }
                        }  
                    ],
            tbar : [
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    name: 'paydate',
                    maxValue: new Date(),  // limited to the current date or prior
                    labelWidth: 30,
                    fieldLabel: '日期'
                },
                {text:'获取数据', iconCls:'database_connect', action: 'daysalary_fetch'}
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