import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import ConnectMetamask from "./ConnectMetamask";
import UserDashboard from "./UserDashboard";


export default function UserHome() {
    const [_isConnected, _setIsConnected] = useState<boolean>(false);

    const { address, isConnected } = useAccount();

    useEffect(() => {
        _setIsConnected(isConnected);
      }, [isConnected]); 

    return (
        <>
            {_isConnected ? <UserDashboard address={ address }/> : <ConnectMetamask />}
        </>
    );
}