import { FormData } from "@/@types/Data";
import { TRANSACTION_TYPE } from "@/@types/TransactionType";

export const generateQRCode = (data: FormData): string | null => {
  const {
    tillNumber,
    agentNumber,
    storeNumber,
    amount,
    accountNumber,
    paybillNumber,
  } = data;

  switch (data.type) {
    case TRANSACTION_TYPE.TILL_NUMBER:
      return `BG|${tillNumber}|${amount}`;
    case TRANSACTION_TYPE.PAYBILL:
      return `PB|${paybillNumber}|${amount}|${accountNumber}`;
    case TRANSACTION_TYPE.AGENT:
      return `WA|${agentNumber}|${amount}|${storeNumber}`;
    default:
      return null;
  }
};
