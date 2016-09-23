Ext.define('JxkpApp.view.user.SalaryListForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.salaryformlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.user.SalaryForm',
        'JxkpApp.view.user.Salary',
        'JxkpApp.store.Depts',
        'JxkpApp.store.Salarys',
        'JxkpApp.store.WorkFlowDepts'
    ],

    layout: 'border',
    title: '薪水',
    itemId: 'salarylistform',
    items: [{                
	    xtype: 'salarylist',
	    region: 'center'
    },
    {
        xtype: 'checksinglelist',
        region: 'south',
        height:  60,
        split: true,
        collapsible: true     
    },
    {   
    	xtype: 'salaryform',
        region: 'east',
	    split: true,
	    collapsible: true,
        tools:[
            {
                xtype: 'tool',
                tooltip: '刷新流程状态',
                type: 'refresh',
                listeners: {
                    click: function(tool, e, owner, eOpts) {
                        var store = this.up('salaryform').down('workflowdept').getStore();
                        store.load({
                            scope: this,
                            callback: function(records, operation, success) {
                               // this.up('salaryform').down('workflowdept').expandAll(
                               //     function(o) {
                               //          // console.log(o);
                               //     }, this
                               // );
                            }
                        });
                    }
                }
            }
        ]
	}],
    listeners: {
        tabchange: function(tabPanel, newTab, oldTab, index)
        {
            // console.log('change tab');
        },
        beforeadd : function (tabpane, component, index) {
            // console.log('Adding new tab');
        },
        beforeclose: function(element) {
            var me = element;
            var salarystore = me.down('salarylist').getStore();
            if(salarystore.getCount() > 0 ){
                salarystore.removeAll();
            }
            var workflowdeptstore = me.down('salaryform').down('workflowdept').getStore();
            // console.log(workflowdeptstore.getRootNode().childNodes);
            if(workflowdeptstore.getRootNode().childNodes !== null){
                workflowdeptstore.removeAll();
            }
        }
    }

});