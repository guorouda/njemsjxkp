Ext.define('JxkpApp.controller.User', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],

	refs: [
        {
            ref: 'userlist',
            selector: 'userlist'
        },
        {
            ref: 'combolevel',
            selector: 'combolevel'
        },
        {
            ref: 'usermyform',
            selector: 'usermyform'
        },
        {
            ref: 'userauthorizationlist',
            selector : 'userauthorizationlist'
        },
        {
            ref: 'usermanagerdept',
            selector: 'usermanagerdept'
        },
        {
            ref: 'usermyformauthorization',
            selector: 'usermyformauthorization'
        },
        {
            ref: 'userdeleteform',
            selector: 'userdeleteform'
        }
    ],

    levelOriginalValue: null,

    init: function() {
        this.control({   
            'userlist checkcolumn': {
                checkchange: this.onCheckChange
            },        
            'userlist button[action=user_fetch]': {
                click: this.user_fetchData
            },
            'userlist button[action=inExcel]': {
                click: this.inExcel
            },
            'userlist': {
                edit: this.onUserAfterEdit,             
                // cellclick: this.onCellClick,
                beforeedit: this.onBeforeEdit,
                itemdblclick: this.onEditUser
            },
            'userlist button[action=user_search]': {
                click: this.onUser_Search
            },
            'userlist button[action=user_clear_search]': {
                click: this.onUser_Clear_Search
            },
            'userlist button[action=exportExcel]': {
                click: this.exportExcel
            },
            'userlist combolevel':{
                select: this.onSelect
            },
            'userdeleteform button[action=user_delete]':{
                click: this.onUserDeleteForm
            },
            'combolevel': {
                blur: this.onBlur
            },
            'usermanagerdept treepanel': {
                checkchange: this.onCheckchange,
                render: this.onPanelRendered
            },
            'usermyform button[action=add]': {
                click: this.onMyFormAdd
            },
            'usermyform button[action=disk]': {
                click: this.onMyFormDisk
            },
            'usermyform button[action=delete]': {
                click: this.onMyFormDelete
            },
            'userauthorizationlist': {
                itemdblclick: this.onEditAuthorization
            },
            'userauthorizationlist combolevel':{
                select: this.onCombolevelSelect
            },
            'userauthorizationlist button[action=refresh]':{
                click: this.onRefreshAuthorization
            },   
            'userauthorizationlist button[action=add]':{
                click: this.onAddAuthorization
            }, 
            'userauthorizationlist button[action=delete]':{
                click: this.onDeleteAuthorization
            },                                  
            'usermyformauthorization button[action=add]': {
                click: this.onMyFormAuthorizationAdd
            },
            'usermyformauthorization button[action=disk]': {
                click: this.onMyFormAuthorizationDisk
            },
            'usermyformauthorization button[action=delete]':{
                click: this.onMyFormAuthorizationDelete
            }
        });
        
    },

    onCheckChange: function(checkcolumn, rowIndex, checked, eOpts){
        var grid = checkcolumn.up('grid');
        var record = grid.getStore().getAt(rowIndex); 
        record.reject();

    },

    onUserDeleteForm: function(button){
        var me = button;
        var form = this.getUserdeleteform();
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'userdelete',
                    rq: '201609' //无用，为了后台处理统一方便
                },
                waitMsg: '正在上传&后台处理...',
                success: function(form, action) {
                    Ext.Msg.alert('成功', '文件传输成功');
                },
                failure : function(form, action) {
                    //console.log(action);
                }

            });
        }else{
             Ext.Msg.alert('错误', '选择上传的文件！');
        }

    },
    onUser_Search: function(){
        var emp_id = this.getUserlist().down('numberfield').value;
        this.getUserlist().getStore().filter('EMP_ID', emp_id);
    },
    onUser_Clear_Search: function(){
        var store = this.getUserlist().getStore();
        if(store.isFiltered( )){
            store.clearFilter();
        }
    },
    user_fetchData: function(button){
        var me = button;
        Ext.getBody().mask('数据加载中...');
        var store = this.getUserlist().getStore();
        store.load({
            params: {depid: me.up('userlist').down('userdept')._idValue, operation: 'user', type: 'user'}, 
            // params: {depid: '100', typ·e: 'user'}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                // Ext.Msg.alert('info', '加载完毕');
                Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
    },
    onCellClick: function(table, td, cellindex, record, tr, rowindex, e){ 	
    	var grid = this.getUserlist(); 
    	grid.columns[cellindex + 3].addCls('red');
    },
    onBeforeEdit: function(editor, e){
    	var grid = this.getUserlist(); 
    	grid.columns[e.colIdx + 3].addCls('red'); 
        levelOriginalValue = e.originalValue;       

    },
    onUserAfterEdit: function(editor, e){        
        if(e.field == 'QUIT'){
            e.record.reject();
            return false;
        }
        var record = e.record;        
        var grid = this.getUserlist();     
        var newvalue;

        var rq = Ext.Date.format(record.data.ATT_MONTH, 'Ym');

        if(e.value === null){
            grid.columns[e.colIdx + 3].removeCls('red');
            record.set(e.field, e.originalValue);
            return;
        }

        Ext.Ajax.request({   
            url:'/jxkpserver/UserAction.do?action=setUser',
            params:{
                oldvalue: e.originalValue,
                value: e.value,
                empid: record.data.EMP_ID,
                rq: rq,
                field: e.field
            },
            success: function(resp, opts) { 
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success === true){
                    record.commit();
                }
            }, 
            failure: function(resp,opts) {
                var error = '发生故障，请检查再试，或联系系统管理员';
                if(resp.responseText !== ''){
                    var respText = Ext.JSON.decode(resp.responseText); 
                    error = respText.eror;
                } 
                Ext.Msg.alert('错误', error); 
                record.set(e.field, e.originalValue);
            }   
        }); 

    	grid.columns[e.colIdx + 3].removeCls('red');
    	
    },
    inExcel: function(button){
        var me = button;
        var form = this.getUserlist().down('toolbar').down('form');
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'user',
                    rq: '201606'
                },
                waitMsg: '正在上传&后台处理...',
                success: function(form, action) {
                    Ext.Msg.alert('成功', '文件传输成功');
                },
                failure : function(form, action) {
                    //console.log(action);
                }

            });
        }else{
             Ext.Msg.alert('错误', '选择上传的文件！');
        }
    },
    exportExcel: function (button) {
        var me = button;
        var depid = me.up('userlist').down('userdept')._idValue;

        if(depid === null){
            Ext.Msg.alert('错误', '请选择部门！');
            return;
        }

        window.location.href = '/jxkpserver/UserAction.do?action=exportExcel&type=employee&depid=' + depid;
    },

    onBlur: function(combo, e){
        if(combo.value === null){
            // combo.value = levelOriginalValue;
            // console.log(combo);
        }
    },
    onEditUser: function(grid, rec){        
        this.getUsermyform().getForm().loadRecord(rec);
    },
    onEditAuthorization: function(grid, rec){        
        this.getUsermyformauthorization().getForm().loadRecord(rec);
    },
    onMyFormAdd: function(){
        this.getUsermyform().getForm().reset(); 
        var rec = new JxkpApp.model.User({
            BIRTHDAY: '',
            CATEGORY: '',
            DEP_ID: '',
            EDU: '',
            EMP_ID: '',
            EMP_NAME: '',
            GN: '',
            GWGZ: '',
            GWMC: '',
            ID: '',
            JSJB: '',
            JSZW: '',
            LEV: '',
            LTY: '',
            MEMO: '',
            PID: '',
            RJ: '',
            SEGMENT: '',
            SEX: '',
            STATION: '',
            ZJ: ''
        });
        this.getUsermyform().getForm().loadRecord(rec);      
    },
    onMyFormDisk: function(button){
        var me = button;

        var store = this.getUsersStore();

        var form = this.getUsermyform().getForm(); 
        var record = form.getRecord(); 
        var item = this.getUsermyform().items.items[3];
        var values = form.getValues(); 
        if(item._idValue !== null){
            var value = item._idValue;
            var reg = new RegExp("/","g");
            var msg = reg.test(value);
            if(msg){
                value = value.substring(value.lastIndexOf('/') + 1);
            }
            values.DEP_ID = value;
        }else{
            values.DEP_ID = item.value;
        }       
        
        record.set(values);
        
        if(record.data.ID === ''){
            var rowlength = store.data.length; 
            store.insert(rowlength, record );            
        }
        var store1 = me.up('usermyform').ownerCt.down('userlist').getStore();
        store1.getProxy().setExtraParam('id',  record.data.ID);
        store1.getProxy().getWriter().writeAllFields = false;
        store1.sync({
            callback: function(){
                    alert('ok!');
            }
        });       
    },
    onMyFormDelete: function(){
        this.getUsermyform().getForm().reset();
    },
    onSearch: function(button){
        var records = this.getUserlist().getSelectionModel().getSelection();

        console.log(records);

        // this.getUsersStore().each(function(record){
        //     var value = record.get("EMP_NAME");
        //     console.log(record);
        // });
    },
    onCombolevelSelect: function(button){
        var me = button;

        Ext.getBody().mask('数据加载中...');

        var store = this.getUserauthorizationlist().getStore();

        store.load({
            params: {operation: 'user', type: 'userauthorization', lev: me.value}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                Ext.getBody().unmask();
                // Ext.Msg.alert('info', '加载完毕');
               // me.up('authorizationlist').expandAll(); 

            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false        

        }); 

    },
    onRefreshAuthorization: function(){        
        var value = this.getUserauthorizationlist().down('combolevel').getValue();

        Ext.getBody().mask('数据加载中...');

        var store = this.getUserauthorizationlist().getStore();

        store.load({
            params: {operation: 'user', type: 'userauthorization', lev: value}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                Ext.getBody().unmask();
                // Ext.Msg.alert('info', '加载完毕');
               // me.up('authorizationlist').expandAll(); 

            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false        

        });        
    },
    onAddAuthorization: function(){        
        var rec = new JxkpApp.model.User({
            ID: '',
            DEP_ID: '',
            EMP_ID: ''
        });
        this.getUsermyformauthorization().loadRecord(rec);       
    },
    onDeleteAuthorization: function(){
        var recs = this.ggetUsermyformauthorization().getView().getSelectedRecords();

      
    },    
    onSelect: function(button){
        var me = button;

        var store = this.getUserlist().getStore();

        store.load({
            params: {type: 'user', depid: '100'}, 
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

    },
    onCheckchange: function(node, checked, e){
        console.log(node);
        console.log(this.getUsermyformauthorization().down('textarea'));
    },
    onPanelRendered: function(){
        console.log(this.getUsermanagerdept());
    },
    onMyFormAuthorizationAdd: function(button){   

        var rec = new JxkpApp.model.User({
            ID: '',
            DEP_ID: '',
            EMP_ID: ''
        });
        this.getUsermyformauthorization().loadRecord(rec);

    },
    onMyFormAuthorizationDelete: function(button){


    },
    onMyFormAuthorizationDisk: function(button){
        var store = this.getUserauthorizationlist().getStore();
        var selections = this.getUserauthorizationlist().getSelectionModel().getSelections();
        console.log(selections);        
    }

});