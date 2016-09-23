Ext.define('JxkpApp.view.user.DeptManagement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.deptmanagementlist',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.panel.Tool',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.resizer.Splitter',
        'Ext.button.Button',
        'JxkpApp.view.user.Dept',
        'JxkpApp.view.combo.DeptType'
    ],

    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    flex: 1,
                    region: 'center',
                    autoScroll: true,
                    store: Ext.create('JxkpApp.store.Depts'),
                    rootVisible: false,
                    viewConfig: {

                    },
                    listeners: {
                        itemclick: {
                            fn: me.onDeptItemClick,
                            scope: me
                        },
                        selectionchange: {
                            fn: me.onSelectionChange,
                            scope: me
                        }
                    },
                    tools: [
                        {
                            xtype: 'tool',
                            type: 'refresh',
                            listeners: {
                                click: {
                                    fn: me.onRefreshClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'tool',
                            type: 'collapse'
                        },
                        {
                            xtype: 'tool',
                            type: 'expand'
                        }
                    ]
                },
                {
                    xtype: 'deptformmanagement',
                    flex: 1,
                    region: 'east',
                    title: '设置'
                }
            ]
        });

        me.callParent(arguments);
    },


    onRefreshClick: function(tool, e, eOpts) {
        var me = tool;        
        me.up('treepanel').up('panel').down('form').getForm().reset();
        me.up('treepanel').getStore().load();
    },

    // onDeptItemClick: function(dataview, record, item, index, e, eOpts) {
    //     var me = dataview.up('treepanel').up('panel');        
    //     var rec = Ext.create('JxkpApp.model.Dept', {
    //         id: record.data.id,
    //         pid: record.data.pid,
    //         text: record.data.text,
    //         comment: record.data.comment
    //     });
    //     if(record.data.id != '0/800'){
    //         var form = me.down('form');
    //         form.getForm().loadRecord(rec);
    //         me.down('form > #depcon > #new').setDisabled(false);
    //     }
    // } ,

    onSelectionChange: function(selModel, selected) {
        this.down('deptformmanagement').setActiveRecord(selected[0] || null);
    }   

});