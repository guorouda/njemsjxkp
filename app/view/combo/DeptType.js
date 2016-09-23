Ext.define('JxkpApp.view.combo.DeptType', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combodepttype',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	// autoSelect: true,
	store: 'JxkpApp.store.combo.DeptTypes',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	// lazyRender: true,
	emptyText: '请选择岗位...',
	// editable: true
	typeAhead: true
});