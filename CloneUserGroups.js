var CloneUserGroups = Class.create();
CloneUserGroups.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getGroups: function (userID) {
        var grGroups = GlideRecord('sys_user_grmember');
        var AllGroupsName = [];
        var AllGroups = {};

        grGroups.addEncodedQuery('user.user_name=' + userID);
        grGroups.query();

        while (grGroups.next()) {
            var group = grGroups.getDisplayValue('group');
            /* Se grupo atual estiver dentro da lista de grupos proibidos,
            Grupo não será adicionado.
            */
            if (groupsNotAvaliabe.indexOf(group) == -1) {
                AllGroupsName.push(group);
            }
        }
    },
	
    runQuery: function(grObject, query) {
        grObject.addEncodedQuery(query);
        grObject.query();
        grObject.next();
    },

    insertGroups: function(sys_IDNewUser, sys_idGroup) {
        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', sys_IDNewUser);
        //grUser.addActiveQuery();
        grUser.query();
        //gs.log('Usuário: ' + sys_IDNewUser);
        //gs.log('Grupo: ' + sys_idGroup);
        while (grUser.next()) {
            var grGroups = new GlideRecord('sys_user_grmember');
            grGroups.addQuery('user', grUser.sys_id);
            grGroups.addQuery('group', sys_idGroup); // sys_id group
            grGroups.query();
            if (!grGroups.next()) {
                grGroups.initialize();
                grGroups.user = grUser.sys_id;
                grGroups.group = sys_idGroup; // sys_id group
                grGroups.insert();
                //gs.log('Group: ' + sys_idGroup + ' record inserted');


            }
        }
    },
    
    cloneUserNotSSO: function() {
        var grUser = new GlideRecord('sys_user');
        runQuery(grUser, 'sys_id=' + cloneUserSys_id);


        var groupsToClone = getGroups(grUser.user_name);
        for (var group in groupsToClone) {
            insertGroups(newUserSys_id, groupsToClone[group]);
        }
    },

    type: 'CloneUserGroups'
});