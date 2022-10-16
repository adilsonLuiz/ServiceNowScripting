/*
---------------------------------------------
Author: Adilson Luiz
Data de Criação: 28/09/21
Data de modificação: 29/09/21
Função: Clona grupos de um usuário para o outro.
Teste em PDI: 28/09/21
Teste em DEV: 29/09/21
Teste em QA:
Executado em PRD:
---------------------------------------------

Cuidados ao utilizar.
Atentar-se ao sys_id de usuário clone e novo usuário.

---------------------------------------------
Tabelas utilizadas para operação
sys_user
sys_user_grmember
*/

// Control variables
var groupsNotAvaliabe = []; // Grupos que não vão ser clonados.
var cloneUserSys_id = ''; // Usuário que servirá como base de clone
var newUserSys_id = ''; // Usuário que receberá os grupos do usuário clone.
var defaultPassword = '';

cloneUserNotSSO()

function cloneUserNotSSO() {
    // Clone all groups user.

    var grUser = new GlideRecord('sys_user');
    runQuery(grUser, 'sys_id=' + cloneUserSys_id);


    var groupsToClone = getGroups(grUser.user_name);
    for(var group in groupsToClone) {
        insertGroups(newUserSys_id, groupsToClone[group]);
    }

    setNewPassword(newUserSys_id);
}

// Run query in grObject
function runQuery(grObject, query) {
    grObject.addEncodedQuery(query);
    grObject.query();
    grObject.next();
}

function getGroups(userID) {
    var grGroups = GlideRecord('sys_user_grmember');
    var AllGroupsName = [];
    var AllGroups = {};

    grGroups.addEncodedQuery('user.user_name=' + userID);
    grGroups.query();

    while(grGroups.next()) {
        var group = grGroups.getDisplayValue('group');
        /* Se grupo atual estiver dentro da lista de grupos proibidos,
        Grupo não será adicionado.
        */ 
        if(groupsNotAvaliabe.indexOf(group) == -1) {
            AllGroupsName.push(group);
        }

    }
    var grGroup = new GlideRecord('sys_user_group');
    var queryName = 'nameIN';
    for (var g in AllGroupsName) {
        queryName += AllGroupsName[g] + ',';
    }
    grGroup.addEncodedQuery(queryName);
    grGroup.query()
    while(grGroup.next()) {
        AllGroups[grGroup.name] = grGroup.getUniqueValue('name');
    }

    return AllGroups;
}

function setNewPassword(userSys_id) {
    // Ainda em implementação
    var grUser = new GlideRecord('sys_user');
    grUser.addEncodedQuery('sys_id=' + userSys_id);
    grUser.query();
    grUser.next();
    grUser.setValue('password_needs_reset', true);
    grUser.setValue('user_password', defaultPassword);
    grUser.save();
}
// Insere os grupos que são enviados via Sys_ID
function insertGroups(sys_IDNewUser, sys_idGroup) {

    var grUser = new GlideRecord('sys_user');
    grUser.addQuery('sys_id', '=', sys_IDNewUser);
    //grUser.addActiveQuery();
    grUser.query();
    gs.log('Usuário: ' + sys_IDNewUser);
    gs.log('Grupo: ' + sys_idGroup);
    while (grUser.next()) {

        var grGroups = new GlideRecord('sys_user_grmember');
        grGroups.addQuery('user' , grUser.sys_id);
        grGroups.addQuery('group' , sys_idGroup);   // sys_id group
        grGroups.query();
        if(!grGroups.next()) {
            grGroups.initialize();
            grGroups.user = grUser.sys_id;
            grGroups.group = sys_idGroup; // sys_id group
            grGroups.insert();
            gs.log('Group: ' + sys_idGroup + ' record inserted');


        }
    }
}
