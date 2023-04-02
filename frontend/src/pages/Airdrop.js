import React from 'react'
import { MainLayer } from '../layers/MainLayer'
import { TextField } from '@mui/material'
import { Modal } from '../components'

function Airdrop() {
    // set a default value for the input field (recipient address)
    const [value, setValue] = React.useState('0x34510b2C73e23FBbE59b8294BEE076654df44cCa')

    return (
        <>
            <MainLayer />
            <div className='airdrop-container'>
                <h1>Airdrop</h1>
                <div className='airdrop-box'>
                    <h2>Get 100 EPARS gift tokens</h2>
                    <p>EPARS Token Address : <span className='token-address' > 0xE55d3fB3f2890413382A03898Ef1dCbaCaDEF385</span></p><br />
                    <p className='account-text-label'>Recipient Address</p>
                    <TextField id="outlined-basic" variant="outlined" onChange={(e => { setValue(e.target.value) })} defaultValue={"0x34510b2C73e23FBbE59b8294BEE076654df44cCa"} fullWidth />
                    <br />
                    <br />
                    <Modal value={value} />
                </div>
            </div>
        </>
    )
}

export { Airdrop }