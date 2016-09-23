Ext.define('JxkpApp.store.ManagerDepts', {
	extend: 'Ext.data.TreeStore',

	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

    type: 'authorization',

    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'JxkpApp.model.Dept',
            proxy: {
                type: 'ajax',
                extraParams: {
                    action: 'list',                    
                    type: 'authorization'
                },
                url: '/jxkpserver/DeptAction.do',
                reader: {
                    type: 'json',
                },
                listeners: {
                    exception: {
                        fn: me.onAjaxException,
                        scope: me 
                    }
                }
            },
            sorters: [{
                property: 'leaf',
                direction: 'DESC'
            }, {
                property: 'text',
                direction: 'ASC'
            }],
            listeners: {
                beforeload: {
                    fn: me.onTreeStoreBeforeLoad,
                    scope: me
                }
                // ,
                // expand: function(node, e){
                //     node.proxy.extraParams.type = me.type;
                // }
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
    },
    onTreeStoreBeforeLoad: function(store, operation, eOpts) {
        // if(operation.params.manul === true){
        //     return true;
        // }
        // return false;
        //console.log(operation);
        // console.log(store.ownerTree);
    }

});