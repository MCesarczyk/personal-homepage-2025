import { type FooterThumbnail } from "../../organisms/footer/types";
import { DownloadButton } from "../../molecules";
import { Caption, Thumbnail } from "../../atoms";
import { ArrowUpIcon } from "../../../assets";

interface FooterProps {
  address: string;
  cvFileLocation: string;
  cvFileName: string;
  footerThumbnails: FooterThumbnail[];
}

export const Footer = ({ address, cvFileLocation, cvFileName, footerThumbnails }: FooterProps) => (
  <div className="w-full">
    <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">
      <Caption>CONTACT:</Caption>
      <a
        className="my-3 mx-0 sm:my-4 md:my-5 lg:my-6 block font-black text-gray-900 dark:text-white transition-all duration-300 hover:text-blue-700"
        id="contact"
        href={`mailto:${address}`}
      >
        {address}
      </a>
    </div>
    <div className="flex flex-col md:flex-row items-center">
      <div className="m-6 w-full md:w-auto shrink-0">
        <DownloadButton fileLocation={cvFileLocation} fileName={cvFileName} buttonText="Download CV" />
      </div>
      <div className="flex w-full">
        {footerThumbnails.map((thumbnail) => (
          <Thumbnail key={thumbnail.id} {...thumbnail} />
        ))}
        <div className="ml-auto">
          <Thumbnail id={999} icon={ArrowUpIcon} url="#home" local />
        </div>
      </div>
    </div>
  </div>
);
