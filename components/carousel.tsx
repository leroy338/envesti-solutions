import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  header: string | React.ReactNode;
  subheader: string;
  images: string[]; // Array of image paths from the directory
  speed?: number; // pixels per second
  className?: string;
  variant?: "default" | "client-logos"; // New variant for client logos
  headerColor?: string; // Custom header color
}

export function Carousel({ 
  header, 
  subheader, 
  images, 
  speed = 50, 
  className,
  variant = "default",
  headerColor
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || images.length === 0) return;

    let position = 0;
    const animate = () => {
      position -= speed / 60; // Convert to per-frame movement
      
      // Reset position when first image is completely out of view
      if (position <= -carousel.scrollWidth / 2) {
        position = 0;
      }
      
      carousel.style.transform = `translateX(${position}px)`;
      animationRef.current = requestAnimationFrame(() => animate());
    };

    animationRef.current = requestAnimationFrame(() => animate());

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, images]);

  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...images, ...images];

  if (variant === "client-logos") {
    return (
      <section className={cn("w-full py-8 px-4", className)}>
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              {typeof header === 'string' ? (
                header.split('Envesti Solutions').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span style={{ color: headerColor || '#10b981' }}>Envesti Solutions</span>
                    )}
                  </span>
                ))
              ) : (
                header
              )}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              {subheader}
            </p>
          </div>

          {/* Client Logos Carousel */}
                  <div className="relative overflow-hidden w-full">
          <div 
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 md:gap-6"
            style={{ width: 'fit-content' }}
          >
              {duplicatedImages.map((imageSrc, index) => (
                                                                    <div 
                  key={index} 
                  className="flex-shrink-0 bg-white rounded-lg p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center border-0"
                  style={{ width: '280px', minWidth: '280px' }}
                >
                  <div className="w-full flex justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                        <img
                          src={imageSrc}
                          alt={`Client logo ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays for Smooth Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>
    );
  }

  // Default carousel variant
  return (
    <section className={cn("w-full py-12 md:py-16 px-4 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            {header}
          </h2>
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              {subheader}
            </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 md:gap-6"
            style={{ width: 'fit-content' }}
          >
            {duplicatedImages.map((imageSrc, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 group relative"
                style={{ width: '280px', minWidth: '280px' }}
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={imageSrc}
                    alt={`Carousel image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
