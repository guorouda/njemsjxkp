Ext.define('JxkpApp.view.combo.Level', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combolevel',

	queryMode: 'local',
	typeAhead: true,
	// triggerAction: 'All',
	// forceSelection: true,	
	store: 'JxkpApp.store.combo.Levels',
	valueField: 'di_value',	
	displayField: 'di_caption',
	emptyText: '请选择级别...'
	// ,
	// editable: true

});