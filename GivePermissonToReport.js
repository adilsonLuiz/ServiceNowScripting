

// Sys_id do usuário que vai receber acesso ao report
var userTargetID = ''; 
var groupTargetID = '';
var userNameOwnerReport = '';







function executeForUser() {

    var grReport = new GlideRecord("sys_report");

    grReport.addEncodedQuery('sys_created_by=' + userNameOwnerReport); // Query com os relatórios
    //rep.setLimit(1); // Quantidade por vez
    grReport.query();

    while (grReport.next()) {
        var grUserReport = new GlideRecord("sys_report_users_groups");
        grUserReport.initialize();
        grUserReport.user_id = userTargetID;
        grUserReport.report_id = grReport.getUniqueValue();
        grUserReport.insert();
        gs.info("Acesso cedido ao usuário: " + userTargetID + " ao relatório: " + grReport.title);
    }


}


function executeForGroup() {
    var grReport = new GlideRecord("sys_report");

    grReport.addEncodedQuery('sys_created_by=' + userNameOwnerReport); // Query com os relatórios
    //rep.setLimit(1); // Quantidade por vez
    grReport.query();

    while (grReport.next()) {
        var grUserReport = new GlideRecord("sys_report_users_groups");
        grUserReport.initialize();
        grUserReport.user_id = userTargetID;
        grUserReport.report_id = grReport.getUniqueValue();
        grUserReport.insert();
        gs.info("Acesso cedido ao usuário: " + userTargetID + " ao relatório: " + grReport.title);
    }


}
