Ext.define('JxkpApp.view.combo.Station', {
    extend: 'Ext.form.field.ComboBox', 
    alias : 'widget.combostation',

	allowBlank: false,
	// readOnly: true,
	store: Ext.create('JxkpApp.store.combo.Stations'),
	valueField: 'di_value',
	displayField: 'di_caption',	
	queryMode: 'remote',
	loadingText: 'loading...',
	triggerAction: 'all',
	// forceSelection: true,
	// autoSelect: false,
	// editable: true,
	// minChars:1,
	// queryParam : 'emp_id',
	// name: 'paramName',
	// ref: '../param',
	typeAhead: true,
	emptyText: '请选择岗位...',

	listeners: {
		expand: function(field, eOpts){
			var emp_id, up = this.up('grid');
			if(up !== undefined){
				emp_id = up.getSelectionModel().getSelection()[0].get("EMP_ID");		
			}else{
				emp_id = this.up('form').getForm().getValues()['EMP_ID'];
			}
			this.getStore().load({
				 params: {query: emp_id}
			});
		},
		beforequery: function(queryPlan, eOpts){
			var emp_id, up = this.up('grid');
			if(up !== undefined){
				emp_id = up.getSelectionModel().getSelection()[0].get("EMP_ID");		
			}else{
				emp_id = this.up('form').getForm().getValues()['EMP_ID'];
			}	

			queryPlan['query'] = emp_id;		
		}
	}

});