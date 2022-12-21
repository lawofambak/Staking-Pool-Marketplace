import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Container, Typography, Box, List } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { useProvider, useSigner, useDisconnect, useAccount } from 'wagmi';
import axios from 'axios';
import router from 'next/router';
import { useSettingsContext } from '../../components/settings';
import ContractListItem from './ContractListItem';
import StakingPoolContract from '../contract/StakingPool.json';

export default function UserDashboard(props: { address: string | undefined }) {
  const { themeStretch } = useSettingsContext();
  const [deployedContract, setDeployedContract] = useState<string>('');
  const [_isConnected, _setIsConnected] = useState<boolean>(false);
  const [pools, setPools] = useState<any>([]);
  const [accounts, setAccounts] = useState<any>([]);

  const { address, isConnected } = useAccount();

  // wagmi
  const provider = useProvider();

  const { data: signer }: any = useSigner();
  const backendUrl = `https://poolbackend.herokuapp.com`;
  const poolUrl = `${backendUrl}/pool`;
  const accountUrl = `${backendUrl}/account`;

  // if not found in get below
  //console.log(`http://pokt-08-a.cryptonode.tools:3000/account/asdfasdf${address}`)
  // check if connected account has pools
  let ownerObjId = '';
  let ownerObj = {};
  const res = axios
    .get(`${accountUrl}/${address}`)
    .then(function (response) {
      console.log(32, 'then', response);
      console.log(33, response.data._id);
      ownerObjId = response.data._id;
      ownerObj = response.data;
    })
    .catch(function (error) {
      console.log(35, 'catch', error.response);
      if (error.response?.statusText == 'Not Found') {
        axios
          .post(`${accountUrl}`, {
            address: address,
          })
          .then(function (response) {
            console.log(41, response);
            console.log(42, response.data._id);
            ownerObjId = response.data._id;
            ownerObj = response.data;
          });
      }
    });

  console.log(32, res);
  // then post to create new account

  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const { disconnect } = useDisconnect({
    onSuccess(data) {
      _setIsConnected(false);
      console.log(29, _isConnected);
      console.log('Success', data);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
    onError(error) {
      console.log('Error', error);
    },
  });

  function disconnectSetState() {
    disconnect();
    _setIsConnected(false);
  }

  // Function to deploy new pool
  const deployNewPool = async () => {
    try {
      const contractFactory = new ethers.ContractFactory(
        StakingPoolContract.abi,
        StakingPoolContract.bytecode,
        signer
      );

      const contract = await contractFactory.deploy();

      console.log('Deploying contract...');

      await contract.deployed();
      // let poolDto = new FormData()

      // poolDto.append('pool_address', contract.address)
      // poolDto.append('owner', address)
      // poolDto.append('network', 'goerli')
      //console.log(99, poolDto)
      console.log(108, ownerObj);

      axios
        .post(
          `${poolUrl}`,
          { pool_address: contract.address, owner: ownerObjId, network: 'goerli' },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(function (response) {
          console.log(99, response);
          // @ts-ignore
          ownerObj.deployed_pools?.push(response.data._id);
          axios.put(`${accountUrl}/` + ownerObjId, ownerObj, {
            headers: { 'Content-Type': 'application/json' },
          });
        })
        .catch(function (error) {
          console.log(110, error);
          console.log(111, error.response.data);
        });

      setDeployedContract(contract.address);

      router.push(`/pool/${contract.address}`);
    } catch (error) {
      window.alert(error.message);
    }
  };

  // axios Function to get all pools
  const fetchData = async () => {
    try {
      const { data } = await axios(poolUrl);
      const response = await axios(accountUrl);
      const data2 = response.data;
      console.log(data);
      console.log(data2);

      setPools(data);
      setAccounts(data2);
    } catch (error) {
      console.log(error.response);
    }
  };

  // const getAllAccounts = async () => {
  //   try {
  //     const { data } = await axios(accountUrl);
  //     console.log(data);
  //     // setDeployedAccounts(data);
  //     // setAllPools(data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  //   // console.log(allPools);
  // };

  useEffect(() => {
    fetchData();
    // getAllAccounts();
  }, []);

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
        <Typography variant="subtitle1" component="div">
          Ethereum: Goerli
        </Typography>
        <Typography variant="subtitle1" component="div">
          {/* eslint-disable-next-line react/destructuring-assignment */}
          Connect at: {props.address}
        </Typography>
        <Button
          sx={{
            width: '125px',
            height: '30px',
            fontSize: '15px',
            backgroundColor: '#dc143c',
            '&:hover': { backgroundColor: '#800000' },
          }}
          variant="contained"
          endIcon={<CodeOffIcon />}
          onClick={() => disconnectSetState()}
        >
          Disconnect
        </Button>
      </Box>
      <Typography variant="h4" component="div">
        Deployed
      </Typography>
      <Box
        sx={{
          height: '15vh',
          paddingLeft: 3,
          border: '1px dashed grey',
          borderRadius: '15px',
          margin: '10px',
          overflow: 'auto',
        }}
      >
        <List style={{ listStyle: 'none' }}>
          <ContractListItem contractAddress="1" />
          <ContractListItem contractAddress="2" />
          <ContractListItem contractAddress="3" />
          <ContractListItem contractAddress="4" />
        </List>
      </Box>
      <Typography variant="h4" component="div">
        Staked
      </Typography>
      <Box
        sx={{
          height: '15vh',
          paddingLeft: 3,
          border: '1px dashed grey',
          borderRadius: '15px',
          margin: '10px',
          overflow: 'auto',
        }}
      >
        <p>testing</p>
      </Box>
      <Typography variant="h4" component="div">
        Pools
      </Typography>
      <Box
        sx={{
          height: '15vh',
          paddingLeft: 3,
          border: '1px dashed grey',
          borderRadius: '15px',
          margin: '10px',
          overflow: 'auto',
        }}
      >
        <List style={{ listStyle: 'none' }}>
        {pools.map((pool: any) => (
          <ContractListItem contractAddress={pool.pool_address} />
          ))}
          </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '10px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            width: '275px',
            height: '60px',
            margin: '20px',
            fontSize: '20px',
            backgroundColor: '#007FFF',
            '&:hover': { backgroundColor: '#1560bd' },
          }}
          variant="contained"
          endIcon={<ArrowOutwardIcon />}
          onClick={() => deployNewPool()}
        >
          Deploy New Pool
        </Button>
        {deployedContract ? (
          <Typography variant="subtitle1" component="div">
            Contract deployed at: {deployedContract}
          </Typography>
        ) : (
          <Typography variant="subtitle1" component="div">
            Nothing deployed yet...
          </Typography>
        )}
      </Box>
    </Container>
  );
}
