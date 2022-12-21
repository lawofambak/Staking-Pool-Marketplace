/* eslint-disable react/prop-types */
import Link from 'next/link';
import React from 'react';

// @ts-ignore
export default function ContractListItem({ contractAddress }) {
  return (
    <li>
      <Link href={`/pool/${contractAddress}`}>
        <p>Contract: {contractAddress}</p>
      </Link>
    </li>
  );
}
