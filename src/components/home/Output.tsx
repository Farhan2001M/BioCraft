"use client";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BorderBeam } from "../magicui/borderBeam";
import { BioContext } from "@/context/bioContext";
import { CopyToClipboardProps } from "../ui/copyBylukachoUI";

const Output = () => {
  const { output, loading } = useContext(BioContext);
  const [beamSize, setBeamSize] = useState(1200);

  useEffect(() => {
    const updateBeamSize = () => {
      if (window.innerWidth < 768) {
        setBeamSize(200);
      } else {
        setBeamSize(1200);
      }
    };
    updateBeamSize();
    window.addEventListener("resize", updateBeamSize);
    return () => window.removeEventListener("resize", updateBeamSize);
  }, []);

  return (
    <div className="relative flex md:min-h-[50vh] md:h-full min-h-0 mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5">
      {loading && (
        <BorderBeam
          size={beamSize}
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
          {output?.data.map((data, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              <CopyToClipboardProps text={data.bio} className="right-2 top-2" />
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
