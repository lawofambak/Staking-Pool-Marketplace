import React, { useState } from 'react';
import { Container, Box, Typography, ListItem, List, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useSettingsContext } from '../../components/settings';
import StakingPoolContract from '../contract/StakingPool.json';

export default function Contract() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const contractAddress: any = router.query.contract;
  const { address, isConnected } = useAccount();
  const { data: signer }: any = useSigner();

  const [stakeAmount, setStakeAmount] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState();

  const stake = async () => {
    try {
      const stakingPool = new ethers.Contract(contractAddress, StakingPoolContract.abi, signer);
      // @ts-ignore
      await stakingPool.stakeIntoPool({value: ethers.utils.parseEther(stakeAmount.toString())});
    } catch (error) {
      window.alert(error.message);
    }
  };

  const withdrawStake = async () => {
    try {
      const stakingPool = new ethers.Contract(contractAddress, StakingPoolContract.abi, signer);
      // @ts-ignore
      await stakingPool.withdrawStakeFromPool(ethers.utils.parseEther(withdrawAmount.toString()));
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'} sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          p: 2,
          margin: '20px 10px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/">
          <HomeIcon />
        </Link>
        <Typography variant="subtitle1" component="div">
          Ethereum: Goerli
        </Typography>
        <Typography variant="subtitle1" component="div">
          Wallet Address: {address}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>Contract {contractAddress}</h1>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '2rem',
          }}
        >
          <Box
            sx={{
              height: '15vh',
              width: '20%',
              border: '1px dashed grey',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <h3>Pool Balance</h3>
            <p>some information</p>
          </Box>
          <Box
            sx={{
              height: '15vh',
              width: '20%',
              border: '1px dashed grey',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <h3>Is pool full?</h3>
            <p>some information</p>
          </Box>
          <Box
            sx={{
              height: '15vh',
              width: '20%',
              border: '1px dashed grey',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <h3>Number of stakers in pool</h3>
            <p>some information</p>
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            marginY: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignContent: 'space-around',
            }}
          >
            <TextField
              id="outlined-number"
              label="Amount to Stake"
              type="number"
              placeholder="in ETH"
              value={stakeAmount}
              onChange={(e) =>
                // @ts-ignore
                setStakeAmount(parseFloat(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              sx={{
                marginY: '1rem',
                fontSize: '20px',
              }}
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={() => stake()}
            >
              Stake
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              id="outlined-number"
              label="Amount to Withdraw"
              type="number"
              placeholder="in ETH"
              value={withdrawAmount}
              onChange={(e) =>
                // @ts-ignore
                setWithdrawAmount(parseFloat(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              sx={{
                marginY: '1rem',
                fontSize: '20px',
              }}
              variant="contained"
              endIcon={<CancelIcon />}
              onClick={() => withdrawStake()}
            >
              Withdraw Stake
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
