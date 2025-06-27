import { WarningSign } from "./WarningSign";
import { Link } from "../../atoms";

interface ErrorMessageProps {
  errorMessage: string;
  errorDescription: string;
  address: string;
}

export const ErrorMessage = ({ errorMessage, errorDescription, address }: ErrorMessageProps) => (
  <>
    <div className="mt-24 mb-6">
      <WarningSign />
    </div>
    <h3 className="text-2xl">{errorMessage}</h3>
    <p className="text-xl my-8 mx-auto">{errorDescription}</p>
    <Link>
      <a href={address} target="_blank" rel="noreferrer">
        Go to Github
      </a>
    </Link>
  </>
);
