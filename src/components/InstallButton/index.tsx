import useDeviceDetect from "@/hooks/useDeviceDetect";
import { MdOutlineInstallMobile } from "react-icons/md";
import { FaApple } from "react-icons/fa";
import { SiWindows } from "react-icons/si";
import { FaLinux } from "react-icons/fa";

interface InstallButtonProps {
  handleInstall: () => void;
}
const InstallButton = ({ handleInstall }: InstallButtonProps) => {
  const deviceType = useDeviceDetect();

  return (
    <div className="relative group w-fit">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <button
        onClick={handleInstall}
        type="button"
        className="w-full flex items-center space-x-2 text-xs md:text-sm text-center border relative p-2.5 text-white rounded-md  bg-gray-900  leading-none font-semibold "
      >
        <span>Install on {deviceType}</span>
        {deviceType && deviceType === "Mac" && <FaApple />}
        {deviceType && deviceType === "Windows" && <SiWindows />}
        {deviceType && deviceType === "Linux" && <FaLinux />}
        {deviceType && deviceType === "Mobile" && <MdOutlineInstallMobile />}
      </button>
    </div>
  );
};

export default InstallButton;
