Ext.define('JxkpApp.view.combo.State', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combostate',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	// autoSelect: true,
	store: 'States',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	// lazyRender: true,
	emptyText: '请选择状态...',
	// editable: false
	typeAhead: true
});