import { useContext, useEffect, useState } from "react";
import QrSvg from "@wojtekmaj/react-qr-svg";
import Head from "next/head";
import HomeSEO from "@/components/HomeSEO";
import Link from "next/link";
import { useRouter } from "next/router";
import { generateQRCode } from "@/utils/helpers";
import { AppContext, AppContextType } from "@/context/AppContext";
import InstallButton from "../InstallButton";
import NumPad from "../NumPad";
import PaymentDetails from "../PaymentDetails";
import { FaGithub } from "react-icons/fa";
import { Input } from "../ui/input";
import { ColorPicker } from "../ColorPicker";

const HomeUI = () => {
  const { data, setData } = useContext(AppContext) as AppContextType;

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later.
      setDeferredPrompt(e as any);
      setShowInstallBtn(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  const handleInstallClick = () => {
    // Hide the install button
    setShowInstallBtn(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <>
      <Head>
        <title>PesaQR | Generate Payment QR Codes</title>
      </Head>
      <HomeSEO />

      <div className="flex flex-col h-screen">
        <main className="flex-1 w-full bg-gray-900 ">
          <div className="px-4 md:px-0 mx-auto bg-gray-900 h-full text-white grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex justify-content  md:h-full w-11/12 mx-auto self-center pt-4 flex-col space-y-3">
              <div className="select-none  w-full flex items-center justify-between">
                <Link
                  href="/"
                  className="cursor-pointer flex w-fit justify-center md:justify-start  md:h-fit items-center space-x-2"
                >
                  <img src="/logo.svg" className="size-12 md:size-13" />
                  <div className="flex flex-col space-y-1">
                    <div className="font-display font-bold  text-3xl md:text-5xl items-center flex text-white">
                      <span>PESAQR.COM</span>{" "}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center space-x-2 justify-end">
                  <ColorPicker />
                  <Link
                    href="https://github.com/DavidAmunga/pesaqr"
                    target="_blank"
                    className="text-white"
                  >
                    <FaGithub size={20} />
                  </Link>

                  {showInstallBtn && (
                    <InstallButton handleInstall={handleInstallClick} />
                  )}
                </div>
              </div>

              {/* Form */}
              <PaymentDetails />
              <NumPad />
            </div>
            <div
              style={{ background: data.color }}
              className={`relative  h-full flex flex-col justify-start md:justify-center items-center`}
            >
              <div className="flex flex-col space-y-5 md:space-y-4 items-center w-4/5">
                <div className="py-4 flex items-center select-none w-4/5 bg-black border-2 border-gray-800 px-4 rounded-md shadow-inner text-center text-white font-display  md:text-4xl">
                  <div className="border-2 border-gray-700 size-4 rounded-full bg-white"></div>
                  <Input
                    onChange={(e) => {
                      setData({ ...data, bannerText: e.target.value });
                    }}
                    value={
                      data.bannerText && data.bannerText.length > 0
                        ? data.bannerText
                        : "SCAN WITH M-PESA"
                    }
                    placeholder="Enter Banner Text"
                    className="flex-1 px-0 rounded-none  tracking-widest mx-auto w-full border-none  text-center bg-transparent text-white font-display text-xl md:text-4xl "
                  />
                  <div className="border-2 border-gray-700 size-4 rounded-full bg-white"></div>
                </div>
                <div className="w-full justify-center  flex items-center flex-col rounded-lg">
                  <QrSvg
                    value={generateQRCode(data) ?? ""}
                    className="p-8 border-[12px] border-black  md:w-5/6 bg-white rounded-md"
                  />
                </div>
                {/* TODO: Add this later */}
                {/* <div className="flex w-4/5 justify-center items-center space-x-4 ">
                  <Button
                    type="button"
                    className="bg-gray-900 w-full flex space-x-2 items-center text-xl md:text-3xl py-7 hover:bg-gray-700"
                  >
                    <span>Download</span>
                    <HiOutlineDocumentDownload />
                  </Button>
                  <Button
                    type="button"
                    className="bg-blue-600  w-full flex space-x-2 items-center  text-xl md:text-3xl py-7 hover:bg-blue-500 "
                  >
                    <span>Share</span>
                    <HiOutlineShare />
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center py-4 font-display text-white">
          Built in 🇰🇪 by
          <Link
            href="https://twitter.com/davidamunga_"
            target="_blank"
            className="font-bold underline w-full text-center font-display ml-1"
          >
            David Amunga
          </Link>
        </footer>
      </div>
    </>
  );
};

export default HomeUI;
