Ext.define('JxkpApp.view.user.PersonSalaryCheck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.personsalarychecklist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.user.PersonSalary'
    ],

    layout: 'border',
    title: '薪水',
    itemId: 'salarylistform',
    items: [{                
    	    xtype: 'personsalarylist',
    	    region: 'center'
        },
        {
            xtype: 'checksinglelist',
            region: 'south',
            height:  60,
            split: true,
            collapsible: true     
        }
    ],

    listeners: {
        tabchange: function(tabPanel, newTab, oldTab, index)
        {
            // console.log('change tab');
        },
        beforeadd : function (tabpane, component, index) {
            // console.log('Adding new tab');
        },
        beforeclose: function(element) {
            // var me = element;
            // var salarystore = me.down('personsalarylist').getStore();
            // if(salarystore.getCount() > 0 ){
            //     salarystore.removeAll();
            // }
            // var workflowdeptstore = me.down('salaryform').down('workflowdept').getStore();
            // // console.log(workflowdeptstore.getRootNode().childNodes);
            // if(workflowdeptstore.getRootNode().childNodes !== null){
            //     workflowdeptstore.removeAll();
            // }
        }
    }

});