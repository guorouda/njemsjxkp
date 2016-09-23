Ext.define('JxkpApp.view.user.SalaryForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.salaryform',

    requires: [
       'JxkpApp.view.workflow.Dept'
    ],

    height: 80,
    width: 400,
    // bodyPadding: 10,
    title: '信息列表',
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {xtype: 'workflowdept'}
            ]
            ,
            buttons:[{
                text: '全部展开',
                iconCls: 'expandAll',
                action: 'expandAll'
            },{
                text: '上报',
                iconCls: 'report',
                action: 'report'
            },{
                text: '撤回',
                iconCls: 'withdraw',
                action: 'withdraw'

            }]
        });

        me.callParent(arguments);
    }

});