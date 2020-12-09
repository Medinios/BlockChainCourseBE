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

const myKey = ec.keyFromPrivate('e1809134428d3432f51d708592bcfffd6e58dd735feee50190e3a55617556178')

const myWalletAddress = myKey.getPublic('hex')

let micaCoin = new BlockChain()

const tx1 = new Transaction(myWalletAddress, 'address2', 30)
tx1.calculateHash()

// tx1.signTransaction(myKey)
// micaCoin.addTransaction(tx1)
// micaCoin.miningPendingTransaction(myWalletAddress)