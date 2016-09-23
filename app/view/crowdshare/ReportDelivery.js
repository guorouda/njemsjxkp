Ext.define('JxkpApp.view.crowdshare.ReportDelivery', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.reportdelivery',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.ReportDeliveryOK',
        'JxkpApp.view.crowdshare.ReportDeliveryFail'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    }, 
    // title: '发布',
    itemId: 'reportelivery',
    items: [
        {                
    	    xtype: 'reportdeliveryok',
            flex: 1
        },
        {   
        	xtype: 'reportdeliveryfail',       
            flex: 1
    	}
    ]

});