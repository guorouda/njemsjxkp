Ext.define('JxkpApp.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'salaryformlist',
            selector: 'salaryformlist'
        },
        {
            ref: 'salarylist',
            selector: 'salarylist'
        },
        {
            ref: 'salaryform',
            selector: 'salaryform'    
        },
        {
            ref: 'userlogin',
            selector: 'userlogin'
        },
        {
            ref: 'treepanel',
            selector: 'treepanel'
        },
        {
            ref: 'tabpanel',
            selector: 'tabpanel'
        },
        {
            ref: 'hrlist',
            selector: 'hrlist'
        },
        {
            ref: 'checksinglelist',
            selector: 'checksinglelist'
        },
        {
            ref: 'deptmanagementlist',
            selector: 'deptmanagementlist'
        },
        {
            ref: 'innersalary_fail_loglist',
            selector: 'innersalary_fail_loglist'
        }
    ],

    stores: [
        'JxkpApp.store.combo.Stations',
        'JxkpApp.store.combo.Depts',
        'JxkpApp.store.combo.DeptTypes',
        'Genders',
        'Segments',
        'Menus',
        'Directions'
    ],

    init: function() {
        this.control({
            // 'tabpanel > panel': {
            //     render: this.onPanelRendered
            // },
            'viewport > listlist': {
            },
            'userlogin button[action=login]': {
                click: this.login
            },
            'listlist button[action=fetch]': {
                click: this.fetchData
            },
            'listlist button[action=deleteAll]': {
                click: this.deleteAll
            },
            'listlist button[action=deploy]': {
                click: this.deploydata
            },
            'salarylist button[action=salary_fetch]': {
                click: this.salary_fetchData
            },
            'salarylist button[action=upreport]': {
                click: this.onUpReport
            },
            'salarylist button[action=backreport]': {
                click: this.onBackReport
            }, 
            'salarylist button[action=inExcel]': {
                click: this.inExcel
            },
            'salarylist button[action=import]': {
                click: this.onImport
            },            
            'salarylist button[action=exportExcel]': {
                click: this.exportExcel
            },
            'salarylist': {
                edit: this.onAfterEdit,             
                cellclick: this.onCellClick,                
                beforeedit: this.onBeforeEdit,
                select: this.onSalarySelect

            },
            'personsalarylist' :{
                select: this.onPersonSalarySelect
            },
            'panel > treepanel[action=auz]': {
                itemclick: this.OnTreePanelItemClick
                // ,
                // select: this.OnTreePanelSelect
            },
            'hrlist button[action=fileupload]':{
                click: this.OnNophoto
            },
            'hrlist button[action=downloadExcel]':{
                click: this.OnDownloadExcel
            },
            'salaryform workflowdept':{
                'checkchange': this.onSalaryformCheckchange
            },
            'salaryform button[action=report]': {
                'click': this.onReportClick
            },
            'salaryform button[action=withdraw]': {
                'click': this.onWithdrawClick
            },
            'salaryform button[action=expandAll]': {
                'click': this.onExpandAllClick
            },
            'innersalary_fail_loglist button[action=innersalary_fail_log_query]' :  {
                'click': this.onInnerSalary_fail_logClick
            }            
        });
        
    },

    onInnerSalary_fail_logClick: function(button){
        var store = this.getInnersalary_fail_loglist().getStore();
        var month = button.up('innersalary_fail_loglist').down('datefield').value ;
        store.load({
            params: {month: Ext.Date.format(new Date(button.up('innersalary_fail_loglist').down('datefield').value), 'Ymd')}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){
                Ext.Msg.alert('信息', '加载完毕');
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        }

        );
    },

    onExpandAllClick: function(){
        this.getSalaryform().down('workflowdept').expandAll(
            function(o) {
                 // console.log(o);
            }, this
        );
    },
    onReportClick: function(){
        
        var ids = this.getSalaryform().down('workflowdept').getChecked();
        var i = ids.length;
        while (i--) {
            ids[i] = ids[i].internalId;
        }
        var month = this.getSalarylist().down('monthfield').value;
        Ext.Ajax.request({
            url:'/jxkpserver/UserAction.do?action=doReport',
            params:{
               ids: ids,
                month: Ext.Date.format(new Date(month), 'Ym')
            },
            success: function(resp, opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success === true){
                    Ext.Msg.alert('信息', '已上报');
                }
            },
            failure: function(resp,opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                Ext.Msg.alert('错误', respText.error);
            }
        });
    },
    onWithdrawClick: function(){

        var ids = this.getSalaryform().down('workflowdept').getChecked();
        var i = ids.length;
        while (i--) {
            // console.log(ids[i]);
            ids[i] = ids[i].internalId;
        }
        var month = this.getSalarylist().down('monthfield').value;
        Ext.Ajax.request({
            url:'/jxkpserver/UserAction.do?action=withdraw',
            params:{
                ids: ids,
                month: Ext.Date.format(new Date(month), 'Ym')
            },
            success: function(resp, opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success === true){
                    // Ext.getBody().unmask();
                    Ext.Msg.alert('信息','成功撤回');
                }
            },
            failure: function(resp,opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                Ext.Msg.alert('错误', respText.error);
            }
        });
    },
    onSalaryformCheckchange: function(node, checked , e){
        findchildnode(node);
        function findchildnode(nodes) {
            var childnodes = nodes.childNodes;
            for(var i=0;i<childnodes.length;i++){  //从节点中取出子节点依次遍历
                var node = childnodes[i];
                node.set('checked', checked);
                if(nodes.childNodes.length>0){  //判断子节点下是否存在子节点
                    findchildnode(node);    //如果存在子节点  递归
                }
            }
        }
    },

    onSalarySelect: function(me, record, index, e){
        var c = record.data.check;
        var grid = this.getChecksinglelist();
        var store = grid.getStore();
        store.removeAll();
        for(var val in c){
            var rec = Ext.create('JxkpApp.model.Check', {
                DEP_NAME: c[val].DEP_NAME,
                EMP_ID: c[val].EMP_ID,
                EMP_NAME: record.data.EMP_NAME,
                MONEY: c[val].MONEY,
                MEMO: c[val].MEMO}
            );
            store.insert(0, rec);
        }

    },

    onPersonSalarySelect: function(me, record, index, e){
        var c = record.data.check;
        var grid = this.getChecksinglelist();
        var store = grid.getStore();
        store.removeAll();
        for(var val in c){
            var rec = Ext.create('JxkpApp.model.Check', {
                DEP_NAME: c[val].DEP_NAME,
                EMP_ID: c[val].EMP_ID,
                EMP_NAME: record.data.EMP_NAME,
                MONEY: c[val].MONEY,
                MEMO: c[val].MEMO}
            );
            store.insert(0, rec);
        }

    },

    onPanelRendered: function() {
        // console.log('The panel was rendered');
    },
    login: function(button) {
        var win = button.up('window'), 
        form = win.down('form');
        var formValues = form.getForm().getValues();

        Ext.Ajax.request({   
            url:'/jxkpserver/UserAction.do?action=login&app=jxkp_',
            params:{
                emp_id: formValues.name,
                password: formValues.password
            },
            success: function(resp, opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success === true){
                    Ext.getBody().unmask();
                    win.close();
                    // Ext.getCmp('userinfolabel').setText('工号: ' + respText.emp_name + '\r\n' +  '所在部门: ' + respText.dept_name +  '\r\n' +  '系统级别: ' + respText.lev_name);
                    // var values = '工号: ' + respText.emp_name + '</br>' +  '所在部门: ' + respText.dept_name +  '</br>' +  '系统级别: ' + respText.lev_name;
                    // document.getElementById('userinfo-innerCt').value  =  values;
                    Ext.getStore('Menus').load({params: {action: 'list', node: 'root'}});
                    Ext.getStore("Segments").load({
                        scope: this,
                        callback: function(records, operation, success) {
                            // 对象 operation 包含
                            // 所有 load 操作的详细信息
                            // console.log(records);
                        }
                    });
                    // EXt.getStore("JxkpApp.store.combo.Levels").load({
                    //     scope: this,
                    //     callback: function(records, operation, success) {
                    //         // 对象 operation 包含
                    //         // 所有 load 操作的详细信息
                    //         console.log(operation);
                    //     }
                    // });
                    Ext.getStore('JxkpApp.store.combo.Stations').load(

                    );    
                    Ext.getStore('JxkpApp.store.combo.Depts').load(
                        
                    );
                    Ext.getStore('JxkpApp.store.combo.Levels').load(
                        
                    );
                    Ext.getStore('Directions').load(

                    );

                }
            }, 
            failure: function(resp,opts) { 
                var respText = Ext.JSON.decode(resp.responseText); 
                Ext.Msg.alert('错误', respText.error); 
            }   
        });    

    },
    onUpReport: function(button){

    },
    onBackReport: function(button){

    },
    fetchData: function(button){
        var me = button;
        if(!me.up('listlist').down('monthfield').isValid()){
            Ext.Msg.alert('info', '月份格式不对请检查！');
            me.up('listlist').setActive(true, me.up('listlist').down('monthfield'));
            return;
        }
        this.getStore("Lists").load({
            params: {depid: me.up('listlist').down('userdept')._idValue, month: Ext.Date.format(new Date(me.up('listlist').down('monthfield').value), 'Ym')}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){
                Ext.Msg.alert('信息', '加载完毕');
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
    },
    deleteAll: function(button){
        this.getStore("Lists").removeAll();
    },
    deploydata: function(button){
        Ext.Ajax.request({
            url: '/jxkpserver/UserAction.do?action=setInnerData2Outer',
            params: {
                // type: 'set'
            },
            success: function(response){
                var text = response.responseText;
                // process server response here
                alert("ok");
            }
        });
    },
    salary_fetchData: function(button){
        var me = button;
        if(!me.up('salarylist').down('monthfield').isValid()){
            Ext.Msg.alert('info', '月份格式不对请检查！');
            me.up('salarylist').setActive(true, me.up('salarylist').down('monthfield'));
            return;
        }
        Ext.getBody().mask('数据加载中...');
        this.getStore("Salarys").load({
            params: {
                depid: me.up('salarylist').down('userdept')._idValue, 
                month: Ext.Date.format(new Date(me.up('salarylist').down('monthfield').value), 'Ym'),
                type: 'salary'
            }, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){
                // console.log(records);
                // console.log(options);
                // var form = this.getSalaryform();
                // form.removeAll();
                // form.add({
                //         xtype: 'label',
                //         text: 'Child Panel 2',
                //         margin: '0 0 0 10',
                //         frame: true,
                //         cls: 'blue',
                //         columnWidth: 0.1
                //     });
                Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
        // this.getSalaryformlist().down('salaryform').down('workflowdept').getStore().load({
        //     params: {
        //         rq: Ext.Date.format(new Date(this.getSalaryformlist().down('salarylist').down('monthfield').value), 'Ym')
        //     }
        // });
    },
    onCellClick: function(table, td, cellindex, record, tr, rowindex, e){   
        var grid = this.getSalarylist();         
        grid.columns[cellindex + 3].addCls('red');

    },
    onBeforeEdit: function(editor, e){
        var grid = this.getSalarylist(); 
        grid.columns[e.colIdx + 3].addCls('red');

    },
    //没有使用salary sync(). 待考虑
    onAfterEdit: function(editor, e){
        var record = e.record;
        var grid = this.getSalarylist();     
        var newvalue;

        var rq = Ext.Date.format(record.data.ATT_MONTH, 'Ym');

        Ext.Ajax.request({   
            url:'/jxkpserver/UserAction.do?action=setSalary',
            params:{
                oldvalue: e.originalValue,
                value: e.value,
                empid: record.data.EMP_ID,
                depid: record.data.DEP_ID,
                rq: rq,
                ids: record.data.IDS,
                field: e.field,
                type: 'salary'
            },
            success: function(resp, opts) { 
                var respText = Ext.JSON.decode(resp.responseText);
                if (respText.success === true) {
                    newvalue = e.record.data.TOTAL;
                    if(e.field == 'GSKH' || e.field == 'BMKH'){
                        newvalue = e.record.data.TOTAL - e.value + e.originalValue;
                    }else if(e.field != 'MEMO' && e.field != 'ATTENDENCE'){
                        newvalue = e.record.data.TOTAL + e.value - e.originalValue;                        
                    }        
                    e.record.set('TOTAL', newvalue);
                    e.record.commit();
                }else {
                    e.record.reject();
                    Ext.Msg.alert('错误', respText.message);
                }
            }, 
            failure: function(resp,opts) { 
                var error = '发生故障，请检查再试，或联系系统管理员';
                if(resp.responseText !== ''){
                    var respText = Ext.JSON.decode(resp.responseText); 
                    error = respText.eror;
                } 
                record.set(e.field, e.originalValue);
                Ext.Msg.alert('错误', error); 
            }   
        }); 

        grid.columns[e.colIdx + 3].removeCls('red');
        
    },
    inExcel: function(button){
        var me = button;
        var rq = me.up('salarylist').down('monthfield');
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        var form = this.getSalarylist().down('toolbar').down('form');
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'salary',
                    rq: Ext.Date.format(new Date(rq.value), 'Ym') 
                },
                waitMsg: '正在上传&后台处理...',
                success: function(form, action) {
                    Ext.Msg.alert('成功', '文件传输成功');
                },
                failure : function(form, action) {
                    Ext.Msg.alert('失败',action.result.message);
                }

            });
        }else{
             Ext.Msg.alert('错误', '选择上传的文件！');
        }
    },
    exportExcel: function (button) {
        var me = button;
        var rq = me.up('salarylist').down('monthfield');        
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        rq = Ext.Date.format(new Date(rq.value), 'Ym');
        var depid = me.up('salarylist').down('userdept')._idValue;

        if(depid === null){
            Ext.Msg.alert('错误', '请选择部门！');
            return;
        }

        window.location.href = '/jxkpserver/UserAction.do?action=exportExcel&type=salary&rq=' + rq + '&depid=' + depid;  

    },
    OnTreePanelItemClick: function(dataview, record, item, index, e, eOpts){
        //数据menu里，iconCls 等于  user.Salary 里的itemId

        var iconCls, itemId, classname;
        iconCls = record.data.iconCls;
        itemId = record.data.iconCls;
        classname = record.data.iconCls + 'list';

        var n = this.getTabpanel().getComponent(itemId);
        if(!n){
            var title = record.data.text;
            var panel = Ext.widget(classname, {title: title, iconCls: iconCls, closable: true, itemId: itemId});
            this.getTabpanel().add(panel);
            n = this.getTabpanel().getComponent(itemId);
        }
        
        this.getTabpanel().setActiveTab(n);

    },
    OnTreePanelSelect: function(rowmodel, record, index, eOpts){
        // console.log(record);
    },
    OnNophoto: function(button){
        var me = button;

        var form = this.getHrlist().down('form');
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'hr_photo'                    
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
    OnDownloadExcel: function(){
        window.location.href = '/jxkpserver/UserAction.do?action=exportExcel&type=hr';  
    },
    onImport: function(button){
        var me = button;
        // console.log(me.up('salarylist').down('userdept'));
        if(!me.up('salarylist').down('monthfield').isValid() || me.up('salarylist').down('monthfield').value === undefined){
            Ext.Msg.alert('info', '月份格式不对请检查！');
            me.up('salarylist').setActive(true, me.up('salarylist').down('monthfield'));
            return;
        }
        if(!me.up('salarylist').down('userdept').isValid() || me.up('salarylist').down('userdept').value === undefined){
            Ext.Msg.alert('info', '部门未选择，请检查！');
            me.up('salarylist').setActive(true, me.up('salarylist').down('userdept'));
            return;
        }
        this.getStore("Lists").load({
            params: {type: 'get1', dept: me.up('salarylist').down('userdept')._idValue, month: Ext.Date.format(new Date(me.up('salarylist').down('monthfield').value), 'Ym')}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){ 
                Ext.Msg.alert('info', '加载完毕');
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
    }

});