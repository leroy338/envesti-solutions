import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export interface HighlightItem {
  text: string;
  description?: string;
  detailedDescription: string;
  image: string;
  imageAlt?: string;
  button: {
    text: string;
    href: string;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
  };
}

export interface HighlightCardProps {
  header: string;
  subheader: string;
  highlights: HighlightItem[];
  className?: string;
}

export function HighlightCard({ header, subheader, highlights, className }: HighlightCardProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem>(highlights[0]);

  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section - Mobile First */}
        <div className="text-center mb-12 lg:hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {header}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subheader}
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
          {/* Left Column - Highlights List */}
          <div className="space-y-6">
            {/* Desktop Header */}
            <div className="space-y-4">
                          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-foreground leading-tight">
              {header}
            </h2>
            <p className="text-lg xl:text-xl text-muted-foreground leading-relaxed">
              {subheader}
            </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHighlight(highlight)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-200 hover:bg-accent/50",
                    selectedHighlight === highlight 
                      ? "bg-accent border-l-4 border-l-green-500" 
                      : "hover:border-l-4 hover:border-l-green-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className={cn(
                      "w-6 h-6 mt-0.5 flex-shrink-0",
                      selectedHighlight === highlight ? "text-green-500" : "text-muted-foreground"
                    )} />
                    <div>
                      <p className={cn(
                        "font-semibold",
                        selectedHighlight === highlight ? "text-foreground" : "text-foreground"
                      )}>
                        {highlight.text}
                      </p>
                      {highlight.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {highlight.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Dynamic Card */}
          <div className="sticky top-8 max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0">
            <Card className="overflow-hidden shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={selectedHighlight.image}
                  alt={selectedHighlight.imageAlt || selectedHighlight.text}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {selectedHighlight.text}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {selectedHighlight.detailedDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button
                  variant={selectedHighlight.button.variant || "default"}
                  size={selectedHighlight.button.size || "default"}
                  className="w-full"
                  asChild
                >
                  <a href={selectedHighlight.button.href}>
                    {selectedHighlight.button.text}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Highlights Selection */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">
              Select a Highlight
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((highlight, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHighlight(highlight)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all duration-200",
                    selectedHighlight === highlight 
                      ? "bg-accent border-green-500" 
                      : "border-border hover:border-green-300 hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className={cn(
                      "w-6 h-6 mt-0.5 flex-shrink-0",
                      selectedHighlight === highlight ? "text-green-500" : "text-muted-foreground"
                    )} />
                    <div>
                      <p className={cn(
                        "font-semibold",
                        selectedHighlight === highlight ? "text-foreground" : "text-foreground"
                      )}>
                        {highlight.text}
                      </p>
                      {highlight.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {highlight.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Card */}
          <Card className="overflow-hidden shadow-lg">
            <div className="aspect-video overflow-hidden">
              <Image
                src={selectedHighlight.image}
                alt={selectedHighlight.imageAlt || selectedHighlight.text}
                width={400}
                height={225}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                {selectedHighlight.text}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                {selectedHighlight.detailedDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-0">
              <Button
                variant={selectedHighlight.button.variant || "default"}
                size={selectedHighlight.button.size || "default"}
                className="w-full"
                asChild
              >
                <a href={selectedHighlight.button.href}>
                  {selectedHighlight.button.text}
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
