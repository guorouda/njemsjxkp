Ext.define('JxkpApp.view.user.Authorization', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.authorizationlist',
    
    requires: [
        'Ext.data.TreeStore'
    ],
       
    rootVisible: false,
    useArrows: true,
    frame: true,
    title: 'Check Tree',
    
    initComponent: function(){
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: '/jxkpserver/MenuAction.do',
                    extraParams: {
                        action: 'list',
                        checked: true
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
                        // element: 'el', //bind to the underlying el property on the panel
                        fn: function(store, operation, eOpts){ 
                            var new_params = {id: Ext.getCmp('levid').value};  
                            Ext.apply(store.proxy.extraParams, new_params);      
                        }
                    }
                }

            }),
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [ 
                    { xtype: 'button', text: '新建', iconCls: 'add', scope: this, handler: this.onAddClick },                   
                    {
                        xtype: 'combolevel',
                        anchor: '100%',
                        fieldLabel: '级别',
                        labelWidth: 70,
                        labelAlign: 'right',
                        id: 'levid',
                        name: 'LEV',
                        listeners:{
                             scope: this,
                             'select': this.onComboClick
                        }
                    },
                    { xtype: 'button', text: '保存', iconCls: 'disk', scope: this, handler: this.onSaveClick }
                ]
            }]

        });
        this.callParent();
        this.expandAll();
    },

    onAddClick: function(button){
        var me = button; 

        var records = this.getView().getChecked();
                   
        Ext.Array.each(records, function(rec){
           rec.set('checked', false);
        }); 

        me.up('toolbar').down('combolevel').reset();
    },

    onSaveClick: function(button){
        var me = button;
        var records = this.getView().getChecked(),
            names = [];
                   
        Ext.Array.each(records, function(rec){
            names.push(rec.get('id'));
        });        

        Ext.define('MyRecord', {
            extend: 'Ext.data.Model',

            fields: [
                {name: 'di_value', type: 'String'},
                {name: 'di_caption', type: 'String'},
                {name: 'authorization', type: 'String'}           
            ]
        });

        var store = Ext.StoreMgr.lookup('JxkpApp.store.combo.Levels');
        var combo = me.up('toolbar').down('combolevel').value,
            record;
        if(combo !== null){
            record = store.findRecord('di_value', combo);
            record.set('authorization', names.join(','));
        }else{
            var rec = Ext.create('MyRecord', {
                di_caption: me.up('toolbar').down('combolevel').rawValue,
                di_value: '',
                authorization: names.join(',')}
            );        
            store.insert(0, rec);
        }
        store.sync();


    },

    onComboClick: function(combo) {
        var me = combo;
        var store = me.up('authorizationlist').getStore();
        store.load({
            params: {id: me.value}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                // Ext.Msg.alert('info', '加载完毕');
               // me.up('authorizationlist').expandAll(); 
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false        
        });
  //      this.expandAll();
    }

});
