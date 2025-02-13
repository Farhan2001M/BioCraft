"use client";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BorderBeam } from "../magicui/borderBeam";
import { BioContext } from "@/context/bioContext";
import { CopyToClipboardProps } from "../ui/copyBylukachoUI";
import TypingText from "../animata/typing-text";

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

  const realDataExists = output?.data && output.data.length > 0;

  const [dummyState, setDummyState] = useState({
    dummyIndices: [0, 1, 2, 3 , 4],
    nextDummyIndex: 5,
    updatePosition: 0,
  });

  const timeInterval = 5000;
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
    }, timeInterval); 
    return () => clearInterval(interval);
  }, [loading, realDataExists]);

  return (
    <div className="relative flex flex-col h-full min-h-0 mt-2 rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-slate-800 border-primary/5 ">
      {loading && (
        <BorderBeam
          size={beamSize}
          borderWidth={1.5}
          duration={4}
          className="z-10"
        />
      )}
      <Badge variant="outline" className="absolute top-3 right-3 z-50 border-gray-500">
        Output
      </Badge>

      <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 py-12 xs:p-8 xs:py-12 sm:p-12 lg:p-16">
        {loading ? (
          // Render the loading UI.
          [...Array(4)].map((_, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-slate-600 border-primary/20 rounded-md p-4 relative bg-background rounded-br-none animate-pulse"
            >
              <div className="absolute right-2 top-2 h-6 w-6 rounded-md  bg-neutral-300 dark:bg-neutral-800" />
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
              className="w-full text-sm xs:text-base border border-slate-600 border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              <CopyToClipboardProps text={dataItem.bio} className="right-2 top-2 border border-slate-400 " />
              <div className="text-justify pr-7">{dataItem.bio}</div>
            </li>
          ))
        ) : (
          // Render cycling dummy bios.
          dummyState.dummyIndices.map((dummyIndex, index) => (
            <li
              key={index}
              className="w-full text-sm xs:text-base border border-slate-600 border-primary/20 rounded-md p-4 relative bg-background rounded-br-none"
            >
              <CopyToClipboardProps text={dummyBios[dummyIndex]} className="right-2 top-2 border-slate-400 " />
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


const dummyBios = [
  "Creative coder crafting digital dreams 💻 | Pixel perfectionist & bug squasher 🐞 | Building worlds, one line at a time #CodeLife #Dev",
  "Data explorer turning numbers into stories 📊 | Visualizing trends & solving puzzles 🔍 | Mining insights every day #DataViz #Insights",
  "Social strategist sparking online buzz 🎤 | Crafting creative campaigns & witty posts 📝 | Elevating brands daily #SocialPro #BuzzMaker",
  "Cyber guardian defending digital realms 🔒 | Ethical hacker & risk mitigator 🛡️ | Securing data & systems with vigilance #CyberSafe ",
  "UI/UX designer merging art & code 🎨 | Crafting sleek, user-friendly interfaces 💡 | Inspiring digital journeys daily #Design #UXMagic",
  "Innovative entrepreneur scaling startups 🚀 | Bridging ideas with passion 💼 | Disrupting markets with bold vision #Startup #Inno",
  "Passionate writer weaving worlds with words ✍️ | Crafting tales that spark thought 📚 | Living one story daily #WriteOn #Tale",
  "Digital nomad bridging tech & travel 🌍 | Sharing local vibes & adventure tales ✈️ | Curiosity fuels my journey #Nomad #TravelTech",
  "Gym devotee pushing limits daily 🏋️ | Fusing sweat & grit with vibrant healthy vibes 🍏 | Living strong, every day #FitLife #Health",
  "Melodic soul composing tunes of life 🎶 | Blending rhythm with raw emotion & creative vibes 🎸 | Capturing moments in every chord  #Song",
  "Eco-warrior for a greener planet 🌱 | Living sustainable & renewable energy ⚡ | Innovating a cleaner future #Eco #Green",
  "Gourmet chef blending flavors & cultures 🍲 | Experimenting with recipes that tell a story 🍴 | Serving art on every plate  #Culinary",
  "Photographer freezing moments in time 📷 | Transforming everyday views into art 🎨 | Embracing simple beauty #Photo #Art",
  "Tech reviewer dissecting gadgets & gizmos 🔍 | Unbiased insights & hands-on analysis 🖥️ | Latest tech trends #TechTalk #Review",
  "Mindful mentor guiding growth & self-discovery 🌟 | Empowering with wisdom, balance & positivity 🧘 | Empowered daily #Mindset #Grow",
  "Adventure seeker exploring nature's wonders 🌄 | Climbing peaks & traversing trails 🥾 | Finding magic beyond roads #Adventure #Explore",
  "Animal lover & wildlife advocate 🐾 | Capturing nature's beauty on film 📸 | Protecting our furry friends #Wildlife #SaveNature",
  "Mind and machine enthusiast 🤖 | Exploring AI innovations & digital frontiers 🧠 | Merging tech with human creativity #AI #Innovate",
  "Fashion aficionado curating trends & style 👗 | Mixing classic elegance with modern flair ✨ | Chic redefined #Fashionista #Style",
  "Film buff analyzing frames 🎬 | From indie flicks to blockbuster hits, I spotlight cinematic magic 🌟 | Scenes that move #Cinema #Critique",
  "Travel junkie mapping offbeat routes & hidden gems 🗺️ | Embracing cultures & curious encounters 🌮 | Open heart journeys #Travel #Wander",
  "Sports enthusiast fueling adrenaline in every match ⚽ | Breaking down plays & celebrating wins 🏆 | Game on, always #Sport #Win",
  "Bookworm diving into plots that twist reality 📚 | Exploring worlds of mystery, romance & adventure 🔍 | Every page inspires #Books",
  "Coder at heart, solving problems with code & coffee 💻 | Squashing bugs one line at a time 🐞 | Crafting digital magic #Code #Dev",
  "Startup dreamer turning visions into ventures 🚀 | Navigating entrepreneurship with grit & innovation 💡 | Building future #Startup ",
  "Digital marketer mastering engagement 📈 | Crafting campaigns that convert 🎯 | Driving brands with creative flair #Digital #Ads",
  "Art curator celebrating masterpieces & emerging talents 🖼️ | Curating shows that spark creativity 🎭 | In love with art #ArtCurator ",
  "Podcaster igniting talks that matter 🎙️ | Interviewing diverse voices & sharing untold stories 📡 | Insights on air #Podcast #Talks",
  "Gardener tending vibrant hues 🌸 | Cultivating blooms & lush greens with care 🌿 | Growing beauty daily, X-plot  #Garden #Green",
  "Yoga instructor fusing movement & mindfulness 🧘 | Guiding flows to balance body & soul for peace 🌺 | Stretch & evolve #Yoga #Calm"
];


