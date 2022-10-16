// TODO check array of users and verify if user exist or not

var userRawData  = '';




var usersIDList = userRawData.split(',');
var domain = '';
var usersNonExistingId = new Array();

for(var x = 0; x <= usersIDList.length; x++) {
    var grUser = new GlideRecord('sys_user');
    grUser.addEncodedQuery('user_name=' + usersIDList[x] + '^' + 'sys_domain=' + domain);
    grUser.query();
    grUser.next();
    
    if(!grUser.isValidRecord()) {
        usersNonExistingId.push(usersIDList[x]);
    }
}

gs.log('Usuários inexistentes encontrados na plataforma: ' + usersNonExistingId);
