Ext.define('JxkpApp.controller.Attendence', {
    extend: 'Ext.app.Controller',

	refs: [
        {
            ref: 'attendencelist',
            selector: 'attendencelist'
        }
    ],

    init: function() {
        this.control({            
            'attendencelist button[action=attendence_fetch]': {
                click: this.attendence_fetchData
            },
            'attendencelist button[action=inExcel]': {
                click: this.inExcel
            },
            'attendencelist': {
                edit: this.onAfterEdit,             
                // cellclick: this.onCellClick,
                beforeedit: this.onBeforeEdit
            },
            'attendencelist button[action=exportExcel]': {
                click: this.exportExcel
            }
        });
        
    },

 
    
    attendence_fetchData: function(button){
        var me = button;
        if(!me.up('attendencelist').down('monthfield').isValid()){
            Ext.Msg.alert('info', '月份格式不对请检查！');
            me.up('attendencelist').setActive(true, me.up('attendencelist').down('monthfield'));
            return;
        }
        Ext.getBody().mask('数据加载中...');
        this.getStore("Attendences").load({
            params: {depid: me.up('attendencelist').down('userdept')._idValue, month: Ext.Date.format(new Date(me.up('attendencelist').down('monthfield').value), 'Ym')}, 
            // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
            // options表示执行load()时传递的参数，success表示是否加载成功。
            callback: function(records, options, success){
                Ext.getBody().unmask();
            },
            scope: this, //Scope用来指定回调函数执行时的作用域
            //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
            //否则会先清除之前的数据，再将得到的数据添加到store中
            add: false
        });
    },
    onCellClick: function(table, td, cellindex, record, tr, rowindex, e){ 	
    	var grid = this.getAttendencelist(); 
    	grid.columns[cellindex + 3].addCls('red');

    },
    onBeforeEdit: function(editor, e){
    	var grid = this.getAttendencelist(); 
    	grid.columns[e.colIdx + 3].addCls('red');

    },
    onAfterEdit: function(editor, e){
        var record = e.record;
        var rq = Ext.Date.format(record.data.ATT_MONTH, 'Ym');

        Ext.Ajax.request({   
            url:'/jxkpserver/UserAction.do?action=setAttendence',
            params:{
                oldvalue: e.originalValue,
                value: e.value,
                empid: record.data.EMP_ID,
                rq: rq,
                ids: record.data.IDS,
                field: e.field
            },
            success: function(resp, opts) { 
                var respText = Ext.JSON.decode(resp.responseText);
                if(respText.success === true){
                }
            }, 
            failure: function(resp,opts) { 
                var respText = Ext.JSON.decode(resp.responseText); 
                Ext.Msg.alert('错误', respText.error); 
            }   
        }); 

    	var grid = this.getAttendencelist();     

        if(e.field != 'MEMO'){
           var newvalue = e.record.data.TOTAL + e.value - e.originalValue;

            e.record.set('TOTAL', newvalue);
        }


    	grid.columns[e.colIdx + 3].removeCls('red');
    	
    },
    inExcel: function(button){
        var me = button;
        var rq = me.up('attendencelist').down('monthfield');
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        var form = this.getAttendencelist().down('toolbar').down('form');
        if(form.isValid() && form.down('filefield') !== undefined){
            form.submit({
                url: '/jxkpserver/upload.action',
                params: {
                    type: 'attendence',
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
        var rq = me.up('attendencelist').down('monthfield');        
        if(!rq.isValid() || rq.value === undefined ){
            Ext.Msg.alert('错误', '月份格式不对请检查！');
            return;
        }

        rq = Ext.Date.format(new Date(rq.value), 'Ym');
        var depid = me.up('attendencelist').down('userdept')._idValue;

        if(depid === null){
            Ext.Msg.alert('错误', '请选择部门！');
            return;
        }

        window.location.href = '/jxkpserver/UserAction.do?action=exportExcel&type=attendence&rq=' + rq + '&depid=' + depid;  

    }
});