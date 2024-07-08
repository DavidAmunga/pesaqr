import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Image from "next/image";
// import FeedbackDialog from "../FeedbackDialog";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineInstallMobile } from "react-icons/md";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  useEffect(() => {
    if (router.pathname) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [router.pathname]);

  const [openFeedback, setOpenFeedback] = useState(false);

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
      <div className="py-4 md:w-full max-w-6xl mx-auto flex md:items-center  w-full px-3 md:px-0  justify-between">
        {/* Logo */}
        <Link href="/" className="cursor-pointer flex items-center space-x-2">
          <img src="/logo.svg" className="size-20" />
          <div className="font-display font-bold text-md md:text-2xl -mt-2 text-white">
            PESAQR.COM
          </div>
        </Link>
        <div className="flex space-x-6 items-center md:hidden">
          {showInstallBtn && (
            <InstallButton handleInstall={handleInstallClick} />
          )}
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            <FiRefreshCw
              size={30}
              className="text-white cursor-pointer rounded-full p-0.5 hover:opacity-50"
            />
          </button>

          <button
            name="open-menu"
            aria-label="open-menu"
            aria-labelledby="open-menu"
            title="open-menu"
            className="text-white hover:text-white focus:text-gray-300 focus:outline-none"
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden  md:flex items-center space-x-2">
          {showInstallBtn && (
            <InstallButton handleInstall={handleInstallClick} />
          )}
          <Link
            target="_blank"
            href="https://twitter.com/davidamunga_"
            className="text-white  border border-black  hover:border-white p-2  rounded-md font-semibold"
          >
            Built by a Human
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="fixed inset-0 z-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 flex h-screen w-full flex-col space-y-2 overflow-y-auto bg-black px-3 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Normal Container */}
          {/* Nav Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="cursor-pointer flex items-center space-x-2"
            >
              <div className="font-display font-bold text-md md:text-2xl -mt-2 text-white">
                CUCOPY
              </div>
            </Link>

            <button
              type="button"
              className="cursor-pointer rounded-full p-3 hover:bg-gray-900"
              onClick={() => {
                setOpen(false);
              }}
            >
              <XMarkIcon className="text-white w-5 h-5" />
            </button>
          </div>

          {/* Main Menu Items */}
          <div className="flex w-full flex-col  space-y-2 py-2">
            <Link
              target="_blank"
              href="https://twitter.com/davidamunga_"
              className="text-white  hover:bg-gray-900 p-2  rounded-md font-semibold"
            >
              Built by a Human
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* <FeedbackDialog
        open={openFeedback}
        handleClose={() => {
          setOpenFeedback(false);
        }}
      /> */}
    </>
  );
};

interface InstallButtonProps {
  handleInstall: () => void;
}
const InstallButton = ({ handleInstall }: InstallButtonProps) => {
  return (
    <div className="relative group w-fit">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button
        onClick={handleInstall}
        type="button"
        className="w-full flex items-center space-x-2 text-center border relative p-2.5 text-white rounded-md  bg-black  leading-none font-semibold "
      >
        <MdOutlineInstallMobile size={20} />

        <span>Install App</span>
      </button>
    </div>
  );
};

export default Header;
