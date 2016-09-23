Ext.define('JxkpApp.view.user.Charge', {
    extend: 'Ext.window.Window', 
    alias : 'widget.usercharge',
    title : 'Edit User',

    requires: [
        'JxkpApp.view.user.UserAuthorization'
    ],

    layout: 'fit', 
    autoShow: true,
    emp_id: null,
    store: null,

    initComponent: function() {
        this.items = [{
                xtype: 'usermanagerdept',
                anchor: '100%',
                fieldLabel: '管辖部门',
                labelWidth: 70,
                labelAlign: 'right',
                width: 200
                
        }];
        this.buttons = [{ 
            text: 'Save',
            scope: this,
            action: 'save',
            handler: function(){
                var aaas = this.items.items[0]._idValue;                

                for(var i = 0; i < aaas.length; i++){
                    aaa = aaas[i].substring(aaas[i].lastIndexOf('/') + 1);
                    var rec = new JxkpApp.model.User({
                        EMP_ID: this.emp_id,
                        AAA: aaa
                    });
                    this.store.insert(0, rec);
                } 
            }
        }, 
            {
            text: 'Cancel',
            scope: this, 
            handler: function(){
                this.items.items[0]._idValue.length = 0;
                //clear tree checked
                var tree = this.items.items[0].treeObj;
                //tree.getChecked();
                var rootnodes = tree.getRootNode().childNodes;
                findchildnode(rootnodes);
                this.close();
                Ext.getBody().unmask();

                function findchildnode(nodes){                   
                    for(var i = 0; i < nodes.length; i++){  //从节点中取出子节点依次遍历
                        var node = nodes[i];                        
                        node.data.checked = false;
                        if(nodes.length > 0){  //判断子节点下是否存在子节点
                            findchildnode(node.childNodes);    //如果存在子节点  递归
                        }   
                    }
                }

            }
        }]; 
        this.callParent(arguments);
    }  

});