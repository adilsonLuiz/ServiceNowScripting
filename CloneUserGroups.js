/*
---------------------------------------------
Author: Adilson Luiz
Função: Clona grupos de um usuário para o outro.
---------------------------------------------


---------------------------------------------
Tabelas utilizadas para operação
sys_user
sys_user_grmember
*/

var CloneUserGroups = Class.create();
CloneUserGroups.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    initialize: function (baseUserID) {
        this.debug = false;
        this._grBaseUser = new GlideRecord('sys_user');
        this._grBaseUser.get(baseUserID);
        this._printDebug('Sys_id User in the constructor: ' + this._grBaseUser.sys_id);
        this._groupsForbiddenNames = []; // Add here prohibited groups names
        this._mirroUserID = null;
        this.totalGroupsToClone = this.getTotalGroupsToClone()
    },


    _getBaseUserGroups: function () {
        /*
            Get all groups of the state user and build an object with this information
        
        */
        var AllGroups = {};
        var grGroups = GlideRecord('sys_user_grmember');
        grGroups.addEncodedQuery('user.sys_id=' + this._grBaseUser.getUniqueValue());
        grGroups.query();
        this._printDebug('Total group of user: ' + grGroups.getRowCount());

        while (grGroups.next()) {
            var groupName = grGroups.getDisplayValue('group').toLowerCase();
            var groupRelationshipID = grGroups.getValue('group'); // Get Sys_id of reference field group.

            // If group exist inside the prohibite groups list.
            if (this._groupsForbiddenNames.indexOf(groupName) == -1) {
                AllGroups[groupName] = groupRelationshipID; // Constructing dinamic object with group name and sys_id
            }
        }
        this._printDebug('INFO: Groups Object: ' + JSON.stringify(AllGroups))
        return AllGroups;
    },

    setMirroUserID: function (userID) {
        var grMirrorUser = new GlideRecord('sys_user');
        grMirrorUser.get(userID);
        this._printDebug('MirrorUser Query: ' + grMirrorUser.isValidRecord());

        if (!grMirrorUser.isValidRecord()) {
            return this._printDebug('FATAL ERROR: The MirrorUserID "' + userID + '" dont exist in your instance!');
        }

        this._mirroUserID = userID;
    },

    addProhibitedGroup: function (groupName) {
        /*
            Add groups to not clone
        */
        var grGroup = new GlideRecord('sys_user_group');
        grGroup.addQuery('name', '=', groupName);
        grGroup.query();

        if (grGroup.hasNext()) {
            this._groupsForbiddenNames.push(grGroup.toLowerCase());
        }
        else {
            this._printDebug('WARNING: Group "' + groupName + '" not exist in your instance!');
        }
    },


    _insertGroups: function (groupID, mirroUserID) {

        this._printDebug('INFO: Sys_id group to inserted: ' + groupID);

        var grGroups = new GlideRecord('sys_user_grmember');
        // Execute query frist, to check if group record dont exist in the grmember table.
        grGroups.addQuery('user', mirroUserID);
        grGroups.addQuery('group', groupID);
        grGroups.query();

        if (!grGroups.hasNext()) { // If not existe the record, proced to insert Group
            var recordInit = new GlideRecord('sys_user_grmember');
            recordInit.initialize();
            recordInit.user = mirroUserID;
            recordInit.group = groupID; // sys_id group
            this._printDebug('INFO: new record user valuer: ' + recordInit.user);
            this._printDebug('INFO: new record group valuer: ' + recordInit.group);
            this._printDebug('WARNING: Group Inserted: ' + groupID.toUpperCase());
            recordInit.insert();


        }
        else {
            this._printDebug('INFO: The Group "' + groupID + ' always exist in user "' + mirroUserID + '" and is not inseted!');
        }

    },


    getTotalGroupsToClone: function () {

        var grGroups = GlideRecord('sys_user_grmember');
        grGroups.addEncodedQuery('user.sys_id=' + this._grBaseUser.getUniqueValue());
        grGroups.query();
        this._printDebug('Total group of user: ' + grGroups.getRowCount());

        return grGroups.getRowCount();
    },


    executeCloneGroups: function () {
        // Execute the clone user

        // Get groups to clone 
        var groupsToClone = this._getBaseUserGroups();


        if (this._mirroUserID == null || this.totalGroupsToClone == 0) {
            return this._printDebug('FATAL ERROR: The MirrorUserID is not set or Total group to clone is 0!');
        }

        // Get mirror user informations
        var grMirrorUser = new GlideRecord('sys_user');
        grMirrorUser.get(this._mirroUserID);
        var mirroUserID = grMirrorUser.getUniqueValue();

        this._printDebug('INFO: Mirror User ID: ' + mirroUserID);

        for (var group in groupsToClone) { // Interation inside of object
            this._insertGroups(groupsToClone[group], mirroUserID); // send sys_id of group by paramether
            if (this.debug) break;
        }
    },

    
    _printDebug: function (msg) {
        if (this.debug) gs.info(msg);
    },

    type: 'CloneUserGroups'
});
