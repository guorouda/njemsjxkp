Ext.define('JxkpApp.view.crowdshare.RealDelivery', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realdelivery',

    requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.RealDeliveryOK',
        'JxkpApp.view.crowdshare.RealDeliveryFail'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    }, 
    // title: '快跑团归班',
    itemId: 'realdelivery',
    items: [
        {                
            xtype: 'realdeliveryok',
            flex: 1
        },
        {   
            xtype: 'realdeliveryfail',       
            flex: 1
        }
    ]

});