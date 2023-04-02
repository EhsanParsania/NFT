import React from 'react'
import { MainLayer } from '../layers/MainLayer';
import Parse from 'parse'
import { Button, TextField } from '@mui/material';

function AccountAbstraction() {
    const [abstractAccount, setAbstractAccount] = React.useState(null)
    const [createLoading, setCreateLoading] = React.useState(false)
    const [transactionHash, setTransactionHash] = React.useState(null)
    const [transferLoading, setTransferLoading] = React.useState(false)

    const createNewAbstractedAccount = async () => {
        setCreateLoading(true)
        const newAccount = await Parse.Cloud.run('get-new-address')
        setAbstractAccount(newAccount)
        console.log(newAccount)
        setCreateLoading(false)
    }

    const sendERC20 = async () => {
        setTransferLoading(true)
        const txHash = await Parse.Cloud.run('transfer-erc20', {
            to: "0x34510b2C73e23FBbE59b8294BEE076654df44cCa",
            amount: 1,
            token: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
        })

        console.log(txHash)
        setTransactionHash(txHash)
        setTransferLoading(false)
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
                        <h4>{abstractAccount ? <a href={`https://mumbai.polygonscan.com/address/${abstractAccount}`} target='blank' >{abstractAccount}</a> : null} </h4>
                        <br />
                        <p className='account-text-label'>Token (DummyToken)</p>
                        <TextField id="outlined-basic" variant="outlined" defaultValue={"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"} fullWidth />
                        <p className='account-text-label'>Recipient</p>
                        <TextField id="outlined-basic" variant="outlined" defaultValue={"0x34510b2C73e23FBbE59b8294BEE076654df44cCa"} fullWidth />
                        <p className='account-text-label'>Amount</p>
                        <TextField id="outlined-basic" variant="outlined" fullWidth />
                        <br />
                        {
                            transactionHash &&
                            <>
                                <p className='success-abstraction'>Abstracted Account has been created</p>
                                <p className=''>Transaction Hash: <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target='blank' >{transactionHash}</a></p>

                            </>
                        }
                        <br />
                        <Button variant="contained" onClick={sendERC20}>
                            {
                                transferLoading ? 'Loading...' :
                                    'Transfer Token'
                            }
                        </Button>
                    </div>
                }
            </div>
        </>
    );
}

export { AccountAbstraction }