import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/magicui/animatedGradientText";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
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
      </div>
    </div>
  );
}
