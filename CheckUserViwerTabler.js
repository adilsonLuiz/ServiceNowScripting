
var userSysID = '';
var tableNameCheckViwer = 'change_request'; 
gs.getSession().impersonate(userSysID);
var grOject = new GlideRecord(tableNameCheckViwer);


if(grOject.hasNext()) {
    gs.log('Usuario possui permissão de visualização na tabela informada');
}
else {
    gs.log('Usuário não possui permissão de visualização na tabela informada.')
}


