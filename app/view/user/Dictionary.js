Ext.define('JxkpApp.view.user.Dictionary' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.dictionarylist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。
    title : 'All Users', 

    requires: [
        'JxkpApp.view.combo.Level'
    ],

    store: Ext.create('JxkpApp.store.Users'),

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
                        },
                        {header: "性别",  menuDisabled: true, dataIndex: 'SEX', width: 50, sortable: true, align: 'right', //editor: {xtype: 'combogender'},
                                renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                    var store1 = Ext.StoreMgr.lookup('Genders');
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
                                        }                            
                                        return '<font color="' + color + '">' + rec.data.di_caption + '</font>';
                                    }
                                }
                        },      
                        {header: "岗位名称",  menuDisabled: true, dataIndex: 'STATION', width: 80, sortable: true, align: 'right', //editor: {xtype: 'userstation'},
                                renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                    var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Stations');
                                    var index = store1.find('di_value', value);                        
                                    if (index != -1) {
                                        var rec = store1.getAt(index);
                                        return rec.data.di_caption;
                                    }
                                }
                        },      
                        {header: "段道",  menuDisabled: true, dataIndex: 'SEGMENT', width: 50, sortable: true, align: 'right', //editor: {xtype: 'usersegment'},
                                renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
                                    var store1 = Ext.StoreMgr.lookup('Segments');
                                    var index = store1.find('di_value', value); 
                                    if (index != -1) {
                                        var rec = store1.getAt(index);
                                        return rec.data.di_caption;
                                    }
                                }
                        },      
                        {header: "人员类别", menuDisabled: true, dataIndex: 'CATEGORY',width: 80,horizontal:true,sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true })
                        },
                        {header: "文化程度", menuDisabled: true, dataIndex: 'EDU',width: 80, sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true })
                        },
                        {header: "出生年月", menuDisabled: true, dataIndex: 'BIRTHDAY',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'Y/m/d'})
                                renderer: Ext.util.Format.dateRenderer('Y/m/d')
                        },
                        {header: "工作年月", menuDisabled: true, dataIndex: 'GN',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'y/m/d' })
                                renderer: Ext.util.Format.dateRenderer('Y/m/d')
                        },
                        {header: "入局年月", menuDisabled: true, dataIndex: 'RJ',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'Y/m/d'})
                                renderer: Ext.util.Format.dateRenderer('Y/m/d')
                        },
                        {header: "身份证号", menuDisabled: true, dataIndex: 'PID',width: 80, sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true})
                        },
                        // {header: "揽投员", menuDisabled: true, dataIndex: 'LTY',width: 50, sortable: true,align: 'right', editor: new Ext.form.TextField({allowBlank: true })},           
                        {header: "岗位名称", menuDisabled: true, dataIndex: 'GWMC',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                        },
                        {header: "职级", menuDisabled: true, dataIndex: 'ZJ',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
                        },          
                        {header: "技术职务", menuDisabled: true, dataIndex: 'JSZW',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        },
                        {header: "技术级别", menuDisabled: true, dataIndex: 'JSJB',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        },           
                        {header: "岗位工资", menuDisabled: true, dataIndex: 'GWGZ',width: 80,align: 'left'//,editor: new Ext.form.NumberField({ allowBlank: true })
                        },
                        {header: "备注", menuDisabled: true, dataIndex: 'MEMO',width: 100,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
                        }
                    ],
                    tbar : [
                                {
                                    xtype: 'userdept',
                                    labelWidth: 30,
                                    width: 200,
                                    fieldLabel: '部门'
                                },
                                {text:'获取数据', iconCls:'database_connect', action: 'user_fetch'},"-",
                                {text:'遍历', iconCls:'search', action: 'user_search'},
                                {text:'清空', iconCls:'delete', action: 'user_clear_search'},"->",
                                {
                                    xtype: 'form',
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: '文件',
                                            labelWidth: 30,
                                            width: 400,
                                            flex: 1,
                                            msgTarget: 'side',
                                            name: 'file',
                                            allowBlank: false,
                                            buttonText: '选择一个文件...'
                                        }
                                    ]
                                },
                                {text:'Excel导入', iconCls:'disk', action: 'inExcel'},
                                "-",
                                // {
                                //     xtype: 'combolevel',
                                //     labelWidth: 60,
                                //     width: 200,
                                //     fieldLabel: '权限级别'
                                // },
                                {text:"Excel导出", iconCls:"exportexcel", action: 'exportExcel'}
                    ]

        });

        // me.columns = [
        //     {xtype: 'rownumberer', header: '序号', width: 30},
        //     {header: "工号", menuDisabled: true, dataIndex: 'EMP_ID',width: 70, sortable: true,align: 'left', locked: true//, editor: new Ext.form.NumberField({allowBlank: true })
        //     },                                   
        //     {header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME',width: 80,align: 'left', locked: true, summaryType: 'count'//, editor: new Ext.form.TextField({allowBlank: true})
        //     },
        //     {header: "部门",  menuDisabled: true, dataIndex: 'DEP_ID', width: 80, sortable: true, align: 'right',
        //         renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
        //                 var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Depts');
        //                 var index = store1.find('di_value', value);                        
        //                 if (index != -1) {
        //                     var rec = store1.getAt(index);
        //                     return rec.data.di_caption;
        //                 }
        //             }
        //     },      
        //     {header: "级别", menuDisabled: true, dataIndex: 'LEV',width: 90, sortable: true,align: 'right',// editor: {xtype: 'combolevel'},
        //         renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
        //                 var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Levels');
        //                 var index = store1.find('di_value', value);                        
        //                 if (index != -1) {
        //                     var rec = store1.getAt(index);
        //                     switch(value){
        //                         case '0':
        //                             color = 'black';
        //                             break;
        //                         case '1':
        //                             color = 'red';
        //                             break;
        //                         case '2':
        //                             color = 'green';
        //                             break;
        //                         case '3':
        //                             color = 'purple';
        //                             break;
        //                         default:
        //                             color = 'blue';
        //                     }
        //                     return '<font color="' + color + '">' + rec.data.di_caption + '</font>';
        //                 }
        //             }
        //     },
        //     {header: "性别",  menuDisabled: true, dataIndex: 'SEX', width: 50, sortable: true, align: 'right', //editor: {xtype: 'combogender'},
        //             renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
        //                 var store1 = Ext.StoreMgr.lookup('Genders');
        //                 var index = store1.find('di_value', value);                        
        //                 if (index != -1) {
        //                     var rec = store1.getAt(index);
        //                     switch(value){
        //                         case '0':
        //                             color = 'black';
        //                             break;
        //                         case '1':
        //                             color = 'red';
        //                             break;
        //                         case '2':
        //                             color = 'green';
        //                             break;
        //                     }                            
        //                     return '<font color="' + color + '">' + rec.data.di_caption + '</font>';
        //                 }
        //             }
        //     },      
        //     {header: "岗位名称",  menuDisabled: true, dataIndex: 'STATION', width: 80, sortable: true, align: 'right', //editor: {xtype: 'userstation'},
        //             renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
        //                 var store1 = Ext.StoreMgr.lookup('JxkpApp.store.combo.Stations');
        //                 var index = store1.find('di_value', value);                        
        //                 if (index != -1) {
        //                     var rec = store1.getAt(index);
        //                     return rec.data.di_caption;
        //                 }
        //             }
        //     },      
        //     {header: "段道",  menuDisabled: true, dataIndex: 'SEGMENT', width: 50, sortable: true, align: 'right', //editor: {xtype: 'usersegment'},
        //             renderer: function(value, cellmeta, record, rowindex, columnindex, store) {
        //                 var store1 = Ext.StoreMgr.lookup('Segments');
        //                 var index = store1.find('di_value', value); 
        //                 if (index != -1) {
        //                     var rec = store1.getAt(index);
        //                     return rec.data.di_caption;
        //                 }
        //             }
        //     },      
        //     {header: "人员类别", menuDisabled: true, dataIndex: 'CATEGORY',width: 80,horizontal:true,sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true })
        //     },
        //     {header: "文化程度", menuDisabled: true, dataIndex: 'EDU',width: 80, sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true })
        //     },
        //     {header: "出生年月", menuDisabled: true, dataIndex: 'BIRTHDAY',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'Y/m/d'})
        //             renderer: Ext.util.Format.dateRenderer('Y/m/d')
        //     },
        //     {header: "工作年月", menuDisabled: true, dataIndex: 'GN',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'y/m/d' })
        //             renderer: Ext.util.Format.dateRenderer('Y/m/d')
        //     },
        //     {header: "入局年月", menuDisabled: true, dataIndex: 'RJ',width: 80, sortable: true,align: 'right', //editor: new Ext.form.DateField({format: 'Y/m/d'})
        //             renderer: Ext.util.Format.dateRenderer('Y/m/d')
        //     },
        //     {header: "身份证号", menuDisabled: true, dataIndex: 'PID',width: 80, sortable: true,align: 'right'//, editor: new Ext.form.TextField({allowBlank: true})
        //     },
        //     // {header: "揽投员", menuDisabled: true, dataIndex: 'LTY',width: 50, sortable: true,align: 'right', editor: new Ext.form.TextField({allowBlank: true })},           
        //     {header: "岗位名称", menuDisabled: true, dataIndex: 'GWMC',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
        //     },
        //     {header: "职级", menuDisabled: true, dataIndex: 'ZJ',width: 80, sortable: true,align: 'right'//,editor: new Ext.form.TextField({allowBlank: true })
        //     },          
        //     {header: "技术职务", menuDisabled: true, dataIndex: 'JSZW',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
        //     },
        //     {header: "技术级别", menuDisabled: true, dataIndex: 'JSJB',width: 80,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
        //     },           
        //     {header: "岗位工资", menuDisabled: true, dataIndex: 'GWGZ',width: 80,align: 'left'//,editor: new Ext.form.NumberField({ allowBlank: true })
        //     },
        //     {header: "备注", menuDisabled: true, dataIndex: 'MEMO',width: 100,align: 'left'//,editor: new Ext.form.TextField({ allowBlank: true })
        //     }
        // ];

        // me.tbar = [
        //     {
        //         xtype: 'userdept',
        //         labelWidth: 30,
        //         width: 200,
        //         fieldLabel: '部门'
        //     },
        //     {text:'获取数据', iconCls:'database_connect', action: 'user_fetch'},"-",
        //     {text:'遍历', iconCls:'search', action: 'search'},       
        //     {text:'清空', iconCls:'delete', action: 'deleteAll'},"-",
        //     // {
        //     //     xtype: 'form',                            
        //     //     items: [
        //     //         {
        //     //             xtype: 'filefield',
        //     //             fieldLabel: '文件',
        //     //             labelWidth: 30,
        //     //             width: 400,
        //     //             flex: 1,
        //     //             msgTarget: 'side',
        //     //             name: 'file',
        //     //             allowBlank: false,
        //     //             buttonText: '选择一个文件...'
        //     //         }
        //     //     ]
        //     // },
        //     // {text:'Excel导入', iconCls:'disk', action: 'inExcel'},
        //     "->",
        //     {text:"Excel导出", iconCls:"exportexcel", action: 'exportExcel'}
        // ];
        // this.plugins = [{
        //     ptype: 'rowexpander',
        //     rowBodyTpl : new Ext.XTemplate(
        //         '<p><b>Summary:</b> aaaaa</p>'
        //     )
        // }];
        this.callParent(arguments);
    },
    buildStore : function() {
        return Ext.create('JxkpApp.store.Users', {
            //...

        });
    }
});