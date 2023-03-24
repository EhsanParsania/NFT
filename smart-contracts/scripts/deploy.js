const hre = require('hardhat')
const fs = require('fs')
const path = require('path')
const buildPath = path.resolve(__dirname, '../build')
if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath)

const isPublicNetwork =  !hre.network.name.includes('local') 


async function main() {
  const EPARS = await hre.ethers.getContractFactory('EPARS')
  const epars = await EPARS.deploy()

  await epars.deployed()

  console.log(`EPARS deployed to ${epars.address}`)

  const EparsFactory = await hre.ethers.getContractFactory('EparsFactory')
  const eparsFactory = await EparsFactory.deploy(epars.address)

  await eparsFactory.deployed()

  console.log(`EparsFactory deployed to ${eparsFactory.address}`)

  const NFT = await hre.ethers.getContractFactory('NFT')
  const nft = await NFT.deploy()

  await nft.deployed()

  console.log(`NFT deployed to ${nft.address}`)


  fs.writeFileSync(path.join(buildPath, 'deployed contract addresses'),
    `EPARS = ${epars.address}
     EparsFactory = ${eparsFactory.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
