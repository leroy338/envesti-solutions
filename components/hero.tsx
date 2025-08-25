import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

export interface HeroListItem {
  icon: string;
  text: string;
}

export interface HeroButton {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export type HeroStyle = 
  | "solid-green" 
  | "gradient-horizontal" 
  | "gradient-vertical" 
  | "gradient-vertical-reverse"
  | "background-image"
  | "transparent";

export interface HeroProps {
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right" | "top" | "bottom";
  title?: string;
  subtitle?: string;
  description?: string;
  list?: HeroListItem[];
  button?: HeroButton;
  style?: HeroStyle;
  backgroundImage?: string;
  className?: string;
}

export function Hero({ 
  image, 
  imageAlt, 
  imagePosition = "right", 
  title, 
  subtitle, 
  description, 
  list, 
  button,
  style,
  backgroundImage,
  className 
}: HeroProps) {
  const getBackgroundStyles = () => {
    if (!style) return "";
    
    switch (style) {
      case "solid-green":
        return "bg-green-500 dark:bg-green-600";
      case "gradient-horizontal":
        return "bg-gradient-to-r from-green-500 to-black dark:from-green-600 dark:to-gray-900";
      case "gradient-vertical":
        return "bg-gradient-to-b from-green-500 to-black dark:from-green-600 dark:to-gray-900";
      case "gradient-vertical-reverse":
        return "bg-gradient-to-t from-green-500 to-black dark:from-green-600 dark:to-gray-900";
      case "background-image":
        return backgroundImage ? "relative" : "";
      case "transparent":
        return "bg-transparent";
      default:
        return "";
    }
  };

  const getTextColor = () => {
    if (style === "transparent") {
      return "bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-500 bg-clip-text text-transparent";
    }
    if (style && style !== "background-image") {
      return "text-white dark:text-white";
    }
    return "text-foreground";
  };

  const getSubtitleColor = () => {
    if (style === "transparent") {
      return "text-foreground dark:text-foreground";
    }
    if (style && style !== "background-image") {
      return "text-white/90 dark:text-white/90";
    }
    return "text-muted-foreground";
  };

  const getDescriptionColor = () => {
    if (style === "transparent") {
      return "text-muted-foreground dark:text-muted-foreground";
    }
    if (style && style !== "background-image") {
      return "text-white/80 dark:text-white/80";
    }
    return "text-foreground/80";
  };

  const renderBackgroundImage = () => {
    if (style === "background-image" && backgroundImage) {
      return (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </div>
      );
    }
    return null;
  };

  const renderImage = () => {
    if (!image) return null;
    
    return (
      <div className="flex-shrink-0 relative z-10">
        <Image
          src={image}
          alt={imageAlt || "Hero image"}
          width={400}
          height={400}
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg"
        />
      </div>
    );
  };

  const renderContent = () => (
    <div className="flex flex-col gap-6 sm:gap-8 items-center text-center relative z-10">
      {(title || subtitle) && (
        <div className="space-y-4 sm:space-y-6">
          {title && (
            <h1 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight", getTextColor())}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={cn("text-lg sm:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4", getSubtitleColor())}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {description && (
        <>
          <div className={cn(
            "w-full p-[1px]",
            style && style !== "background-image" 
              ? "bg-white/20 dark:bg-white/20" 
              : "bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
          )} />
          
          <div className="space-y-4 max-w-2xl px-4">
            <p className={cn("text-base sm:text-lg", getDescriptionColor())}>
              {description}
            </p>
          </div>
        </>
      )}
      
      {list && list.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 justify-items-center w-full max-w-4xl mx-auto px-4">
          {list.map((item, index) => (
            <div key={index} className={cn(
              "px-4 sm:px-6 py-3 rounded-lg w-full text-center",
              style && style !== "background-image"
                ? "bg-white/20 dark:bg-white/20 backdrop-blur-sm"
                : "bg-accent"
            )}>
              <p className={cn(
                "text-xs sm:text-sm font-medium",
                style && style !== "background-image" ? "text-white" : "text-foreground"
              )}>
                {item.icon} {item.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {button && (
        <Button
          asChild
          variant={button.variant}
          size={button.size}
          className="mt-8"
        >
          <a href={button.href}>
            {button.text}
          </a>
        </Button>
      )}
    </div>
  );

  const baseClasses = cn(
    "relative overflow-hidden w-full",
    getBackgroundStyles(),
    className
  );

  // Determine layout based on image position
  if (!image) {
    return (
      <div className={cn(baseClasses, "flex flex-col gap-8 sm:gap-12 items-center text-center py-12 sm:py-16 px-4 w-full")}>
        {renderBackgroundImage()}
        {renderContent()}
      </div>
    );
  }

  switch (imagePosition) {
    case "left":
      return (
        <div className={cn(baseClasses, "flex flex-col lg:flex-row gap-8 sm:gap-12 items-center py-12 sm:py-16 px-4 w-full")}>
          {renderBackgroundImage()}
          {renderImage()}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      );
    
    case "right":
      return (
        <div className={cn(baseClasses, "flex flex-col lg:flex-row-reverse gap-8 sm:gap-12 items-center py-12 sm:py-16 px-4 w-full")}>
          {renderBackgroundImage()}
          {renderImage()}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      );
    
    case "top":
      return (
        <div className={cn(baseClasses, "flex flex-col gap-8 sm:gap-12 items-center py-12 sm:py-16 px-4 w-full")}>
          {renderBackgroundImage()}
          {renderImage()}
          {renderContent()}
        </div>
      );
    
    case "bottom":
      return (
        <div className={cn(baseClasses, "flex flex-col gap-8 sm:gap-12 items-center py-12 sm:py-16 px-4 w-full")}>
          {renderBackgroundImage()}
          {renderContent()}
          {renderImage()}
        </div>
      );
    
    default:
      return (
        <div className={cn(baseClasses, "flex flex-col gap-8 sm:gap-12 items-center py-12 sm:py-16 px-4 w-full")}>
          {renderBackgroundImage()}
          {renderContent()}
        </div>
      );
  }
}
