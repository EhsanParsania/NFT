import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { getGiftTokens } from '../blockchain/Airdrop'


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

class Modal extends React.Component {
    state = {
        open: false,
        loading: false
    };

    airdrop = async () => {
        this.setState({ loading: true })
        console.log(this.props.value)
        const result = await getGiftTokens(this.props.value)
        console.log(result)
        this.setState({ loading: false, tx: result })
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    Get Tokens
                </Button>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Airdrop Gift Tokens
                    </DialogTitle>
                    <DialogContent className='modal-content'>
                        <Typography gutterBottom>
                            <div className='airdrop-info-container'>
                                <div className='airdrop-info'>
                                    <span className=''>Token</span>   <span className=''>EPARS</span>
                                </div>
                                <div className='airdrop-info'>
                                    <span className=''>Amount</span>   <span className=''>100</span>
                                </div>
                                <div className='airdrop-info'>
                                    <span className=''>Network</span>   <span className=''>Mumbai</span>
                                </div>
                                <div className='airdrop-info'>
                                    <span className=''>Network ID</span>   <span className=''>80001</span>
                                </div>
                                <br />

                                <div className='airdrop-info-button' >
                                    <div></div>
                                    <p className='airdrop-success'>
                                        {
                                            this.state.tx ? 'Success!' : ''
                                        }
                                        <p className='tx-hash'>
                                            {
                                                this.state.tx ? this.state.tx.transactionHash : ''
                                            }
                                        </p>
                                    </p>
                                    <div></div>
                                </div>

                                <br />

                                <div className='airdrop-info-button' >
                                    <div></div>
                                    <Button variant="contained" disabled={this.state.loading} onClickCapture={this.airdrop} size='large' >
                                        {
                                            this.state.loading ? 'Loading...' :
                                                'Get Tokens'
                                        }
                                    </Button>
                                    <div></div>
                                </div>
                            </div>

                        </Typography>
                    </DialogContent>
                </Dialog>
            </div >
        );
    }
}

export { Modal };
