
import UserInput from "@/components/home/UserInput";
import OutputScreen from "@/components/home/Output";
import { BioProvider } from "@/context/bioContext";
import { TextEffect } from "@/components/ui/text-effect";

export default function Home() {
  return (
    <div className="relative grid grid-cols-2 gap-4 font-[family-name:var(--font-geist-sans)] max-w-screen-2xl mx-auto">
      <div className="col-span-full group w-full flx flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <h1 className="font-extrabold text-xl md:text-2xl lg:text-4xl text-center w-full lg:w-[90%] uppercase mx-auto ">
          <TextEffect per="char" preset="fade">
            STAND OUT WITH A BIO THAT SHINES!
          </TextEffect>
        </h1>
        <p className="text-sm sm:text-base  md:text-lg text-red-600 mx-auto text-center w-full lg:w-[90%] pt-0 mt-0">
          Just answer a few questions, and we&apos;ll generate a bio that captures
          who you are.
        </p>
      </div>
      <BioProvider>
        <UserInput />
        <OutputScreen />
      </BioProvider>
    </div>
  );
}


// import { ChevronRight, Star } from "lucide-react";
// import Link from "next/link";


        // <Link
        //   href="https://github.com/codebucks27/AI-Powered-Twitter-Bio-Generator"
        //   target="_blank"
        //   className=""
        // >
        //   <AnimatedGradientText className="px-6 py-2 rounded-full">
        //     <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />
        //     <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
        //     Star on Github
        //     <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        //   </AnimatedGradientText>
        // </Link>