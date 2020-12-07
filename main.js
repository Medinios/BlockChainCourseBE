// const {
//     default: MerkleTree
// } = require('merkletreejs')
// const {
//     Transaction
// } = require('./models/Transaction.js')
// const {
//     Blockchain
// } = require('./models/Blockchain.js')
// const {
//     BloomFilter
// } = require('bloom-filters')
// const SHA256 = require('crypto-js/sha256')
// const {
//     type
// } = require('os')
// const {
//     log
// } = require('console')

// const EC = require('elliptic').ec
// const ec = new EC('secp256k1')
// const myKey = ec.keyFromPrivate('e1809134428d3432f51d708592bcfffd6e58dd735feee50190e3a55617556178')
// const myWalletAddress = myKey.getPublic('hex')
// const micaCoin = new Blockchain()

const express = require('express')
const transactions = require('./controllers/TransactionController.js');
const {
    TransactionController
} = require('./controllers/TransactionController.js')

const {
    join
} = require('path')
const path = require('path')

const app = express()
//Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')))

app.get('/tran', (req, res) => {
    res.json(transactions)
})

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`Server started on port ${PORT}`);
})

// txs = new Array()

// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//         const tx = new Transaction(myWalletAddress, 'address1', i * j * 3)
//         tx.signTransaction(myKey)
//         micaCoin.addTransaction(tx)
//         txs.push(tx)
//     }
//     micaCoin.miningPendingTransaction(myWalletAddress)
// }
// const tx1 = new Transaction(myWalletAddress, 'address1', 50)
// const tx2 = new Transaction(myWalletAddress, 'address1', 100)

// tx1.signTransaction(myKey)
// tx2.signTransaction(myKey)

// micaCoin.addTransaction(tx1)
// micaCoin.addTransaction(tx2)

// console.log(txs.length);
// console.log(micaCoin);