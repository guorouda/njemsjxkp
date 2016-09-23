Ext.define('JxkpApp.store.WorkFlowDepts', {
	extend: 'Ext.data.TreeStore',

	requires: [
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'JxkpApp.model.Dept',
            proxy: {
                type: 'ajax',
                extraParams: {
                    action: 'workflowlist'
                },
                url: '/jxkpserver/DeptAction.do',
                reader: {
                    type: 'json'
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
        if(Ext.getCmp('salarymonth').isValid() && Ext.getCmp('salarymonth').value !== undefined){
            var rq =  Ext.Date.format(new Date(Ext.getCmp('salarymonth').value), 'Ym');
            var new_params = {rq: rq};
            Ext.apply(store.proxy.extraParams, new_params);
        }
    }

});