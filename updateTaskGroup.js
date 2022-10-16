/*
---------------------------------------------
Author: Adilson Luiz
Data de Criação: 30/09/21
Data de modificação: 
Função:
-------------Cuidados ao utilizar.-------




---------------------------------------------
Tabelas utilizadas para operação

*/

// Control variables
var groupAssignedSysID = '';
var userAssignedSysID = '';
var encodeQueryTask = '';


var grScTask = new GlideRecord('sc_task');
grScTask.addEcodedQuery(encodeQueryTask);
grScTask.query();

while(grScTask.next()) {

    grScTask.setValue('assignment_group', groupAssignedSysID);
    grScTask.setValue('assigned_to', userAssignedSysID);
    grScTask.update();
}
