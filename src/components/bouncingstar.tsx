"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function BouncingStar() {
  return (
    <Link
      href="https://github.com/Farhan2001M/BioCraft"
      target="_blank"
      className="inline-block"
    >
      <Star
        className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-bounce"
        fill="currentColor"
      />
    </Link>
  );
}
