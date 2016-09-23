Ext.define('JxkpApp.view.user.Import', {
    extend: 'Ext.window.Window', 
    alias : 'widget.userimport',
    title : '导入窗口',
    layout: 'fit', 
    autoShow: true,
    activeItem: 0,

    initComponent: function() {
        this.resizable = false;        
        this.items = [{
                xtype: 'form',
                activeItem: 0,                
                items: [
                    {
                        xtype: 'filefield',
                        fieldLabel: '文件',
                        labelWidth: 30,
                        width: 400,
                        flex: 1,
                        msgTarget: 'side',
                        name: 'file',
                        allowBlank: false,
                        buttonText: '选择一个文件...'
                    }
                ]
        }];
        this.buttons = [{ 
            text: '上传',
            action: 'fileupload'
        }, 
            {
            text: '清空',
            scope: this, 
            handler: function() {
                this.close();
                Ext.getBody().unmask();    

            }
        }]; 
        this.closable =  false;
        this.callParent(arguments);
    }
});