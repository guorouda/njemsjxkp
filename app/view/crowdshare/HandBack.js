Ext.define('JxkpApp.view.crowdshare.HandBack', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.handbacklist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.ReportDelivery',
        'JxkpApp.view.crowdshare.RealDelivery'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },  
    // title: '发布',
    itemId: 'handback',
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                        xtype: 'textfield',
                        fieldLabel: '识别码',
                        labelWidth: 40,
                        archor: '100%'

                },
                {text:'获取数据', iconCls:'database_connect', action: 'handback_qr_fetch'
                },
                {text:'班结', iconCls:'disk', action: 'handback_ok'}
            ]
        }
    ],    
    items: [{                
	    xtype: 'reportdelivery',
        flex: 1
    },
    {   
    	xtype: 'realdelivery',       
        flex: 1,
	    split: true
	}]

});