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
      return `BG|${tillNumber}${data.hideAmount ? `` : `|${amount}`}`;
    case TRANSACTION_TYPE.PAYBILL:
      const paybill = `PB|${paybillNumber}|${amount}|${accountNumber}`;
      return paybill;
    case TRANSACTION_TYPE.AGENT:
      return `WA|${agentNumber}|${amount}|${storeNumber}`;
    default:
      return null;
  }
};
