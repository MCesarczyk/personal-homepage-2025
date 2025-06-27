import { GitHubLogo } from "./GitHubLogo";
import { type Repo } from "./types";
import { ErrorMessage, Tile } from "../../molecules";
import { Spinner } from "../../atoms";

interface GalleryProps {
  title: string;
  subtitle: string;
  status: "loading" | "error" | "success";
  repos: Repo[];
}

export const Gallery = ({ title, subtitle, status, repos }: GalleryProps) => {
  return (
    <div className="flex flex-col items-center mb-24">
      <div className="flex justify-center">
        <div className="w-24 m-3 transition-all duration-500 text-blue-800 dark:text-blue-600 hover:brightness-150 hover:scale-110">
          <GitHubLogo />
        </div>
      </div>
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black m-0">{title}</h2>
      <p className="text-base sm:text-xl mb-4">{subtitle}</p>
      {status === "loading" && <Spinner message="Repositories are loading... " />}
      {status === "error" && (
        <ErrorMessage
          address="lorem.ipsum@mail.co"
          errorDescription="Something bad happened..."
          errorMessage="Ooops..."
        />
      )}
      {status === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {repos.map((repo) => (
            <Tile
              key={repo.id}
              title={repo.name || "n/a"}
              images={repo.images || []}
              description={repo.description || "n/a"}
              links={[
                {
                  id: 1,
                  prefix: "demo",
                  label: repo.codeLink.replace("https://", "") || "n/a",
                  url: repo.codeLink || "n/a",
                },
                {
                  id: 2,
                  prefix: "code",
                  label: repo.demoLink.replace("https://", "") || "n/a",
                  url: repo.demoLink || "n/a",
                },
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
};
