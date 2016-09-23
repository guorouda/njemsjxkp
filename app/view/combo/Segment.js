Ext.define('JxkpApp.view.combo.Segment', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combosegment',

	queryMode: 'local',
	// triggerAction: 'All',
	// forceSelection: true,
	store: 'Segments',
	valueField: 'di_value',	
	displayField: 'di_caption',	
	emptyText: '请选择段到...',
	// editable: true
	typeAhead: true
});