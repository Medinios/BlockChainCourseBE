const {
    Block
} = require('./Block.js')
const {
    Transaction
} = require('./Transaction.js')
const {
    BlockChain
} = require('./BlockChain.js')

const EC = require('elliptic').ec

const ec = new EC('secp256k1')
// myKey1 = ec.keyFromPublic('041ac13bb52a90c7458d26b80170a3d7fcacefdc949741b9cb8ea363d0df3bddcd6a4fb5e20c7734ed8fdea1250b2407792e33481ac5eabc7e9e4b1e7dc394111d')
// myKey2 = ec.keyFromPrivate('cdc78a8260af7ec8c0c6610e08eda07164b4c34193031b87f404572a38078027')

myKey3 = ec.keyFromPrivate('cdc78a8260af7ec8c0c6610e08eda07164b4c34193031b87f404572a38078027')

console.log(myKey3);
// console.log(myKey1 === myKey2);
// const myWalletAddress = myKey.getPublic('hex')
// // console.log(myWalletAddress);


// // let micaCoin = new BlockChain()

// const tx1 = new Transaction(myWalletAddress, 'address2', 30)
// const tx2 = new Transaction(myWalletAddress, 'address3', 30)
// tx1.signTransaction(myKey)
// // tx1.calculateHash()
// sashaCoin = new BlockChain()
// sashaCoin.chain.push(sashaCoin.createGenesisBlock())

// sashaCoin.addTransaction(tx1)
// sashaCoin.miningPendingTransaction("Wallet")
// sashaCoin.hasTransaction(tx1)
// console.log("tx1: " + sashaCoin.chain[1].hasTransaction(tx1));
// console.log("tx2: " + sashaCoin.chain[1].hasTransaction(tx2));

// console.log(Date.now());
// // console.log(sashaCoin.chain);

// test = {
//     "timestamp": "",
//     "transactions": Object.assign(new Array, [1, 2]),
//     "previousHash": 'lol2k',
//     "nonce": 2,
//     "hash": "This is the end"
// }
// console.log(test);
// test = Object.assign(new Block, test)
// console.log(test);
// test.calculateHash()
// tx1.signTransaction(myKey)
// micaCoin.addTransaction(tx1)
// micaCoin.miningPendingTransaction(myWalletAddress)