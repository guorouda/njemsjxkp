Ext.define('JxkpApp.view.user.Login', {
    extend: 'Ext.window.Window', 
    alias : 'widget.userlogin',
    title : '系统登录',
    layout: 'fit', 
    autoShow: true,
    activeItem: 0,

    initComponent: function() {
        this.resizable = false;        
        this.items = [{
                xtype: 'form',
                activeItem: 0,                
                items: [{
                        xtype: 'textfield', 
                        name :'name',
                        fieldLabel: '用户名',
                        labelAlign: 'right'
                         
                },
                { 
                        xtype: 'textfield', 
                        name : 'password', 
                        fieldLabel: '密码',
                        inputType:"password",
                        labelAlign: 'right'
                 }]
        }];
        this.buttons = [{ 
            text: '登录',
            action: 'login'
        }, 
            {
            text: '清空',
            scope: this, 
            handler: function(){
                this.down('form').getForm().reset();
            }
        }]; 
        this.closable =  false;
        this.callParent(arguments);
    }
});