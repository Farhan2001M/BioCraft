import UserInput from "@/components/home/UserInput";
import OutputScreen from "@/components/home/Output";
import { BioProvider } from "@/context/bioContext";
import { TextEffect } from "@/components/ui/text-effect";
import BouncingStar from "@/components/bouncingstar";
import ColourfulText from "@/components/ui/colourful-text";

export default function Home() {
  return (
    <div className="relative max-w-screen-2xl mx-auto p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute  right-6 top-8  sm:top-14   md:top-6 md:right-6">
        <BouncingStar />
      </div>
      <div className="absolute  left-6 top-8  sm:top-14   md:top-6 md:left-6">
        <BouncingStar />
      </div>
      {/* Header Section */}
      <header className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
            <ColourfulText text="BioCraft" />
          </h1>
          <img 
            src="/icons/iconfoxit.png" 
            alt="BioCraft Logo" 
            className="w-8 h-8 md:w-14 md:h-14 lg:w-20 lg:h-20"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center">
          <h1 className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-5xl uppercase w-full lg:w-[90%] mx-auto mt-4">
            <TextEffect per="char" preset="fade">
              STAND OUT WITH A BIO THAT SHINES!
            </TextEffect>
          </h1>
        </div>
      </header>

      {/* Main Content Section */}
      <BioProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[50vh] items-stretch">
          <div className="flex flex-col h-full">
            <UserInput />
          </div>
          <div className="flex flex-col h-full">
            <OutputScreen />
          </div>
        </div>
      </BioProvider>


    </div>
  );
}




        