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

myKey = ec.keyFromPublic('Daniel')
const myWalletAddress = myKey.getPublic('hex')
console.log(myWalletAddress);
// let micaCoin = new BlockChain()

// const tx1 = new Transaction(myWalletAddress, 'address2', 30)
// tx1.signTransaction(myKey)
// // tx1.calculateHash()
// sashaCoin = new BlockChain()
// sashaCoin.addTransaction(tx1)
// sashaCoin.miningPendingTransaction("Wallet")
// console.log(sashaCoin.chain);

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