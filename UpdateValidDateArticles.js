
/*
Author: Adilson Luiz
Data de Criação: 28/07/2021
Função: Alterar campo "valid_to" da tabela "kb_knowledge", adicionando uma ano de validade a mais, baseado na data atual.
*/

// Global var
var knowledgeGR = new GlideRecord('kb_knowledge');
const limitQueryValuer = 50; // Aconselho a não processar mais que 50 registros por execução. 
var encodedQuerySearch = '';

knowledgeGR.addEncodedQuery(encodedQuerySearch);
knowledgeGR.setLimit(limitQueryValuer);
knowledgeGR.query();
runScript();




function runScript() {

    if(encodedQuerySearch == '') {
        return gs.info('É necessario informar uma query valida para a variavel "encodedQuerySearch"!');
    }

    while(knowledgeGR.next()) {

        knowledgeGR.setWorkflow(false);
        var date = new GlideDateTime(knowledgeGR.valid_to);
        date.addYearsLocalTime(1); // valide_to Valuer
        
        // Formato reconhecido '2020-01-01'
        var newDate =  String(date.getYearUTC() + '-' + date.getMonthUTC()  + '-' +  date.getDayOfMonthLocalTime());


        knowledgeGR.setValue('valid_to', newDate);
        knowledgeGR.setValue('active', true);

        knowledgeGR.update();
    }
}