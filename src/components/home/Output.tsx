"use client";
import React, { useContext, useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { BorderBeam } from "../magicui/borderBeam";
import { BioContext } from "@/context/bioContext";
import { CopyToClipboardProps } from "../ui/copyBylukachoUI";

// Array of dummy bios with different styles
const dummyBios = [
  { bio: "Digital creator exploring the intersection of tech and art 🎨 | Coffee enthusiast ☕ | Building the future one pixel at a time" },
  { bio: "Full-time dreamer | Part-time doer | Documenting my journey in tech 💻 | Always learning, always growing 🌱" },
  { bio: "Marketing maven by day | Meme curator by night | Turning caffeine into content since 2020 ☕➡️💡" },
  { bio: "Web3 explorer 🌐 | Blockchain believer 🔗 | Here to share my crypto journey | Not financial advice!" },
  { bio: "UI/UX designer making the digital world prettier 🖌️ | Minimalism advocate | Love-hate relationship with Figma" },
  { bio: "AI enthusiast 🤖 | Writing about machine learning ethics | Building intelligent solutions for a better tomorrow" },
  { bio: "Travel blogger ✈️ | Collecting memories, not things | Currently in: [location] | Next stop: everywhere" },
  { bio: "Fitness coach 💪 | Nutrition nerd 🥑 | Helping you build sustainable habits | Progress > perfection" },
  { bio: "Startup founder 🚀 | Solving problems you didn't know you had | Funding round: always open 💰" },
  { bio: "Professional overthinker | Amateur photographer 📸 | Capturing moments between the chaos | Canon > Nikon" }
];

const Output = () => {
  const { output, loading } = useContext(BioContext);
  const [currentDummies, setCurrentDummies] = useState(dummyBios.slice(0, 4));
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (!output?.data.length && !hasGenerated) {
      const interval = setInterval(() => {
        // Rotate dummy bios every 10 seconds
        const shuffled = [...dummyBios].sort(() => 0.5 - Math.random());
        setCurrentDummies(shuffled.slice(0, 4));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [output?.data.length, hasGenerated]);

  useEffect(() => {
    if (output?.data.length) {
      setHasGenerated(true);
    }
  }, [output?.data]);

  const displayData = output?.data.length ? output.data : currentDummies;

  return (
    <div className="relative flex min-h-[50vh] mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5">
      {loading && (
        <BorderBeam
          size={1200}
          borderWidth={1.5}
          duration={4}
          className="z-10"
        />
      )}
      <Badge variant="outline" className="absolute top-3 right-3 z-50">
        Output
      </Badge>

      {loading ? (
        <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
          {[...Array(4)].map((_, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none animate-pulse"
            >
              <div className="absolute right-2 top-2 h-6 w-6 rounded-md bg-neutral-300 dark:bg-neutral-800" />
              <div className="pr-7 space-y-2">
                <div className="w-full h-4 bg-neutral-300 dark:bg-neutral-800 rounded" />
                <div className="w-2/3 h-4 bg-neutral-300 dark:bg-neutral-800 rounded" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
          {displayData.map((data, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              {output?.data.length > 0 && (
                <CopyToClipboardProps text={data.bio} className="right-2 top-2" />
              )}
              <div className="text-justify pr-7">
                {data.bio}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Output;