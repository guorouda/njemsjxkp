Ext.define('JxkpApp.view.combo.Dept',{  
    extend : 'Ext.form.field.ComboBox',  
    alias: 'widget.combodept', 

// lazyRender: true,
// autoSelect: true,
    typeAhead: true,
    queryMode: 'local',
    // triggerAction: 'All',
    // forceSelection: true,   
    store: 'JxkpApp.store.combo.Depts',
    valueField: 'di_value', 
    displayField: 'di_caption',
    // selectOnFocus: true,
    emptyText: '请选择岗位...'
    //,editable: true 
});  