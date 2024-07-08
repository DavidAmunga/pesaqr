import { TRANSACTION_TYPE } from "./TransactionType";

export interface Data {
  name: string;
  logo: string;
  paybillNumber: string;
  accountNumber: string;
  tillNumber: string;
  storeNumber: string;
  agentNumber: string;
  amount: string;
  type: TRANSACTION_TYPE;
  code: string;
}

export type FormData = Partial<Data>;