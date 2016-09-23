Ext.define('JxkpApp.controller.Postman', {
    extend: 'Ext.app.Controller',

	refs: [
        {
            ref: 'registerlist',
            selector: 'registerlist'
        },
        {
            ref: 'registerformlist',
            selector: 'registerformlist'
        },
        {
            ref: 'registerwithformlist',
            selector: 'registerwithformlist'
        }
    ],
    stores: ['JxkpApp.store.crowdshare.Users'],

    init: function() {
        this.control({
            'button[action=user_fetch]': {
                click: this.onUser_fetch
            },
            'registerlist': {
                itemdblclick: this.onEditUser
            },
            'registerformlist button[action=disk]': {
                click: this.onApprove
            },
            'registerformlist button[action=delete]': {
                click: this.onDeny
            },

        });
        
    },
    onApprove: function(button){
        var me = button;
        var form = this.getRegisterformlist().getForm();
        var record = form.getRecord();
        var values = form.getValues();
        values.active = 1;
        record.set(values);
        var store = me.up('registerformlist').ownerCt.down('registerlist').getStore();
        store.getProxy().setExtraParam('id',  record.data.ID);
        store.getProxy().getWriter().writeAllFields = false;
        store.sync({
            callback: function(){
                alert('ok!');
            }
        });
    },
    onDeny: function (button) {
        var me = button;
        var form = this.getRegisterformlist().getForm();
        var record = form.getRecord();
        var values = form.getValues();
        values.active = 0;
        record.set(values);
        var store = me.up('registerformlist').ownerCt.down('registerlist').getStore();
        store.getProxy().setExtraParam('id',  record.data.ID);
        store.getProxy().getWriter().writeAllFields = false;
        store.sync({
            callback: function(){
                alert('ok!');
            }
        });
    },
    onEditUser: function(grid, rec) {
        this.getRegisterformlist().getForm().loadRecord(rec);
        this.getRegisterformlist().down('#imgFront').setSrc(rec.data.frontpic);
    },
    onUser_fetch: function(button){
        var me = button;

        var store = this.getRegisterlist().getStore();

        var date = me.up('registerlist').down('datefield');

        if((!date.isValid()) || (date.value === undefined)){
            Ext.Msg.alert('info', '月份格式不对请检查！');
            return;
        }
        store.load({
            params: {date: Ext.Date.format(new Date(date.value), 'Ymd')},
            // params: {depid: '100', typ·e: 'user'}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                // Ext.Msg.alert('info', '加载完毕');
                // Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
    }

});