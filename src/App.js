import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
// Debugging step
console.log('API Key from .env:', process.env.REACT_APP_ALCHEMY_API_KEY);
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState(null);

  function hexToDec(hex) {
    return parseInt(hex, 16);
  }

  useEffect(() => {
    async function getLatestBlockInformation() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      // console.log(blockNumber)
      setBlock(await alchemy.core.getBlock(blockNumber))
      // console.log(block)
    }

    getLatestBlockInformation();
    console.log(block)
  },[]);

  return (
    <>
    <div className="App">Block Number: {blockNumber}</div>
    {block && block.hash && <div>Block Hash: {block.hash}</div>}
    {block && block.difficulty != null && <div>Block Difficulty: {block.difficulty}</div>}

    {block && block.extraData && <div>Block Extra Data: {block.extraData}</div>}
    {block && block.miner && <div>Block Miner: {block.miner}</div>}
    {block && block.nonce && <div>Block Nonce: {block.nonce}</div>}
    {block && block.parentHash && <div>Block Parent Hash: {block.parentHash}</div>}
    {block && block.timestamp && <div>Block Nonce: {block.timestamp}</div>}

    {block && block.transactions && <div>Block Total Transactions: {block.transactions.length}</div>}
    {block && block.gasLimit && <div>Block Gas Limit: {hexToDec(block.gasLimit._hex)} Gwei</div>}
    {block && block.gasUsed && <div>Block Gas Used: {hexToDec(block.gasUsed._hex)} Gwei</div>}
  </>
  )
}

export default App;
