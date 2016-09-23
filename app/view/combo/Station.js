Ext.define('JxkpApp.view.combo.Station', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combostation',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	// autoSelect: true,
	store: 'JxkpApp.store.combo.Stations',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	// lazyRender: true,
	emptyText: '请选择岗位...',
	// editable: true
	typeAhead: true
});