import { Button, Box, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export default function ConnectMetamask() {
    const { connect } = useConnect({connector: new MetaMaskConnector(),});

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: "100%", height:"100%", alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx={{ margin: '30px' }} variant="h1" component="div">
                Manage Your Staking Pools
            </Typography>
            <Button
                sx={{width: '350px', height: '75px', fontSize: '25px', backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#1560bd'}}}
                variant="contained"
                startIcon={<LinkIcon />}
                endIcon={<LinkIcon />}
                onClick={() => connect()}
            >
                Connect Metamask
            </Button>
        </Box>
    )
}