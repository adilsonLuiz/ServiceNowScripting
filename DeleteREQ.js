/* Usar com muita cautela, e ter certeza de passar o encoded apenas de RITM, que iram ser deletadas.
O script monta uma query baseado nas ritms informadas e assim deleta todas as REQ baseadas na RITM enviadas anteriormente.
SCRIPT MONTADO APENAS PARA USO EM AMBIENTE DE DESENVOLVIMENTO, QUALQUER UTILIZAÇÃO EM PRD E POR CONTA EM RISCO DO ANALISTA
*/ 



// Free scope logic program
var totalDeleteREQ = 0;
var ritmGR = new GlideRecord('sc_req_item');
// EncodedQuery filter IMPORTANTE COLOCAR
var encodedQueryRITM = '';
var requests = getRequestNumber();
deleteAllRequestInList(requests);

// Begin program
deleteREQ();


function deleteREQ() {

    function runEncodedQuery(query, grObject) {

        grObject.addEncodedQuery(query);
        grObject.query();
    }

    function getRequestNumber() {
        // Get resquests list with encoded query RITM
        var requests = []
        runEncodedQuery(encodedQueryRITM, ritmGR);
        while(ritmGR.next()) {
            requests.push(ritmGR.getDisplayValue('request'));
        }
        return requests;
    }


    function deleteAllRequestInList(requestList) {
        if(encodedQueryRITM === '') {
            gs.log('ERRO: "encodedQueryRITM is empy!"');
            return;
        }
        var newEncoded = 'numberIN';
        // Monta uma query nova com as REQ obtidas
        for(var i = 0; i < requestList.length; i++) {
            newEncoded += requestList[i] + ','
        }
        // Instancia um objeto novo na tabela de REQUEST
        var requestGR = new GlideRecord('sc_request')
        runEncodedQuery(newEncoded, requestGR);

        // Iteração para deletar todas as REQ obtidas na query
        requestGR.deleteMultiple()
    }

    // For debug 
    function printInformation(thing) {
        
        for(var i = 0; i < thing.length; i++) {
            gs.log(thing[i]);
        }
    }
}

