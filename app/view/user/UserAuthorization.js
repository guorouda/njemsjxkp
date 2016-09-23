Ext.define('JxkpApp.view.user.UserAuthorization', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.userauthorizationlist',

    
    requires: [
        'JxkpApp.view.combo.Level'
    ],       
    
    store: Ext.create('JxkpApp.store.Authorizations'),

    features: [{
        ftype: 'summary'
    }],

    selModel: {
        injectCheckbox: 0,
        mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",

    // plugins: [{
    //         ptype: 'cellediting',
    //         clicksToEdit: 1          
    // }],

    viewConfig: {
        stripeRows: true
    }, 

    initComponent: function() {

        this.columns = [
            {xtype: 'rownumberer', header: '序号', width: 30},
            {header: "工号", menuDisabled: true, dataIndex: 'EMP_ID',width: 70, sortable: true,align: 'left', locked: true//, editor: new Ext.form.NumberField({allowBlank: true })
            },                                   
            {header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME',width: 80,align: 'left', locked: true, summaryType: 'count'//, editor: new Ext.form.TextField({allowBlank: true})
            },
            {header: "部门",  menuDisabled: true, dataIndex: 'DEP_ID', width: 80, sortable: true, align: 'right',
                renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Depts');
                        var index = store1.find('di_value', value);                        
                        if (index != -1) {
                            var rec = store1.getAt(index);
                            return rec.data.di_caption;
                        }
                    }
            },      
            {header: "级别", menuDisabled: true, dataIndex: 'LEV',width: 90, sortable: true,align: 'right',// editor: {xtype: 'combolevel'},
                renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                        var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Levels');
                        var index = store1.find('di_value', value);                        
                        if (index != -1) {
                            var rec = store1.getAt(index);
                            switch(value){
                                case '0':
                                    color = 'black';
                                    break;
                                case '1':
                                    color = 'red';
                                    break;
                                case '2':
                                    color = 'green';
                                    break;
                                case '3':
                                    color = 'purple';
                                    break;
                                default:
                                    color = 'blue';
                            }
                            return '<font color="' + color + '">' + rec.data.di_caption + '</font>';
                        }
                    }
            }
        ];

        this.tbar = [
            {
                xtype: 'combolevel',
                labelWidth: 60,
                width: 200,
                fieldLabel: '权限级别'
            }, '-',
            {
                xtype: 'button',
                text : '添加',
                itemId: 'userauthorization_add',
                iconCls: 'add',
                action: 'add'
            },
            // {
            //     xtype: 'button',
            //     text : '删除',
            //     itemId: 'userauthorization_delete',
            //     iconCls: 'delete',
            //     action: 'delete'
            // },
            // {
            //     xtype: 'button',
            //     text : '保存',
            //     itemId: 'userauthorization_disk',
            //     iconCls: 'disk',
            //     action: 'disk'
            // },
            '->',
            {
                xtype: 'button',
                text : '刷新',
                itemId: 'userauthorization_refresh',
                iconCls: 'refresh',
                action: 'refresh'
            }
        ];
        this.callParent(arguments);
    }

});
