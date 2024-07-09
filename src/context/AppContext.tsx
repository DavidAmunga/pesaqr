import { FormData } from "@/@types/Data";
import { TRANSACTION_TYPE } from "@/@types/TransactionType";
import useLocalStorage from "@/hooks/useLocalStorage";
import { PESAQR_DB } from "@/utils/constants";
import { createContext, useEffect, useState } from "react";
import colors from "tailwindcss/colors";
export interface AppContextType {
  data: FormData;
  setData: (data: FormData) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode[] }) => {
  const [data, setData] = useState<FormData>({
    bannerText: "SCAN WITH M-PESA",
    color: colors.green[600],
  });
  const [db, saveDb, clearDb] = useLocalStorage<FormData>(PESAQR_DB, {
    type: TRANSACTION_TYPE.TILL_NUMBER,
    color: colors.green[600],
  });

  // Load Data from DB
  useEffect(() => {
    setData({ ...db!, amount: undefined });
    // eslint-disable-next-line
  }, []);

  // Save Updated Data
  useEffect(() => {
    if (data) {
      saveDb(data);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
