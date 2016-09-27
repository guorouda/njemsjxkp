Ext.define('JxkpApp.store.Depts', {
	extend: 'Ext.data.TreeStore',

	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json',
        'JxkpApp.model.Dept'
	],

    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'JxkpApp.model.Dept',
            // root: {
            //     text: '南京分公司',
            //     id: '0'
            // },
            proxy: {
                type: 'ajax',
                // extraParams: {
                //     action: 'list',
                //     type: 'user'
                // },
                // url: '/jxkpserver/DeptAction.do?action=list&type=user',
                api: {
                    create: '/jxkpserver/DeptAction.do?action=save',
                    read: '/jxkpserver/DeptAction.do?action=list&type=user',
                    update: '/jxkpserver/DeptAction.do?action=save',
                    destroy: '/jxkpserver/DeptAction.do?action=delete'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    encode: true,  
                    allowSingle: true, // 
                    root: "data"
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