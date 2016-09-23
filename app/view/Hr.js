Ext.define('JxkpApp.view.Hr', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hrlist',

	titel: 'HR',

	initComponent: function(){


		this.items  = [{
			xtype: 'form', 

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
            action: 'fileupload1'
        }, 
            {
            text: '下载',
            action: 'downloadExcel',
        }]; 
		this.callParent(arguments);
	}

});
