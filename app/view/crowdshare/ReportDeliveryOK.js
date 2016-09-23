Ext.define('JxkpApp.view.crowdshare.ReportDeliveryOK' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.reportdeliveryok', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : '今日妥投邮件', 

    requires: [
        'Ext.form.field.Date'
    ],

    store: Ext.create('JxkpApp.store.crowdshare.DeployQueryDetails'),
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
                                var index = store1.find('di_value', value);
                                if (index != -1) {
                                    var rec = store1.getAt(index);
                                    return rec.data.di_caption;
                                }
                            }
                        },
                        {header: "邮件号", menuDisabled: true, dataIndex: 'MAILNUMBER',width: 120,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        },
                        {header: "状态", menuDisabled: true, dataIndex: 'DELIVERYOK',width: 120,align: 'left',//editor: new Ext.form.TextField({ allowBlank: true })
                            renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                if(value == '0'){
                                    return '<div style="color:green">妥投<div>';
                                }else if(value == '1'){
                                    return '<div style="color:blue">未妥投<div>';
                                }
                            }
                        },
                        {
                            xtype: 'checkcolumn',
                            header: '归班确认?',
                            dataIndex: 'HANDBACK',
                            width: 90,
                            stopSelection: false,
                            listeners: {
                                beforecheckchange: function() {
                                    return false; // HERE
                                }
                            }
                        }                       
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