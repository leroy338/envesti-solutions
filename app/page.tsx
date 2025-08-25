"use client";

import { HomeHeader } from "@/components/home-header";
import { NavMenu } from "./(marketing)/components/nav-menu";
import { Footer } from "./(marketing)/components/footer";
import { CardBanner } from "@/components/card-banner";
import { HighlightCard } from "@/components/highlight-card";
import { Carousel } from "@/components/carousel";
import { Hero } from "@/components/hero";

export default function Home() {
  const sampleCards = [
    {
      image: "/images/in-person.jpg",
      title: "In Person Training",
      description: "Comprehensive training programs designed to enhance skills and advance careers in your organization.",
      cta: {
        text: "Explore Programs",
        href: "/programs",
        variant: "gradient-horizontal" as const,
      }
    },
    {
      image: "/images/online-training.jpg",
      title: "Online Training Hosting",
      description: "Streamlined onboarding processes that ensure new hires are productive from day one.",
      cta: {
        text: "Learn More",
        href: "/onboarding",
        variant: "gradient-horizontal" as const,
      }
    },
    {
      image: "/images/instruction-design.jpg",
      title: "Instruction Design",
      description: "Custom training solutions tailored to your industry and organizational needs.",
      cta: {
        text: "Get Started",
        href: "/solutions",
        variant: "gradient-horizontal" as const,
      }
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      <HomeHeader
        backgroundImage="/images/headerBackground.png"
        title="Elevate Onboarding & Professional Development with Envesti Solutions"
        subtitle="Create an engaging training environment for your learners."
        button={{
          text: "Learn More",
          variant: "secondary",
          href: "/"
        }}
      />
      <div className="flex-1 w-full flex flex-col gap-16 sm:gap-20 items-center">
        <div className="flex-1 flex flex-col gap-16 sm:gap-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <CardBanner
            header="Our Core Services"
            subheader="Envesti Solutions provides an entire suite of services to help organizations maintain compliance with state and federal regulations and provide training to their employees."
            cards={sampleCards}
          />
          <Hero
          style="gradient-horizontal"
          title="Who We Are"
          description="Envesti Solutions is an all-in-one training solution for organizations of all sizes. We provide in person and online training to maintain compliance standards for many different industries. Some of the industries we support include:"
          list={[
            {
              icon: "💡",
              text: "Foster Care Agencies"
            },
            {
              icon: "💡",
              text: "College and University"
            },
            {
              icon: "💡",
              text: "Non-Profits"
            },
            {
              icon: "💡",
              text: "Healthcare"
            },
            {
              icon: "💡",
              text: "Group Homes"
            },
            {
              icon: "💡",
              text: "Legal Services"
            },
          ]}
          button={{
            text: "Learn More",
            href: "/about",
            variant: "gradient-horizontal"
          }}
          image="/images/lightbulb.jpg"
          imageAlt="Lightbulb"
          imagePosition="right"
          />
          <Carousel
              header={
                <>
                  <span style={{ color: "#68a000" }}>Organizations</span>
                  {" We've Worked With"}
                </>
              }
            subheader="Envesti Solutions aims to bridge the gap between how employees are trained and how they perform on the job."
            images={[
              "/carousel/1.png",
              "/carousel/2.png",
              "/carousel/3.png",
              "/carousel/4.png",
              "/carousel/5.png"
            ]}
            speed={60}
            variant="client-logos"
          />
          <HighlightCard
  header="Transform Your Training"
  subheader="Discover how Envesti Solutions can transform your training experience "
  highlights={[
    {
      text: "Engaging Curriculum",
      description: "Keep your learners focused and motivated.",
      detailedDescription: "Our in-person training programs provide hands-on learning experiences with expert instructors. We offer customized curriculum development, interactive workshops, and real-world application exercises tailored to your industry and organizational needs.",
      image: "/images/engaging-curriculum.png",
      button: {
        text: "Learn More",
        href: "/training/in-person",
        variant: "gradient-horizontal"
      }
    },
    {
      text: "Completely Customizable",
      description: "Designed for your unique needs and preferences.",
      detailedDescription: "Our robust online training hosting solutions provide scalable, accessible learning experiences. We offer advanced LMS platforms, mobile-responsive content, progress tracking, and comprehensive analytics to optimize your training outcomes.",
      image: "/images/online-training.jpg",
      button: {
        text: "Explore Platform",
        href: "/training/online",
        variant: "gradient-horizontal"
      }
    },
    {
      text: "Promote A Culture of Learning",
      description: "Expand your organization's culture to include learning as a core value.",
      detailedDescription: "Our robust online training hosting solutions provide scalable, accessible learning experiences. We offer advanced LMS platforms, mobile-responsive content, progress tracking, and comprehensive analytics to optimize your training outcomes.",
      image: "/images/online-training.jpg",
      button: {
        text: "Explore Platform",
        href: "/training/online",
        variant: "gradient-horizontal"
      }
    }
  ]}
/>
<Hero
  style="transparent"
  title="Customizable Training"
  description="We offer a wide range of training options to meet your unique needs. We can provide training for a single topic or a comprehensive training program for your organization."
  image="/images/VideoAssessment.png"
  imageAlt="Video Assessment"
  imagePosition="right"
  button={{
    text: "Learn More",
    href: "/training/online-training",
    variant: "gradient-horizontal"
  }}
/>
        </div>
        <Footer />
      </div>
    </main>
  );
}
