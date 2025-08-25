"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

interface HomeHeaderProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  button?: {
    text: string;
    variant?: ButtonProps["variant"];
    href: string;
  };
}

export function HomeHeader({ 
  backgroundImage, 
  title, 
  subtitle, 
  button 
}: HomeHeaderProps) {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Header Background"
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {title.split('Envesti Solutions').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="text-green-400">Envesti Solutions</span>
                  )}
                </span>
              ))}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            {/* Optional Button */}
            {button && (
              <Button 
                asChild 
                variant={button.variant || "default"}
                size="lg"
                className="text-lg px-8 py-3"
              >
                <Link href={button.href}>
                  {button.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
