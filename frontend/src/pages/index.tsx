// next
import Head from 'next/head';

import UserHome from './components/UserHome';


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Staking Pool Interface </title>
      </Head>
      
      <UserHome />
    </>
  );
}
