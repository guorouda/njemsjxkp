Ext.define('JxkpApp.view.user.CheckSingle' ,{
    extend: 'Ext.grid.Panel', 
    alias : 'widget.checksinglelist', //使用alias来定义一个别名，这个时候，我们的类可以使用Ext.create()和Ext.widget()创建，在其他组件的子组件中，也可以使用xtype来创建。

    requires: [
        // 'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Month',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],

    store: [''],

    viewConfig: {
        stripeRows: true
    },
    height: 150,
    minHeight: 150,

    initComponent: function() {
        this.columns = [
            { xtype: 'rownumberer', header: '序号', width: 30},
            { header: '员工工号', menuDisabled: true, dataIndex: 'EMP_ID', width: 80},
            { header: "姓名", menuDisabled: true, dataIndex: 'EMP_NAME', width: 80, align: 'left'},
            { header: "考核机构", menuDisabled: true, dataIndex: 'DEP_NAME', width: 80, align: 'left'},
            { header: "考核金额", menuDisabled: true, dataIndex: 'MONEY', width: 160,  sortable: true, align: 'right', summaryType: 'sum'},
            { header: "备注", menuDisabled: true, dataIndex: 'MEMO', width: 100, align: 'left', flex: 1}
        ];

        this.tbar = [

        ];
        this.callParent(arguments);
    }
});