import React, { useRef } from 'react'
import { MainLayer } from '../layers/MainLayer'
import { Button, TextField } from '@mui/material'
import { getGiftTokens } from '../blockchain/Airdrop'

function Airdrop() {
    const recipient = useRef()
    const [loading, setLoading] = React.useState(false)

    const airdrop = async () => {
        setLoading(true)
        const rec = recipient.current.value
        const result = await getGiftTokens(rec)
        console.log(result)
        setLoading(false)
    }

    return (
        <>
            <MainLayer />
            <div className='airdrop-container'>
                <h1>Airdrop</h1>
                <div className='airdrop-box'>
                    <h2>Get 100 EPARS gift tokens</h2>
                    <p>EPARS Token Address : <span className='token-address' > 0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1</span></p><br/>
                    <p className='account-text-label'>Recipient Address</p>
                    <TextField id="outlined-basic" variant="outlined" ref={recipient} defaultValue={"0x34510b2C73e23FBbE59b8294BEE076654df44cCa"} fullWidth />
                    <br />
                    <br />
                    <Button variant="contained" disabled={loading} onClickCapture={airdrop} size='large' onClick={""}>
                        {
                            loading ? 'Loading...' :
                                'Get Tokens'
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}

export { Airdrop }