Ext.define('JxkpApp.controller.Check', {
    extend: 'Ext.app.Controller',

    stores: ['Checks'],

	refs: [
        {
            ref: 'checklist',
            selector: 'checklist'
        }
    ],

    levelOriginalValue: null,

    init: function() {
        this.control({           
            'checklist button[action=FetchChecklist]': {
                click: this.onFetchChecklist
            },
            'checklist': {
                edit: this.onAfterEdit//,             
                // cellclick: this.onCellClick,
                // beforeedit: this.onBeforeEdit
            },
            'checklist button[action=inExcel]': {
                click: this.inExcel
            },
            'checklist button[action=exportExcel]': {
                click: this.exportExcel
            },});
        
    },

    onFetchChecklist: function(button){
        var me = button;

        Ext.getBody().mask('数据加载中...');

        var store = this.getChecklist().getStore();

        store.load({
            params: {depid: me.up('checklist').down('usercheckdept')._idValue, rq: Ext.Date.format(new Date(me.up('checklist').down('monthfield').value), 'Ym')}, 
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

    onAfterEdit: function(editor, e){
        var record = e.record;
        var grid = this.getChecklist();     
        var newvalue;

        var rq = Ext.Date.format(record.data.ATT_MONTH, 'Ym');
        var pid = record.data.ID;

        Ext.Ajax.request({   
            url:'/jxkpserver/UserAction.do?action=setCheck',
            params:{
                oldvalue: e.originalValue,
                value: e.value,
                empid: record.data.EMP_ID,
                rq: rq,
                id: pid,
                field: e.field,
                type: 'check'
            },
            success: function(resp, opts) { 
                var respText = Ext.JSON.decode(resp.responseText);
                if (respText.success === true) {
                    // newvalue = e.record.data.TOTAL;
                    // if(e.field == 'GSKH' || e.field == 'BMKH'){
                    //     newvalue = e.record.data.TOTAL - e.value + e.originalValue;
                    // }else if(e.field != 'MEMO' && e.field != 'ATTENDENCE'){
                    //     newvalue = e.record.data.TOTAL + e.value - e.originalValue;                        
                    // }        
                    // e.record.set('TOTAL', newvalue);
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
        var rq = me.up('checklist').down('monthfield');
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        var form = this.getChecklist().down('toolbar').down('form');
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'check',
                    rq: Ext.Date.format(new Date(rq.value), 'Ym')
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
        var rq = me.up('checklist').down('monthfield');
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        rq = Ext.Date.format(new Date(rq.value), 'Ym');
        var depid = me.up('checklist').down('usercheckdept')._idValue;

        if(depid === null){
            Ext.Msg.alert('错误', '请选择部门！');
            return;
        }

        window.location.href = '/jxkpserver/UserAction.do?action=exportExcel&type=check&rq=' + rq + '&depid=' + depid;

    }
});