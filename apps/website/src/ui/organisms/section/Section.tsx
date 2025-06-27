import { ListStyleCircle } from "./ListStyleCircle";

interface SectionProps {
  title: string;
  elements: string[];
}

export const Section = ({ title, elements }: SectionProps) => (
  <section className="p-4 md:p-8 pl-4 md:pl-6 lg:pl-8 my-8 mx-auto rounded bg-white dark:bg-gray-800 border-4 border-gray-500 border-opacity-10 dark:border-opacity-10 shadow-lg shadow-gray-900 transition-all ease-in duration-300 hover:shadow-blue-500">
    <h2 className="text-xl sm:text2xl md:text-3xl font-black m-0 mb-4">{title}</h2>
    <ul className="text-lg sm:text-2xl md:text-3xl font-black m-0 grid grid-cols-1 sm:grid-cols-2">
      {elements.map((element) => (
        <li className="mb-2 text-lg font-normal flex" key={element}>
          <div className="w-1 mr-2 sm:w-[6px] md:w-2 md:mr-3 lg:w-[10px] lg:mr-4 flex items-center text-blue-800 dark:text-blue-600">
            <ListStyleCircle />
          </div>
          {element}
        </li>
      ))}
    </ul>
  </section>
);
