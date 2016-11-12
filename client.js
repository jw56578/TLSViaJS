var server = require('./server');


main();
var process = {
    protocol:'tcp',
    domain:'www.server.com',
    ip:"10.10.10.10",
    port:443,
    stepOne:function(){
        return stepOne(this);
    }
};
function main(){
    createSSLConnection();
}


function makeTCPRequest(message){
    //make tcp request to port 443 at whatever ip
    //return response;
}


function createSSLConnection(){
    
    process
    .stepOne()
    .stepTwo()

}
/*
The SSL or TLS client sends a "client hello" message that lists 
cryptographic information such as the SSL or TLS version and, 
in the client's order of preference, the CipherSuites supported
 by the client. The message also contains a random byte string 
 that is used in subsequent computations. The protocol allows for
 the "client hello" to include the data compression methods 
 supported by the client.
*/
function processServerHello(message){
/*
    The SSL or TLS server responds with a "server hello" message 
    that contains the CipherSuite chosen by the server from the 
    list provided by the client, the session ID, and another
     random byte string. The server also sends its digital 
     certificate. If the server requires a digital certificate 
     for client authentication, the server sends a 
     "client certificate request" that includes a list of the 
     types of certificates supported and the Distinguished Names
      of acceptable Certification Authorities (CAs).
    */
    
    verifyServerCertificateIsValid(message.certificate);

}
function stepOne(process){
    //transport layer security 
    //public key encryption
    process.helloMessage= {
        message:"hello",
        //list of keys in order that can be used
        keys:['RSA','Diffie-Hellman','DSA'],
        //these are the ciphers the client is capable of using
        cipher:['RC4','Triple DES','AES'],
        //these are the hashes teh client is capable of
        hash:['HMAC-MD5','HMAC-SHA'],
        sslVersion:3.3,
        randomNumber:Math.random()

    }
    receiveClientHello(process.helloMessage,processServerHello)
    
    return process;
}
//The SSL or TLS client verifies the server's digital certificate.
//For more information, see How SSL and TLS provide identification,
 //authentication, confidentiality, and integrity.
function verifyServerCertificateIsValid(certificate){

     var publickeytouse;
    if(certificate.source === "verisign"){
        publickeytouse = versignspublickey;
    }
    //you are relying on the fact that your computer or browser is 
    //pre installed with the correct public key of trusted CAs
    //or that you manually get the public key from the correct source

    //create a message and encrypt it with public key
    //only someone with the correct private key can decrypt
    //send the message to the server
    //ask server to decrypt it and send it back
    //compare original message to message from server
    //so is the message sent back in plain text at this point?

    var generatedRandomMessage = "can you decrypt this???";
    //now what happens?




}
 //i have the public key of an authority built into me as
 // would a browser. we all have the public keys of all major CAs
  
var versignspublickey = "sldkjfl2kj3rlknfnlkf";
var godaddyspublickey = "lskjk2j3lkj3lkfjs;dlfk";