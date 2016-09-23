Ext.define('JxkpApp.store.Menus', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'JxkpApp.model.Menu',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            autoLoad: true,
            model: 'JxkpApp.model.Menu',
            root: {
                text: 'Root',
                id: 0,
                leaf: false,
                expanded: false
            },
            proxy: {
                type: 'ajax',
                extraParams: {
                    action: 'list',
                    checked: false
                },
                url: '/jxkpserver/MenuAction.do',
                reader: {
                    type: 'json'
                },
                listeners: {
                    exception: {
                        fn: me.onAjaxException,
                        scope: me
                    }
                }
            }
        }, cfg)]);
    },

    onAjaxException: function(proxy, request, operation, eOpts) {
        if(request.status == 200){  
            Ext.getBody().mask();           
            Ext.widget('userlogin', {renderTo: Ext.getBody()});
            return;
        }
        Ext.MessageBox.show({
            title: '远程访问异常',
            msg: operation.getError(),
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });
    }

});