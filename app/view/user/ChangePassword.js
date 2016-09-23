Ext.define('JxkpApp.view.user.ChangePassword', {
    extend: 'Ext.form.Panel',
    alias: 'widget.changepasswordlist',

    requires: [
    ],

    height: 80,
    width: 400,
    // bodyPadding: 10,
    title: '修改秘密',
    defaults:{xtype:'textfield',labelAlign: 'right', width:350,allowBlank:false,msgTarget:'side'},//提取共同属性

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    fieldLabel:'旧密码',
                    name:'oldpassword',
                    id:'oldpassword',
                    inputType:'password',//它还包括 radiocheck text(默认) filepassword等等
                    blankText:'请输入密码'

                },
                {
                    fieldLabel:'新密码',
                    name:'newpassword',
                    id:'newpassword',
                    inputType:'password',//它还包括 radiocheck text(默认) filepassword等等
                    blankText:'请输入密码'

                },
                {
                    fieldLabel:'重输新密码',
                    name:'newpassword2',
                    id:'newpassword2',
                    inputType:'password',//它还包括 radiocheck text(默认) filepassword等等
                    blankText:'请输入密码'
                }
            ]
            ,
            buttons:[{
                text: '清空',
                iconCls: 'clear',
                action: 'clear'
            },{
                text: '确认',
                iconCls: 'ok',
                action: 'ok',
                listeners: {
                    click: function (button) {

                        var formValues = this.getForm().getValues();

                        if(formValues.newpassword != formValues.newpassword2){
                            Ext.Msg.alert('错误' , '新密码两次不符');
                            return;
                        }else

                        Ext.Ajax.request({
                            url:'/jxkpserver/UserAction.do?action=changepwd',
                            params:{
                                oldpwd: formValues.oldpassword,
                                newpwd: formValues.newpassword
                            },
                            success: function(resp, opts) {
                                var respText = Ext.JSON.decode(resp.responseText);
                                if(respText.success === true){
                                    Ext.Msg.alert('信息', respText.message);
                                }
                            },
                            failure: function(resp,opts) {
                                var respText = Ext.JSON.decode(resp.responseText);
                                Ext.Msg.alert('错误', respText.error);
                            }
                        });
                    },
                    scope:  this
                }

            }]
        });

        me.callParent(arguments);
    }

});