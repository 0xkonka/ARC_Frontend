import { OrderTypes } from 'abis/types/Exchange';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';

interface MakerOrder {
  isOrderAsk: boolean;
  signer: string;
  collection: string;
  price: BigNumberish;
  tokenId: BigNumberish;
  amount: BigNumberish;
  strategy: string;
  currency: string;
  nonce: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  minPercentageToAsk: BigNumberish;
  params: BytesLike;
}

export default async function signMakeOrder(signer: any, verifier: string, order: MakerOrder) {
  console.log('signer', signer);
  const chainId = BigNumber.from(await signer.getChainId());
  const domain = {
    name: 'ARC Marketplace',
    version: '1',
    chainId,
    verifyingContract: verifier,
  };
  const types = {
    MakerOrder: [
      {
        name: 'isOrderAsk',
        type: 'bool',
      },
      {
        name: 'signer',
        type: 'address',
      },
      {
        name: 'collection',
        type: 'address',
      },
      {
        name: 'price',
        type: 'uint256',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'strategy',
        type: 'address',
      },
      {
        name: 'currency',
        type: 'address',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'startTime',
        type: 'uint256',
      },
      {
        name: 'endTime',
        type: 'uint256',
      },
      {
        name: 'minPercentageToAsk',
        type: 'uint256',
      },
      {
        name: 'params',
        type: 'bytes',
      },
    ],
  };
  const rawSignature = await signer._signTypedData(domain, types, order);
  const signature = ethers.utils.splitSignature(rawSignature);
  return {
    ...order,
    r: signature.r,
    s: signature.s,
    v: signature.v,
  };
}
