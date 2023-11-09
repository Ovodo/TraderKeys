import { ObjectId } from "mongodb";

export type UserInfo = {
  username: string;
  name: string;
  imgSrc?: string;
  followers?: number;
  following?: number;
};

export type User = UserInfo & {
  publicKey: string;
  privateKey: string;
};
export type PrivateKey = {
  name: string;
  address: string;
  amount?: number;
  owner: string;
  supply?: number;
  pnl?: string;
  price?: string;
};
export type Ticket = {
  _id: ObjectId;
  author: string;
  category: string;
  asset: string;
  open: number | string;
  close?: number | string;
  pnl?: number | string;
  closed: boolean;
};

export type ContractTradeEvent = {
  version: number;
  guid: {
    creation_number: number;
    account_address: string;
  };
  sequence_number: number;
  type: string;
  data: {
    is_buy: boolean;
    new_supply: number;
    protocol_fee_apt_amount: number;
    purchase_apt_amount: number;
    key_amount: number;
    subject: string;
    subject_fee_apt_amount: number;
    trader: string;
  };
};

export type ContractGetOwnedCollectionsResponse = [string[], number[]];

export type ContractGetCollectionsResponse = [string[], number[]];

export type ContractGetHoldersResponse = [string[], number[]];
