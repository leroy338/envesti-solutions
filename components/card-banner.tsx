import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardItem {
  image: string;
  imageCaption?: string;
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
  };
}

interface CardBannerProps {
  header: string;
  subheader: string;
  cards: CardItem[];
  className?: string;
}

export function CardBanner({ header, subheader, cards, className }: CardBannerProps) {
  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {header}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subheader.split('Envesti Solutions').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="text-green-500 font-semibold">Envesti Solutions</span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {card.imageCaption && (
                  <p className="text-sm text-muted-foreground italic text-center mb-2">
                    {card.imageCaption}
                  </p>
                )}
                <CardTitle className="text-xl font-semibold text-foreground">
                  {card.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </CardDescription>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button
                  variant={card.cta.variant || "default"}
                  size={card.cta.size || "default"}
                  className="w-full"
                  asChild
                >
                  <a href={card.cta.href}>
                    {card.cta.text}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
