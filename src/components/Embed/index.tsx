import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import QrSvg from "@wojtekmaj/react-qr-svg";
import Head from "next/head";
import HomeSEO from "@/components/HomeSEO";
import { useRouter } from "next/router";
import { NumericFormat, PatternFormat } from "react-number-format";

const EmbedUI = () => {
  const [tillNumber, setTillNumber] = useState<string | undefined>("123456");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const generateQr = () => {
    return `BG|${tillNumber}|${amount}`;
  };

  const router = useRouter();

  const { till, amt, text } = router.query;

  useEffect(() => {
    if (
      typeof till === "string" &&
      !isNaN(parseInt(till as string)) &&
      isFinite(parseInt(till as string))
    ) {
      setTillNumber(till as string);
    }
    if (
      typeof amt === "string" &&
      !isNaN(parseInt(amt as string)) &&
      isFinite(parseInt(amt as string))
    ) {
      setAmount(parseInt(amt));
    }
  }, [amt, till]);

  return (
    <>
      <Head>
        <title>PesaQR | Generate Payment QR Codes</title>
      </Head>
      <HomeSEO />

      <main className="flex flex-col justify-center h-screen items-center bg-green-600 w-full">

        <div className="px-6 md:px-0 md:w-2/5 w-full  flex flex-col space-y-2 justify-center items-center">

          <div className="text-center text-white  rounded-xl font-display text-5xl md:text-5xl">
            TILL NUMBER
          </div>
          <div className="w-full bg-white flex border-4 border-green-700 py-2 space-x-2 px-2 items-center rounded-xl">
            {tillNumber && tillNumber.split('').map((character, idx) => (
              <div key={idx} className="bg-white  font-extrabold font-display
                rounded-md border-2 flex-1 border-green-700 text-black items-center text-4xl md:text-3xl justify-center text-center flex">{character}</div>
            ))}
          </div>
          <div className="text-center text-white  rounded-xl font-display text-5xl md:text-5xl">
            AMOUNT
          </div>
          <NumericFormat
            inputMode="numeric"
            value={amount ?? "0"}
            thousandSeparator=","
            prefix="KES "
            displayType="text"
            allowNegative={false}
            placeholder="Enter Amount to Pay"
            className="font-display w-full bg-white py-2 md:py-2  text-black text-4xl md:text-3xl text-center rounded-xl shadow-md border-4 border-green-700"
          />
          <div className="py-2 bg-white w-full flex items-center rounded-xl shadow-md h-4/5 px-2 md:px-0 md:h-2/5 justify-center border-4 border-green-700">
            <QrSvg value={generateQr()} className="w-full h-full bg-white rounded-xl" />
          </div>
          <p className=" text-white font-display text-5xl md:text-7xl">
            {text ?? "SCAN ME"}
          </p>
        </div>


      </main>
    </>
  );
};

export default EmbedUI;
