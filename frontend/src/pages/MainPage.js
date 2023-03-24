import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { MainLayer } from '../layers/MainLayer';
import { Card } from '../components/Card';
import { NFTCard } from '../components';

export function MainPage() {
    return (
        <>
            <MainLayer />
            <aside id='menu'>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Drafts" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Trash" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </aside>
            <main id='content'>
                {/* <Card /> */}
                <NFTCard
                    nft={{
                        imageUrl: "https://parsefiles.back4app.com/i49JjHmG3TiQULMYV5OWSNEkdtgMrL33PDE8wRL1/30b506d2b6427d3d0077790f90184edb_nft.png",
                        title: 'My NFT', address: '0xT3rd3Ad...', owner: '0xdfjioe..', price: '2.1'
                    }}
                />
            </main>
        </>
    );
}
