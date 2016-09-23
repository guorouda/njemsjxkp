Ext.define('JxkpApp.view.combo.Gender', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combogender',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	store: 'Genders',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	emptyText: '请选择性别...',
	// editable: true
	typeAhead: true
});