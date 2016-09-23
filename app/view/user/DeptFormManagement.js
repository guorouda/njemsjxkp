Ext.define('JxkpApp.view.DeptFormManagement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deptformmanagement',

    requires: [
        'Ext.form.field.Text'
    ],

    margin: '',
    width: 150,   
    bodyPadding: 10,
    layout: 'auto',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            activeRecord: null,            
            items: [
                {
                    xtype: 'treecombo',
                    store: Ext.create('JxkpApp.store.NewDepts'),
                    fieldLabel: '上级部门',
                    labelWidth: 60,
                    displayField: 'text',
                    valueField: 'id',                            
                    value: '800',
                    name: 'pid',
                    itemId: 'pid'

                },
                {
                    xtype: 'textfield',
                    fieldLabel: '机构代码',
                    labelWidth: 60,
                    name: 'id',
                    itemId: 'id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    labelWidth: 60,
                    name: 'text',
                    itemId: 'text'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '简介',
                    labelWidth: 60,
                    name: 'comment',
                    itemId: 'comment'
                },
                {
                    xtype: 'combodepttype',
                    fieldLabel: '机构类型',
                    labelWidth: 60,
                    name: 'type',
                    itemId: 'type'
                },
                {
                    xtype: 'container',
                    itemId: 'depcon',
                    height: 29,
                    margin: '20 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'splitter',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: '新建',
                            itemId: 'new',
                            disabled: true,
                            iconCls: 'icon-add'
                        },
                        {
                            xtype: 'splitter',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: '保存',
                            iconCls: 'icon-save',
                            itemId: 'save',
                            disabled: true,
                            action: 'dept_save',
                            listeners: {
                                click: {
                                    fn: me.onSaveBtnClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'splitter',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: '删除',
                            iconCls: 'icon-delete',
                            listeners: {
                                click: {
                                    fn: me.onDeleteBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onDeleteBtnClick: function(button){     
        var store = button.up('form').up('panel').down('treepanel').getStore();
        console.log(store);
        var rec = store.getAt(1);
        store.remove(store.getAt(1));
        store.sync();
    },

    onSaveBtnClick: function(button){
        var form = button.up('form');
        var record = form.getRecord();
        form.getForm().updateRecord(record);
        var store = button.up('form').up('panel').down('treepanel').getStore();
        store.sync();
    },

    setActiveRecord: function(record){
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

});