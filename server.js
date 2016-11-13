
var session = {
    preMasterSecret:null,
    masterSecret:null,
    clientRandomNumber:null,
    serverRandomNumber:null
}

function receiveClientHello(message,sendServerHello){
    //do work to determine what values can be accomodated from the client
    //get cert from file system and encode it with private key

    //the certificate is actuall sent in a seperate message
    //but that isn't relevant so we will just put it all together'
    //
    var serverMessage = {
        requireClientCert:false,
        randomNumber:Math.random(),
        sessionId:"11114wlkj?",
        key:"keyserverchooses",//RSA
        cipher:"cipherserverchoosestouse",///RC4
        hash:"hashserverchoosestouse",
       
        certificate:{
           validFrom:'1/1/2014',
            validTo:'1/1/2017',
            source:"verisign",
            encrypted:"skdfjasldkfjs;lkdfj;alkdjsf;laksdjf#@#$%#$%ldksjg",
            publicKey:"klsdjfsdf23j3lkj3xlkccj"
        }
    }
    session.serverRandomNumber = serverMessage.randomNumber;
    session.clientRandomNumber = message.randomNumber;
    sendServerHello(serverMessage);
}
function receivePreMasterSecret(secret){
    session.masterSecret = pseudoRandomFunction(secret, "master secret",session.clientRandomNumber + session.serverMessage);
}
function pseudoRandomFunction(preMasterSecret,message, random1, random2){
    //i have no idea what this is suppose to do, it just generates another random value that is in the spec
    return 'sldkjfklxjiosjdfojewlkfjwe;lkjf';
}
module.exports = {
    receiveClientHello:receiveClientHello,
    receivePreMasterSecret: receivePreMasterSecret
};
