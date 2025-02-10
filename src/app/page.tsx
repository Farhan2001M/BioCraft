import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/magicui/animatedGradientText";
import UserInput from "@/components/home/UserInput";
import OutputScreen from "@/components/home/Output";

export default function Home() {
  return (
    <div className="relative grid grid-cols-2 gap-12 p-24  font-[family-name:var(--font-geist-sans)]">
      <div className="col-span-full group w-full flx flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link
          href="https://github.com/codebucks27/AI-Powered-Twitter-Bio-Generator"
          target="_blank"
          className=""
        >
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Star on Github
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>

        <h1 className="font-extrabold text-2xl md:text-3xl slg:text-4xl lg:text-5xl text-center w-full lg:w-[90%] uppercase mx-auto pt-4">
          CRAFT THE PERFECT TWITTER BIO IN SECONDS!
        </h1>
        <p className=" text-sm sm:text-base  md:text-lg text-red-600 mx-auto text-center w-full lg:w-[90%] pt-2">
          Just answer a few questions, and we&apos;ll generate a bio that captures
          who you are.
        </p>
      </div>

      <UserInput />
      <OutputScreen />

    </div>
  );
}
