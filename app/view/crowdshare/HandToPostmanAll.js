Ext.define('JxkpApp.view.crowdshare.HandToPostmanAll' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.handtopostmanall', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'Ext.form.field.Date'
    ],

    store: Ext.create('JxkpApp.store.crowdshare.DeployQuerys'),

    features: [{
        ftype: 'summary'
    }],

    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true,
        listeners: {
            selectionChange: function (model, selected, eOpts) {
                if(selected.length>0){
                    var detail = this.view.ownerCt.up('handtopostmanlist').down('handtopostmandetail');
                    detail.ADDRESS = selected[0].data.ADDRESS;
                    detail.MAILNUMBER = selected[0].data.MAILNUMBER;
                    detail.USERNAME = selected[0].data.USERNAME;
                    detail.FREQUENCY = selected[0].data.FREQUENCY;
                    this.view.ownerCt.up('handtopostmanlist').down('handtopostmandetail').down('textfield').focus(false, 200);
                }
            }
        }
    },

    viewConfig: {
        stripeRows: true
    }, 

    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            // store : me.buildStore(),
            columns : [
                        {xtype: 'rownumberer', header: '序号', width: 30},
                        // {header: "区块", menuDisabled: true, dataIndex: 'address',width: 170, sortable: true,align: 'left'//, editor: new Ext.form.NumberField({allowBlank: true })
                        // },
                        {header: "区块",  menuDisabled: true, dataIndex: 'ADDRESS', width: 80, sortable: true, align: 'right',
                            renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                var store1 = Ext.StoreMgr.lookup('Directions');
                                var index = store1.find('di_value', value);
                                if (index != -1) {
                                    var rec = store1.getAt(index);
                                    return rec.data.di_caption;
                                }
                            }
                        },
                        {header: "数量", menuDisabled: true, dataIndex: 'MAILNUMBER',width: 120,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        },
                        {header: "已发数量", menuDisabled: true, dataIndex: 'COUNT',width: 120,align: 'left'//, editor: new Ext.form.TextField({allowBlank: true})
                        }//,
                        // {header: "联系电话", menuDisabled: true, dataIndex: 'mobile',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        // },
                        // {header: "发布员工", menuDisabled: true, dataIndex: 'employee_id',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        // },
                        // {header: "接单雇员", menuDisabled: true, dataIndex: 'username',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        // },
                        // {header: "生成日期", menuDisabled: true, dataIndex: 'frequency',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        // },
                        // {header: "状态", menuDisabled: true, dataIndex: 'state',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                        // }
                    ],
                    tbar : [
                                // {
                                //     xtype: 'datefield',
                                //     anchor: '100%',
                                //     name: 'registerdate',
                                //     maxValue: new Date(),  // limited to the current date or prior
                                //     fieldLabel: '申请日期'
                                // },
                                {
                                        xtype: 'textfield',
                                        fieldLabel: '识别码',
                                        labelWidth: 40,
                                        archor: '100%'

                                },
                                {text:'获取数据', iconCls:'database_connect', action: 'deploypostman_fetch'},"-",
                                // {text:'遍历', iconCls:'search', action: 'search'},
                                // {text:'清空', iconCls:'delete', action: 'deleteAll'},"-",
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