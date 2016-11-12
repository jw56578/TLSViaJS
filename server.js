function receiveClientHello(message,sendServerHello){



    var message = {
        requireClientCert:false,
        randomNumber:'111111',
        sessionId:"11114wlkj?",
        key:"keyserverchooses",//RSA
        cipher:"cipherserverchoosestouse",///RC4
        hash:"hashserverchoosestouse",
        certificate:{
            source:"verisign",
            publicKey:"klsdjfsdf23j3lkj3xlkccj"
        }
    }
    sendServerHello(message);
}
module.exports = {
    receiveClientHello:receiveClientHello
};
