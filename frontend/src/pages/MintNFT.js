import React from 'react'
import { mintNFT } from '../blockchain/NFT'
import { MainLayer } from '../layers/MainLayer';
import { Input } from '@web3uikit/core';
import Parse from 'parse'



function MintNFT() {
    const [fileUrl, setFileUrl] = React.useState(null)
    const [disabled, setDisabled] = React.useState(true)

    const mint = async () => {
        const recipient = '0x34510b2C73e23FBbE59b8294BEE076654df44cCa'
        const result = mintNFT(recipient, fileUrl)
        console.log(result)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            const base64 = reader.result.split('base64,')[1]
            const uploadedFile = await Parse.Cloud.run('upload-image', { name: file.name, data: base64 })
            setFileUrl(uploadedFile.url())
            setDisabled(false)
            const Image = Parse.Object.extend('Image')
            const image = new Image()
            await image.save({ image: uploadedFile, imageName: file.name })
        }
    }

    return (
        <>
            <MainLayer />
            <h1>Mint NFT</h1>
            <Input type="file" placeholder="Recipient" onChange={handleChange} />
            <button className='mint-nft' disabled={disabled} onClick={mint}>Mint NFT</button>
        </>
    )
}

export { MintNFT }