import React from 'react'
import { MainLayer } from '../layers/MainLayer';
import Parse from 'parse'
import { Input, TextField } from '@mui/material';

function AccountAbstraction() {
    const [abstractAccount, setAbstractAccount] = React.useState(null)
    const [createLoading, setCreateLoading] = React.useState(false)

    const createNewAbstractedAccount = async () => {
        setCreateLoading(true)
        const newAccount = await Parse.Cloud.run('get-new-address')
        setAbstractAccount(newAccount)
        console.log(newAccount)
        setCreateLoading(false)
    }

    const sendERC20 = async () => {
        const result = await Parse.Cloud.run('transfer-erc20', {
            to: "0x34510b2C73e23FBbE59b8294BEE076654df44cCa",
            amount: 1,
            token: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
        })
        console.log(result)
    }

    return (
        <>
            <MainLayer />
            <div className='abstract-container'>
                <h1>Account Abstraction ERC-4337</h1><br /><br />
                <button className='mint-nft' disabled={createLoading} onClick={createNewAbstractedAccount}>
                    {
                        createLoading ? 'Loading...' :
                            'Create New Account'
                    }
                </button>

                {
                    abstractAccount &&
                    <div className='new-address-box'>
                        <p className='new-addres-text'>This is your new account address, you should make the first transfer to create the abstracted account</p>
                        <h3>{abstractAccount ? <a href={`https://mumbai.polygonscan.com/address/${abstractAccount}`} target='blank' >{abstractAccount}</a> : null} </h3>

                        <br />
                        <p className='account-text-label'>Token (DummyToken)</p>
                        <TextField id="outlined-basic" variant="outlined" defaultValue={"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"} fullWidth />
                        <p className='account-text-label'>Recipient</p>
                        <TextField id="outlined-basic" variant="outlined" defaultValue={"0x34510b2C73e23FBbE59b8294BEE076654df44cCa"} fullWidth />
                        <p className='account-text-label'>Amount</p>
                        <TextField id="outlined-basic" variant="outlined" fullWidth />
                        {/* <input type='text' value={"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"} /><br />
                        <input type="text" value={"0x34510b2C73e23FBbE59b8294BEE076654df44cCa"} /><br />
                        <input type="text" placeholder="Amount" /><br /> */}
                        <button onClick={sendERC20}>Send</button>
                    </div>
                }
            </div>
        </>
    );
}

export { AccountAbstraction }