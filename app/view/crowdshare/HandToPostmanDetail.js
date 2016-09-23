Ext.define('JxkpApp.view.crowdshare.HandToPostmanDetail' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.handtopostmandetail', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'Ext.form.field.Date',
        'Ext.ux.Deferred'
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
                                            var me = field.ownerCt.ownerCt;
                                            if (e.getKey()==Ext.EventObject.ENTER){ 
                                                if(me.ADDRESS === undefined){                                                
                                                    Ext.Msg.alert('info', '区域未选！');
                                                    return;  
                                                }                                                                                            
                                                var r = Ext.create('JxkpApp.model.crowdshare.DeployQuery', {
                                                    ADDRESS: me.ADDRESS,
                                                    MAILNUMBER: value,
                                                    USERNAME: me.USERNAME,
                                                    FREQUENCY: me.FREQUENCY
                                                });

                                                var store = me.getStore();
                                                var total=0;
                                                var view = me.getView();

                                                for(var i = 0; i < store.getCount(); i++){                                                    
                                                    var rec = view.getRecord(view.getNode(i));
                                                    // console.log(rec.data.MAILNUMBER);
                                                    if(rec.data.MAILNUMBER == value){
                                                        field.setValue('');                                  
                                                                                                          
                                                        var dfd = Ext.create('Ext.ux.Deferred'),
                                                        // task = setInterval(function () {  
                                                        //     console.log(i);                                                          
                                                        //     me.getView().focusRow(i - 1);
                                                        //     dfd.resolve(10);
                                                        //     clearInterval(task);
                                                        // }, 1000);

                                                            tasks = function(){
                                                    　　　　　　me.getView().focusRow(i);
                                                    　　　　　　dfd.resolve(1); // 改变Deferred对象的执行状态
                                                    　　　　};

                                                　　　　setTimeout(tasks, 200);

                                                        Ext.ux.Deferred
                                                            .when(dfd.promise())
                                                            .then(function (value) {
                                                                me.down('textfield').focus(false, 200);
                                                            });

                                                        return;                                                        
                                                    }
                                                }

                                                for(var j = 0; j<store.getCount(); j++){
                                                    if(store.getAt(j).data.ADDRESS == me.ADDRESS){
                                                        total = total + 1;                                                      
                                                        if(total == me.MAILNUMBER){  
                                                            Ext.Msg.alert('info', '邮件件数够了！', function(){
                                                                field.setValue('');
                                                                me.down('textfield').focus(false, 200);                                                                
                                                            });
                                                            return; 
                                                        }                                                        
                                                    }
                                                }                                                
                                                me.getStore().add(r);
                                                var rec1 = me.up('handtopostmanlist').down('handtopostmanall').getView().getSelectionModel().getSelection()[0];
                                                rec1.set('COUNT', total + 1); 
                                                rec1.commit();
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