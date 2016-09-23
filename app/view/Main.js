Ext.define('JxkpApp.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'JxkpApp.view.user.List',
        'JxkpApp.view.user.MyForm',
        'JxkpApp.view.user.Salary'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
        split: false,
        height: 51,
        bodyStyle:'background-image:url(resources/icon/jg.png);background-repeat: repeat-x;',
        itemId: 'headerPanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
           {  
                xtype: 'image', //或者xtype: 'component',
                width: 352, //图片宽度  
                height: 51, //图片高度
                src: 'resources/icon/header.png'    //指定url路径
            },
            {
                xtype: 'container',
                flex: 1
            },
            {
                xtype: 'container',
                // width: 370,
                // cls: 'whitewords' ,
                id: 'userinfolabel' ,
                flex: 1
            },
            {
                xtype: 'container',
                width: 40,
                html: '<a href="/jxkpserver/UserAction.do?action=logout");"><p style="color:white">退出</p></a>'
            },
            {
                xtype: 'image', //或者xtype: 'component',
                width: 59, //图片宽度
                height: 51, //图片高度
                src: 'resources/icon/EMS_man.png'    //指定url路径
            }
        ]
    },{
        region: 'west',
        xtype: 'panel',
        title: '导航菜单',
        collapsible: true,
        layout: 'fit',
        split: true,
        width: 180,
        items: [
            {
                xtype: 'treepanel',                
                store: 'Menus',
                lines: false,
                rootVisible: false,
                action: 'auz',
                viewConfig: {
                    rootVisible: false                    
                }
            }
        ],
        tools: [
            {
                xtype: 'tool',
                tooltip: '刷新',
                type: 'refresh',
                listeners: {
                    click: function(tool, e, owner, eOpts) {
                        Ext.StoreMgr.lookup('Menus').load();
                    }
                }
            },
            {
                xtype: 'tool',
                tooltip: '全部收起',
                type: 'collapse',
                listeners: {
                    click: function(tool, e, owner, eOpts) {

                    }
                }
            },
            {
                xtype: 'tool',
                tooltip: '全部展开',
                type: 'expand',
                listeners: {
                    click: function(tool, e, owner, eOpts) {

                    }

                }
            }
        ]

    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[
        // {
        //     title: '绩效',
        //     xtype: 'salarylist',
        //     iconCls: 'salary'
        // },
        // {
        //     title: '考勤',
        //     xtype: 'attendencelist',
        //     iconCls: 'attendence'
        // },
        // {
        //     title: '考评',
        //     xtype: 'scorelist',
        //     iconCls: 'score'
        // },
        // {   xtype: 'panel',
        //     layout: 'border',
        //     title: '人员',
        //     iconCls: 'user',
        //     items: [{                
        //         xtype: 'userlist',
        //         region: 'center'
        //     },
        //     {   xtype: 'usermyform',
        //         region: 'east',
        //         split: true,
        //         collapsible: true

        //     }
        // ]},
        // {
        //     title: '计件绩效导入',
        //     xtype: 'listlist',
        //     iconCls: 'database_refresh'
        // }
        ]
    },{
        xtype: 'panel',
        region: 'south',
        split: false,
        height: 20,
        itemId: 'bottomPanel',
        items:[
    
        ]
    }]

});