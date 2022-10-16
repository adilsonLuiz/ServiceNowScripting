/*
Author: Adilson Luiz
Data de Criação: 28/07/2021
Data de modificação: 06/09/21
Função: Encerramento ou resolução de incidentes ou task em massa.
*/


// Global variables MANDATORY to use and change
var task_type = true;
var grTable = (task_type)? new GlideRecord('sc_task'): new GlideRecord('incident');
var assignment_group_sys_id = ''; // Sys_id do grupo
var resolved_by = assigned_to_sys_id = ''; // Sys_id do usuário
var resolve_ticket = true;
var resolution_code = (resolve_ticket) ? 'Request resolved': 'Request Cancelled';
var encodedQuerySearch = ''; // EncodedQuery filter IMPORTANTE
main();

// Information variables

var resolutionText = 'Texto de resolução'
var workNotesText = 'Texto de encerramento'

function main() {

    grTable.addEncodedQuery(encodedQuerySearch);
    grTable.query();

    // Mensagem importante
    if (encodedQuerySearch == '') {
        gs.print('E necessario o alimentar a variavel "encodedQuerySearch" com um valor de filtro');
        return false;

    }

    if(task_type) {
        if(task_type) {
            close_task()
        }
        else {
            close_incident()
        }
    }



}



function close_task() {
 
    if(resolve_ticket) {
        while(grTable.next()) {

            grTable.work_notes = workNotesText;

            // se o atributo não tiver preenchido nesta iteração, então colocamos um valor.
            if(!grTable.contact_type) {
                grTable.setValue('contact_type', 'self-service');
            }

            grTable.setValue('assignment_group', assignment_group_sys_id);
            grTable.setValue('assigned_to', assigned_to_sys_id);
            grTable.setValue('close_code', 'Resolved');
            grTable.setValue('close_notes', resolutionText);
            grTable.setValue('state', 3);
            //grTable.setValue('active', false);
            grTable.setValue('u_resolution_code', resolution_code);
            grTable.setValue('u_resolved_by', resolved_by);
            grTable.update();

        }

    }
    else {
        while(grTable.next()) {

            grTable.work_notes = workNotesText;

            // se o atributo não tiver preenchido nesta iteração, então colocamos um valor.
            if(!grTable.contact_type) {
                grTable.setValue('contact_type', 'self-service');
            }

            grTable.setValue('assignment_group', assignment_group_sys_id);
            grTable.setValue('assigned_to', assigned_to_sys_id);
            grTable.setValue('close_code', 'Closed');
            grTable.setValue('close_notes', resolutionText);
            grTable.setValue('state', 3);
            grTable.setValue('active', false);
            grTable.setValue('u_resolution_code', resolution_code);
            grTable.setValue('u_resolved_by', resolved_by);
            grTable.update();
            
        }
    }
}


function close_incident()  {

    if(resolve_ticket) {
        while(grTable.next()) {

            grTable.work_notes = workNotesText;

            // se o atributo não tiver preenchido nesta iteração, então colocamos um valor.
            if(!grTable.contact_type) {
                grTable.setValue('contact_type', 'self-service');
            }

            grTable.setValue('assignment_group', assignment_group_sys_id);
            grTable.setValue('assigned_to', assigned_to_sys_id);
            grTable.setValue('close_code', 'Resolved');
            grTable.setValue('close_notes', resolutionText);
            grTable.setValue('state', 3);
            //grTable.setValue('active', false);
            grTable.setValue('u_resolution_code', resolution_code);
            grTable.setValue('u_resolved_by', resolved_by);
            grTable.update();

        }

    }
    else {
        while(grTable.next()) {

            grTable.work_notes = workNotesText;

            // se o atributo não tiver preenchido nesta iteração, então colocamos um valor.
            if(!grTable.contact_type) {
                grTable.setValue('contact_type', 'self-service');
            }

            grTable.setValue('assignment_group', assignment_group_sys_id);
            grTable.setValue('assigned_to', assigned_to_sys_id);
            grTable.setValue('close_code', 'Closed');
            grTable.setValue('close_notes', resolutionText);
            grTable.setValue('state', 3);
            grTable.setValue('active', false);
            grTable.setValue('u_resolution_code', resolution_code);
            grTable.setValue('u_resolved_by', resolved_by);
            grTable.update();
            
        }
    }
}

