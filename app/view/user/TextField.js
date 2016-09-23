Ext.define('JxkpApp.view.user.TextField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.usertextfiled',

    valueToRaw: function(value){
    	var store = Ext.StoreMgr.lookup('JxkpApp.store.combo.Depts');
        var index = store.find('di_value', value);                        
        if (index != -1) {
            var rec = store.getAt(index);
            return rec.data.di_caption;
        }
    }
});