Ext.define('JxkpApp.view.crowdshare.RealDeliveryOK' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.realdeliveryok', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : '实交妥投邮件', 

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
                        }
                    ],
                    tbar : [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '邮件号',
                                    itemId: 'mailnumber',
                                    labelWidth: 40,
                                    // maxLength: 13,
                                    archor: '100%',
                                    // validator : function(value) {  
                                    //     if(value.length != 13){  
                                    //         return '长度错误！';                                             
                                    //     }  
                                    //     return true;  
                                    // },
                                    // invalidText: '输入错误',
                                    enableKeyEvents: true,
                                    listeners: {  
                                        specialkey: function(field,e){
                                            var value = field.getValue();
                                            console.log(value);
                                            var me = field.ownerCt.ownerCt;
                                            if (e.getKey()==Ext.EventObject.ENTER){ 

                                                var store = me.up('handbacklist').down('reportdeliveryok').getStore();
                                                console.log(store);
                                                var index = store.find('MAILNUMBER', value);
                                                if(index == -1){
                                                    Ext.Msg.alert('info', '未知邮件', function(){
                                                        field.setValue('');
                                                        field.focus(false, 200);                                                                
                                                    });
                                                }else{
                                                    var rec = store.getAt(index);
                                                    if(rec.get('DELIVERYOK') == 0){
                                                        rec.set('HANDBACK', true);
                                                        // rec.commit(); //有commit, update会不触发
                                                        store.getProxy().setExtraParam('type', 'handback');
                                                        store.sync();
                                                    }else{
                                                        Ext.Msg.alert('info', '该邮件登记为未妥投邮件，请检查！', function(){
                                                                field.setValue('');
                                                                field.focus(false, 200);                                                                
                                                        });
                                                    }
                                                }
                                                field.setValue('');
                                            }  
                                        }  
                                    }

                                },"-",
                                {text:'保存', iconCls:'disk', action: 'handtopostmandetaildisk'},
                                {text:"删除所选", iconCls:"remove", action: 'handtopostmandetailremove'}
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