var server = require('./server');
/*
Remember
hashing is the process of turning a message into another format to
    determine if it was tampered with, not to hide the information
    hash info, send info, then unhash, they should equal each other, 
    else something is wrong

encryption is the process of turning a message into another format so that  
    anyone looking at the other format has no idea what it means


 */
 //i have the public key of an authority built into me as
 // would a browser. we all have the public keys of all major CAs
  
var versignspublickey = "sldkjfl2kj3rlknfnlkf";
var godaddyspublickey = "lskjk2j3lkj3lkfjs;dlfk";

module.exports = main;

var process = {
    protocol:'tcp',
    domain:'www.server.com',
    ip:"10.10.10.10",
    cipher:'',
    port:443,
    stepOne:function(){
        return stepOne(process);
    },
    stepTwo:function(){
        return stepTwo(process);
    },
    handleServerHello:function(message){
        processServerHello.call(process,message);
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
    this.serverHello = message;
    this.cipher = message.cipher;
    this.certificate = message.certificate;
    this.certIsValid = verifyServerCertificateIsValid(this);

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
    server.receiveClientHello(process.helloMessage,process.handleServerHello)
    
    return process;
}
function stepTwo(process){
    //generate random string as a secret key and encrypt with public key
    process.preMasterSecret = "slkdfj;sxxx" + Math.random + Date.now();
    var encryptedPMS = encrypt(process.preMasterSecret);
    server.receivePreMasterSecret(encryptedPMS);
    return process;
}
function encrypt(message){
    //use the public key
    //do whatever the algorithm is for the cipher that we are using this session
    if(process.cipher ==="RC4"){
         return message;//whatever math this does
    }
    return message;
}
function verifyServerCertificateIsValid(process){

    var certificate = process.certificate;

     var publickeytouse;
    if(certificate.source === "verisign"){
        publickeytouse = versignspublickey;
    }
     if(certificate.source === "godaddy"){
        publickeytouse = godaddyspublickey;
    }

    //you are relying on the fact that your computer or browser is 
    //pre installed with the correct public key of trusted CAs
    //or that you manually get the public key from the correct source
    
    //1) is the current time between the valid date of the certificate
    if(Date.now() > certificate.validTo || Date.now() < certificate.validFrom){
        return false;
    }
    /*
    //2) the certifcate.encrypted property can only be encrypted by the private key
        // and only decrypted by the public key. so when you decrypt it
        //you get a message that should mean something
        //you must know what the meaning is and then compare
        //i.e. after you decrypt the message, there should be a word in there 
        //like the domain name of the site and you specifically look for that word
        //if its there the only way it could be there is because the server knew to put it there and properly encrypted it with the private key
        and the public key properly decrypted it so that the domain name is clearly seen in plain text
           
           so basically this means that a man in the middle will not have any 
           idea how to encrypt a message such that our public key will decrypt it meaninfully

           
           */
    var decrypted = decrypt(certificate.encrypted);

    function decrypt(message){
        if(process.cipher ==="RC4"){
            return process.domain;
            //use publickeytouse to decrypt
           // return message;//whatever math this does
        }
        return process.domain;
    }
    if(decrypted !== process.domain){
        return false;
    }

    return true;
}
