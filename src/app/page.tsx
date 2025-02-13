import UserInput from "@/components/home/UserInput";
import OutputScreen from "@/components/home/Output";
import { BioProvider } from "@/context/bioContext";
import { TextEffect } from "@/components/ui/text-effect";
import BouncingStar from "@/components/bouncingstar";

export default function Home() {
  return (
    <div className="relative max-w-screen-2xl mx-auto p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute  right-6 top-24  sm:top-14   md:top-6 md:right-6">
        <BouncingStar />
      </div>
      {/* Header Section */}
      <header className="mb-6">
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center">
          <h1 className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-5xl uppercase w-full lg:w-[90%] mx-auto mt-4">
            <TextEffect per="char" preset="fade">
              STAND OUT WITH A BIO THAT SHINES!
            </TextEffect>
          </h1>
          <p className="text-xs sm:text-sm md:text-sm text-red-600 w-full lg:w-[70%] mx-auto px-8">
            Just answer a few questions, and we&apos;ll generate a bio that captures who you are.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <BioProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div className="flex flex-col md:min-h-[50vh] md:h-full">
            <UserInput />
          </div>
          <div className="flex flex-col md:min-h-[50vh] md:h-full">
            <OutputScreen />
          </div>
        </div>
      </BioProvider>
    </div>
  );
}




        