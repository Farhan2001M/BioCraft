"use client";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BorderBeam } from "../magicui/borderBeam";
import { BioContext } from "@/context/bioContext";
import { CopyToClipboardProps } from "../ui/copyBylukachoUI";
import TypingText from "../animata/typing-text";
// All your dummy bios; add more as needed.
const dummyBios = [
  "Code wizard by day, storyteller by night ✨ | Breaking software, fixing bugs & crafting digital magic | Fueled by caffeine & curiosity ☕",
  "Data scientist 🧠 | Turning raw data into real insights 📊 | AI & ML enthusiast 🤖 | Learning, innovating & always questioning everything",
  "Social media strategist 📢 | Helping brands shine online | Content creator, meme lover & coffee addict ☕ | Engaging, growing, winning",
  "Cybersecurity geek 🔒 | Ethical hacker by profession | Protecting data & fighting cyber threats | Tech lover & puzzle solver",
  "Game developer 🎮 | Building virtual worlds one pixel at a time | Passionate about design, storytelling & immersive gaming experiences",
  "Startup founder 🚀 | Creating solutions for modern problems | Always learning, growing & hustling | Building the future, one idea at a time",
  // ... add more dummy bios as desired.
];

const Output = () => {
  const { output, loading } = useContext(BioContext);
  const [beamSize, setBeamSize] = useState(1200);

  // Adjust the border-beam size on window resize.
  useEffect(() => {
    const updateBeamSize = () => {
      setBeamSize(window.innerWidth < 768 ? 200 : 1200);
    };
    updateBeamSize();
    window.addEventListener("resize", updateBeamSize);
    return () => window.removeEventListener("resize", updateBeamSize);
  }, []);

  // Check if real bio data is available.
  const realDataExists = output?.data && output.data.length > 0;

  /**
   * dummyState holds:
   * - dummyIndices: an array of 4 indices into dummyBios that are currently visible.
   * - nextDummyIndex: the index of the next dummy bio to show.
   * - updatePosition: which of the 4 positions should update next.
   *
   * Initially we show dummyBios[0..3] and nextDummyIndex is 4.
   */
  const [dummyState, setDummyState] = useState({
    dummyIndices: [0, 1, 2, 3],
    nextDummyIndex: 4,
    updatePosition: 0,
  });

  /**
   * Cycle dummy bios only when loading is false and real data isn’t available.
   * Every 3 seconds one of the 4 dummy bios is replaced by the next one.
   */
  useEffect(() => {
    if (loading || realDataExists) return;
    const interval = setInterval(() => {
      setDummyState((prev) => {
        const newDummyIndices = [...prev.dummyIndices];
        newDummyIndices[prev.updatePosition] = prev.nextDummyIndex % dummyBios.length;
        return {
          dummyIndices: newDummyIndices,
          nextDummyIndex: (prev.nextDummyIndex + 1) % dummyBios.length,
          updatePosition: (prev.updatePosition + 1) % 4,
        };
      });
    }, 5000); // Change 3000 to 2000 if you prefer a 2-second interval.
    return () => clearInterval(interval);
  }, [loading, realDataExists]);

  return (
    <div className="relative flex flex-col h-full min-h-0 mt-2 rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5 max-h-[670px]">
      {loading && (
        <BorderBeam
          size={beamSize}
          borderWidth={1.5}
          duration={4}
          className="z-10"
        />
      )}
      <Badge variant="outline" className="absolute top-3 right-3 z-50">
        
        <TypingText
          repeat={false}
          text="Output"
        />
      </Badge>

      <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
        {loading ? (
          // Render the loading UI.
          [...Array(4)].map((_, index) => (
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
          ))
        ) : realDataExists ? (
          // Render real bios when they are available.
          output.data.map((dataItem, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              <CopyToClipboardProps text={dataItem.bio} className="right-2 top-2" />
              <div className="text-justify pr-7">{dataItem.bio}</div>
            </li>
          ))
        ) : (
          // Render cycling dummy bios.
          dummyState.dummyIndices.map((dummyIndex, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              <CopyToClipboardProps text={dummyBios[dummyIndex]} className="right-2 top-2" />
              <div className="text-justify pr-7">
                <TypingText
                  repeat={false}
                  text={dummyBios[dummyIndex]}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Output;



// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { Badge } from "../ui/badge";
// import { BorderBeam } from "../magicui/borderBeam";
// import { BioContext } from "@/context/bioContext";
// import { CopyToClipboardProps } from "../ui/copyBylukachoUI";

// const Output = () => {
//   const { output, loading } = useContext(BioContext);
//   const [beamSize, setBeamSize] = useState(1200);

//   useEffect(() => {
//     const updateBeamSize = () => {
//       if (window.innerWidth < 768) {
//         setBeamSize(200);
//       } else {
//         setBeamSize(1200);
//       }
//     };
//     updateBeamSize();
//     window.addEventListener("resize", updateBeamSize);
//     return () => window.removeEventListener("resize", updateBeamSize);
//   }, []);

//   return (
//     <div className="relative flex flex-col h-full min-h-0 mt-2 rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5 max-h-[670px]">
//       {loading && (
//         <BorderBeam
//           size={beamSize}
//           borderWidth={1.5}
//           duration={4}
//           className="z-10"
//         />
//       )}
//       <Badge variant="outline" className="absolute top-3 right-3 z-50">
//         Output
//       </Badge>
      
//       {loading ? (
//         <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
//           {[...Array(4)].map((_, index) => (
//             <li
//               key={index}
//               className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none animate-pulse"
//             >
//               <div className="absolute right-2 top-2 h-6 w-6 rounded-md bg-neutral-300 dark:bg-neutral-800" />
//               <div className="pr-7 space-y-2">
//                 <div className="w-full h-4 bg-neutral-300 dark:bg-neutral-800 rounded" />
//                 <div className="w-2/3 h-4 bg-neutral-300 dark:bg-neutral-800 rounded" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
//           {output?.data.map((data, index) => (
//             <li
//               key={index}
//               className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
//             >
//               <CopyToClipboardProps text={data.bio} className="right-2 top-2" />
//               <div className="text-justify pr-7">
//                 {data.bio}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Output;
