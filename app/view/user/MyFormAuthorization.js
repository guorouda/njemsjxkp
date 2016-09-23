Ext.define('JxkpApp.view.user.MyFormAuthorization', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usermyformauthorization',

    requires: [
        'Ext.form.field.ComboBox',
        'JxkpApp.view.user.TextField',
        'JxkpApp.view.user.Charge'
    ],

    height: 250,
    width: 400,
    bodyPadding: 10,
    title: '信息列表',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'ID',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'ID',
                    itemId: 'keyid',
                    hidden: true
                },            
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '工号',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'EMP_ID',
                    itemId: 'EMP_ID',
                    listeners:{
                        change: function(v){
                            this.ownerCt.down('#chargedepts').getStore().load({params: {operation: 'user', type: 'singleuser', emp_id: this.getValue(), id: this.ownerCt.down('#keyid').value}});
                        }
                    }
                },
     //            {
     //                xtype: 'textfield',
     //                anchor: '100%',
     //                fieldLabel: '姓名',
     //                labelWidth: 70,
     //                labelAlign: 'right',
					// name: 'EMP_NAME'
     //            },
                {
                    xtype: 'combo',
                    store: 'SearchUsers',
                    displayField: 'title',
                    typeAhead: false,
                    labelWidth: 70,
                    fieldLabel: '姓名',
                    labelAlign: 'right',
                    hideTrigger:true,
                    anchor: '100%',
                    minChars: 1,
                    name: 'EMP_NAME',

                    listConfig: {
                        loadingText: 'Searching...',
                        emptyText: 'No matching posts found.',

                        // Custom rendering template for each item
                        getInnerTpl: function() {
                            // return '<a class="search-item" href="http://www.sencha.com/forum/showthread.php?t={topicId}&p={id}">' +
                            //     '<h3><span>{[Ext.Date.format(values.lastPost, "M j, Y")]}<br />by {author}</span>{title}</h3>' +
                            //     '{excerpt}' +
                            // '</a>';
                            return '{EMP_ID} {EMP_NAME} [{DEP_NAME}]';
                        }
                    },
                    pageSize: 10,

                    listeners: {
                        select: function(combo, record, opts){
                            console.log(record);
                            combo.ownerCt.getForm().loadRecord(record);
                        }
                    }

                },                            
                {
                    xtype: 'usertextfiled',
                    anchor: '100%',
                    fieldLabel: '所属部门',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'DEP_ID'
                },
                {
                    xtype: 'combolevel',
                    anchor: '100%',
                    fieldLabel: '级别',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'LEV'
                },
                {
                    xtype: 'gridpanel',                    
                    itemId: 'chargedepts',
                    store: Ext.create('JxkpApp.store.Authorizations'),
                    selModel: {
                        injectCheckbox: 0,
                        mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
                        checkOnly: true     //只能通过checkbox选择
                    },
                    selType: "checkboxmodel",
                    columns: [
                        { text: '工号', dataIndex: 'EMP_ID' },
                        { text: '部门', dataIndex: 'AAA',
                            renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                    var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Depts');
                                    var index = store1.find('di_value', value);                        
                                    if (index != -1) {
                                        var rec = store1.getAt(index);
                                        return rec.data.di_caption;
                                    }
                                }
                        }
                    ],
                    tbar : [
                        {text:'添加', iconCls:'add', action: 'charge_add', handler: function(){
                            Ext.getBody().mask();
                            var store = this.ownerCt.ownerCt.getStore();                            
                            var emp_id = this.ownerCt.ownerCt.ownerCt.down('#EMP_ID').value;
                            Ext.widget('usercharge', {store: store, emp_id: emp_id});
                            }
                        },"-",
                        {text:'删除', iconCls:'delete', action: 'charge_delete', scope: this, handler: function(){
                                var grid = this.down('gridpanel');
                                var store = grid.getStore();

                                var records = grid.getSelectionModel().getSelection();
                                for(var i = 0;i < records.length; i++){
                                    store.remove(records[i]);
                                }                            
                            }
                        },"-",
                        {text:'修改', iconCls:'disk', action: 'charge_disk', scope: this, handler: function(){
                                var store = this.down('gridpanel').getStore();
                                store.getProxy().setExtraParam({
                                    operation: 'authorization'
                                });
                                store.sync();
                            }
                        },"->",
                        {text:'刷新', iconCls:'refresh', action: 'charge_refresh'}

                    ]
                }
            ],
            // buttons:[{
            //     text: '新建',
            //     iconCls: 'add',
            //     action: 'add'
            // },{
            //     text: '保存',
            //     iconCls: 'disk',
            //     action: 'disk'

            // },{
            //     text: '清除',
            //     iconCls: 'delete',
            //     action: 'delete'

            // }]
        });

        me.callParent(arguments);
    }

});