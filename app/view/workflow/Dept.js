Ext.define('JxkpApp.view.workflow.Dept',	{
	extend: 'Ext.tree.Panel',
	alias: 'widget.workflowdept',

    store: Ext.create("JxkpApp.store.WorkFlowDepts"),
    rootVisible: false
});