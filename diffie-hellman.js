//https://www.youtube.com/watch?v=YgNWLB6Vd-w
let clientSharedPublicNumber = 15;
let serverSharedPublicNUmber = 15;

//these should be way bigger but js can't handle it
let clientSecretNumber = 3;
let serverSecretNumber = 6;

//there is no way you could get back to clientSecretNumber(3) from this value
//the public components are sharable, anyone can see them
let clientPublicComponent  = Math.pow(clientSharedPublicNumber, clientSecretNumber);

//this is what the server sends to the client when tls handshake occurs
let serverPublicComponent = Math.pow(serverSharedPublicNUmber, serverSecretNumber);


//the client will raise the servers public component to its private secret number
let thepasswordonclient =  Math.pow(serverPublicComponent, clientSecretNumber);

let thepasswordonserver =  Math.pow(clientPublicComponent, serverSecretNumber);


//now client and server have the same secret password to use to encrypt things
console.log(thepasswordonclient ===thepasswordonserver);





