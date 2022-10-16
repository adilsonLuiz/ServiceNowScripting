/* 
    Elaborar logica para desativar REQ
*/

var ritmGR = new GlideRecord('sc_req_item');
// EncodedQuery filter IMPORTANTE COLOCAR
var encodedQueryRITM = '';
var requests = getRequestNumber();
InactiveAllRequestInList(requests);
// Begin program
inactiveREQ();



function inactiveREQ() {

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


    function InactiveAllRequestInList(requestList) {
        if(encodedQueryRITM === '') {
            gs.log('ERRO: "encodedQueryRITM is empy!"')
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

        // Iteração para desativar todas as REQ obtidas na query
        while(requestGR.next()) {
            gs.log('REQ DESATIVADA: ' + requestGR.getDisplayValue('number'))
            requestGR
            .setValue('active', false); // Desativa
        }
    }

    // For debug 
    function printInformation(thing) {
        
        for(var i = 0; i < thing.length; i++) {
            gs.log(thing[i]);
        }
    }



}

