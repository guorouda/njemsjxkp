Ext.define('JxkpApp.controller.Deploy', {
    extend: 'Ext.app.Controller',

	refs: [
        {
            ref: 'deploylist',
            selector: 'deploylist'
        },
        {
            ref: 'deployformlist',
            selector: 'deployformlist'
        },
        {
            ref: 'deploywithformlist',
            selector: 'deploywithformlist'
        },
        {
            ref: 'deployquerylist',
            selector: 'deployquerylist'
        },
        {
            ref: 'handtopostmanall',
            selector: 'handtopostmanall'
        },
        {
            ref: 'handtopostmandetail',
            selector: 'handtopostmandetail'
        },
        {
            ref: 'reportdeliveryfail',
            selector: 'reportdeliveryfail'
        },
        {
            ref: 'reportdeliveryok',
            selector: 'reportdeliveryok'
        },
        {
            ref: 'realdeliveryfail',
            selector: 'realdeliveryfail'
        },        
        {
            ref: 'realdeliveryok',
            selector: 'realdeliveryok'
        },
        {
            ref: 'daysalarylist',
            selector: 'daysalarylist'
        }
    ],

    stores: [
        'JxkpApp.store.crowdshare.Mails', 
        'JxkpApp.store.crowdshare.DeployQuerys'
    ],

    init: function() {
        this.control({
            'button[action=deploy_fetch]': {
                click: this.onUser_fetch
            },
            'deploylist': {
                itemdblclick: this.onEditUser
            },
            'deployformlist button[action=disk]': {
                click: this.onApprove
            },
            'deployformlist button[action=delete]': {
                click: this.onDeny
            },
            'deployformlist button[action=add]': {
                click: this.onAdd
            },
            'button[action=daysalary_fetch]':{
                click: this.onDaySalaryQuery
            },
            'button[action=deployquery_fetch]':{
                click: this.onDeployQuery
            },
            'button[action=deploypostman_fetch]':{
                click: this.onDeployPostman
            },
            'handtopostmandetail': {
                selectionchange: this.onAllSelectionChange
            },
            'button[action=handtopostmandetailremove]': {
                click: this.onDeleteHandToPostmanDetail
            },
            'button[action=handtopostmandetaildisk]': {
                click: this.onSaveHandToPostmanDetail
            },
            'button[action=handback_qr_fetch]':{
                click: this.OnHandbackQrFetch
            },
            'button[action=handback_ok]': {
                click: this.OnHandbackOK
            }

        });        
    },

    onDaySalaryQuery: function(button){
        var grid = this.getDaysalarylist();
        var store = this.getDaysalarylist().getStore();
        var date = button.ownerCt.down('datefield');
        // store.getProxy().setExtraParam('date', date.value);
        store.load({
            params: {
                date: date.value
            }
        });
    },

    OnHandbackOK: function(button){
        var store  = this.getReportdeliveryok().getStore();
        for(var i=0; i<store.getCount(); i++){
            var rec = store.getAt(i);
            rec.set('PAY', '1');
        }
        store.getProxy().setExtraParam('type','pay');
        store.sync();
    },


    OnHandbackQrFetch: function(button){
        var me = button;
        var postman = me.up('handbacklist').down('textfield');

        var store  = this.getReportdeliveryok().getStore();
        var store1 = this.getReportdeliveryfail().getStore();

        store.load({
            params: {
                postman: postman.value,
                handler: 1

            },
            // params: {depid: '100', typ·e: 'user'},
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(r, options, success){
                if(!success){
                    console.log(r);
                    Ext.Msg.alert('info', "");
                }else{
                    
                }
                // Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });

        store1.load({
            params: {
                postman: postman.value,
                handler: 0
            },
            // params: {depid: '100', typ·e: 'user'},
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(r, options, success){
                if(!success){
                    console.log(r);
                    Ext.Msg.alert('info', "");
                }else{
                    
                }
                // Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });



    },

    onSaveHandToPostmanDetail: function(button){
        var grid = this.getHandtopostmandetail();
        var store = grid.getStore();
        store.sync({
            callback: function(){
                alert('成功！');
            }
        });        
    },

    onDeleteHandToPostmanDetail: function(button){
        var grid = this.getHandtopostmandetail();
        var store = grid.getStore();

        var selections = grid.getView().getSelectionModel().getSelection();
        for(var i=0; i < selections.length; i++){
            store.remove(selections[i]);
        }

        // console.log(selections);
    },

    onAllSelectionChange: function(grid, selected, eOpts){
        // console.log(grid);
        // console.log(selected);
        // console.log(eOpts);
    },

    onDeployPostman: function(button){
        var me = button;
        var storeAll = this.getHandtopostmanall().getStore();
        storeAll.removeAll();

        var postman = me.up('handtopostmanall').down('textfield');

        if(postman.value === undefined){
            Ext.Msg.alert('info', '格式不对请检查！');
            return;
        }



        var grid = this.getHandtopostmandetail();
        grid.down('#mailnumber').focus(false, 200);

        storeAll.load({
            params: {postman: postman.value},
            // params: {depid: '100', typ·e: 'user'},
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(r, options, success){
                if(!success){
                    console.log(r);
                    Ext.Msg.alert('info', "");
                }else{
                    
                }
                // Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });

        

        var storeDetail =  grid.getStore();
        storeDetail.removeAll();

        storeDetail.load({            
            params: {postman: postman.value},
            // params: {depid: '100', typ·e: 'user'},
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(r, options, success){
                if(!success){
                    console.log(r);
                    Ext.Msg.alert('info', "错误，请检查");
                }
                // Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false

        });

    },    
    onDeployQuery: function(button){
        var me = button;
        var store = this.getDeployquerylist().getStore();

        var date = me.up('deployquerylist').down('datefield');

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
    },
    onApprove: function(button){
        var me = button;
        var store = Ext.getStore('crowdsharemails');

        var form = this.getDeployformlist().getForm();
        var record = form.getRecord();
        var values = form.getValues();

        // console.log(values);
        // console.log(record);

        record.set(values);

        if(record.data.id === ''){
            var rowlength = store.data.length;
            store.insert(rowlength, record );
        }
        var store1 = me.up('deployformlist').ownerCt.down('deploylist').getStore();
        store1.getProxy().setExtraParam('id',  record.data.ID);
        store1.getProxy().getWriter().writeAllFields = false;
        store1.sync({
            callback: function(){
                alert('成功！');
            }
        });
    },
    onAdd: function (button) {
        this.getDeployformlist().getForm().reset();
        var rec = new JxkpApp.model.crowdshare.Mail({
            id: '',
            mailnumber: '',
            name: '',
            address: '',
            state: '',
            mobile: '',
            username: '',
            employee_id: '',
            frequency: ''
        });
        this.getDeployformlist().getForm().loadRecord(rec);
    },
    onDeny: function (button) {
        var me = button;
        var form = this.getDeployformlist().getForm();
        var record = form.getRecord();
        var values = form.getValues();
        values.active = 0;
        record.set(values);
        var store = me.up('deployformlist').ownerCt.down('deploylist').getStore();
        store.getProxy().setExtraParam('id',  record.data.ID);
        store.getProxy().getWriter().writeAllFields = false;
        store.sync({
            callback: function(){
                alert('ok!');
            }
        });
    },
    onEditUser: function(grid, rec) {
        this.getDeployformlist().getForm().loadRecord(rec);
    },
    onUser_fetch: function(button){
        var me = button;
        var store = this.getDeploylist().getStore();

        var date = me.up('deploylist').down('datefield');

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