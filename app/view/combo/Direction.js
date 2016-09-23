Ext.define('JxkpApp.view.combo.Direction', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combodirection',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	store: 'Directions',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	emptyText: '请选择段到...',
	// editable: true
	typeAhead: true
});