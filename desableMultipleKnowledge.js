// Running in background


var grKnowledge = new GlideRecord('kb_knowledge');
var encodedQuery = '';
grKnowledge.addEncodedQuery(encodedQuery);
grKnowledge.query();
runCode();



function runCode() {

    if(encodedQuery == '') return gs.log('Favor informar um query valida.');

    // Process in the table
    while(grKnowledge.next()) {

        grKnowledge.setWorkflow(false);
        grKnowledge.active = false;
        grKnowledge.update();
    }
}