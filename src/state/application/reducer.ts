import { updateBlockNumber, setOpenModal } from './actions';
import { createReducer } from '@reduxjs/toolkit';

export enum ApplicationModal {
  WALLET,
  SEARCH,
  MAKE_OFFER,
  BUY_NOW,
  ACCEPT_OFFER,
  INVALID_OFFER,
  LIST_FOR_SALE,
  CREATE_ITEM_SUCCESS,
  CREATE_COLLECTION_SUCCESS,
  COLLECTION_OFFER,
  COLLECTION_OFFER_PROGRESS,
  COLLECTION_OFFER_SUCCESS,
  PROFILE,
  PROFILE_EDIT,
  CHOOSE_AVATAR,
}

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly openModal: ApplicationModal | null;
}

const initialState: ApplicationState = {
  blockNumber: {},
  openModal: null,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload;
    })
);
