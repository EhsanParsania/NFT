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

  // wait for 5 confirmations
  await epars.deployTransaction.wait(5)

  console.log(`EPARS deployed to ${epars.address}`)

  await verifyContract(epars, 'EPARS')

  // const NFT = await hre.ethers.getContractFactory('NFT')
  // const nft = await NFT.deploy()

  // await nft.deployed()

  // console.log(`NFT deployed to ${nft.address}`)


  // fs.writeFileSync(path.join(buildPath, 'deployed contract addresses'),
  //   `EPARS = ${epars.address}
  //    NFT = ${nft.address}`
  // )

  // verifyContract(nft, 'NFT')
}


async function verifyContract(token, contractName) {
  if (!isPublicNetwork) {
    // verifying contracts are only needed for public network deployments
    return
  }
  try {
    await hre.run('verify:verify', { address: token.address })
    console.log(`\n\n --> ${contractName} verified on the scanner site`)
  } catch (err) {
    const already = err.message?.toLowerCase()?.includes('already verified')
    if (already) {
      console.log(`     Verification error: ${err.message}`)
    } else {
      // possible error reasons: API key is not set, network connection errors (we should be able to try again, to verify only)
      console.log(`\n\n --> ${contractName} is not verified on the scanner site\n`)
      throw err
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
