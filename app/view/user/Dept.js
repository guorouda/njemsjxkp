//4.2  treepandel autoload store, which makes 
Ext.define('JxkpApp.view.user.Dept',{  
    extend : 'Ext.form.field.ComboBox',  
    alias: 'widget.userdept', 

    requires: [
        'Ext.tree.Panel'
    ],

    store : {fields:[],data:[[]]},  
    // store : new Ext.data.ArrayStore({fields:[],data:[[]]}),    
    editable : false,  
    allowBlank:false,  
    listConfig : {resizable:true, minWidth:200, maxWidth:450},  
    _idValue : null,  
    _txtValue : null, 
    // displayField: 'text' ,
    // valueField: 'id',
    callback : Ext.emptyFn, 

    // callback : function(record, options, success){console.log('record');},  
    treeObj : null,  
    initComponent : function(){  
        this.treeObj = new Ext.tree.Panel({
            // store: Ext.create('JxkpApp.store.Depts'), 
            store: 'Depts', 
            border : false,  
            autoScroll : true,  
            rootVisible: false,  
            renderTo:this.treeRenderId, 

            /**
             * Override.
             */
            // setRootNode: function() {
            //     if (this.getStore().autoLoad) {
            //         this.callParent(arguments);
            //     }
            // }, 
            root: {
                text: 'root',
                // id: 0,
                leaf: false,
                draggable: false,
                expanded: false
            }  
        });       
        this.treeRenderId = Ext.id();  
        this.tpl = "<tpl><div id='" + this.treeRenderId + "'></div></tpl>";       
        this.callParent(arguments);  
        this.on({  
            'expand' : function(){
                var me = this;
                // // console.log(me.treeObj.getStore().getCount());
                // // if(me.treeObj.getStore().getCount() > 0){
                // //     console.log(me.treeObj.getCount());
                // //     return;
                // // }
                // me.treeObj.getStore().load({
                //     params: {
                //         type: 'user'
                //     }, 
                //     // callback是加载完毕时执行的回调函数，它包含3个参数：records参数表示获得的数据，
                //     // options表示执行load()时传递的参数，success表示是否加载成功。
                //     callback: function(records, options, success){ 
                        if(!me.treeObj.rendered && me.treeObj && !me.readOnly){  
                            Ext.defer(function(){  
                                me.treeObj.render(me.treeRenderId);  
                            }, 100, me);  
                        } 
                //     },
                //     scope: me, //Scope用来指定回调函数执行时的作用域
                //     //Add为true时，load()得到的数据会添加在原来的store数据的末尾，
                //     //否则会先清除之前的数据，再将得到的数据添加到store中
                //     add: false
                // });                          
 
            }  
        });

        this.treeObj.on('itemclick', function(view,rec){  
            if(rec){  
                this.setValue(this._txtValue = rec.get('text'));  
                this._idValue = rec.get('id');  
                //设置回调  
                this.callback.call(this,rec.get('id'), rec.get('text'));                
                this.collapse();//关闭tree  
            }  
        }, this);  
    },  
    getValue : function(){//获取id值  
        return this._idValue;  
    },  
    getTextValue : function(){//获取text值  
        return this._txtValue;  
    },  
    setLocalValue : function(txt,id){//设值  
        this._idValue = id;  
        this.setValue(this._txtValue = txt);  
    }
});  