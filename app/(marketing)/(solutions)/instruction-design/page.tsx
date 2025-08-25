"use client";

import { NavMenu } from "../../components/nav-menu";
import { Hero } from "../../../../components/hero";
import { HighlightCard } from "../../../../components/highlight-card";

export default function InstructionDesignPage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      
      <Hero
        style="transparent"
        title="Instructional Design Solutions"
        subtitle="Creating engaging learning experiences that drive results"
        description="Our instructional design expertise transforms complex information into engaging, effective learning experiences. We combine proven learning theories with modern design principles to create training programs that maximize retention and application."
        button={{
          text: "Get Started",
          href: "/contact",
          variant: "default",
          size: "lg"
        }}
        image="/images/instruction-design.jpg"
        imageAlt="Instructional design process"
        imagePosition="bottom"
      />

      <div className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Instructional Design Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to creating effective learning experiences that engage and educate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-3">Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Understanding learner needs, goals, and context to inform design decisions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-3">Design</h3>
              <p className="text-muted-foreground text-sm">
                Creating learning objectives, content structure, and assessment strategies.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-lg font-semibold mb-3">Development</h3>
              <p className="text-muted-foreground text-sm">
                Building engaging content, interactive elements, and multimedia resources.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-semibold mb-3">Evaluation</h3>
              <p className="text-muted-foreground text-sm">
                Testing effectiveness and gathering feedback for continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <HighlightCard
        header="Instructional Design Expertise"
        subheader="Discover how our design process creates engaging learning experiences that drive real results"
        highlights={[
          {
            text: "Learning Theory Integration",
            description: "Based on proven educational research.",
            detailedDescription: "Our instructional design is grounded in established learning theories including constructivism, cognitive load theory, and adult learning principles. We create experiences that align with how people naturally learn and retain information, ensuring maximum effectiveness and engagement.",
            image: "/images/engaging-curriculum.png",
            button: {
              text: "Learn More",
              href: "/design/theory",
              variant: "default"
            }
          },
          {
            text: "Interactive Content Creation",
            description: "Engaging multimedia and interactive elements.",
            detailedDescription: "We develop rich, interactive content that goes beyond static text and images. Our designs include simulations, branching scenarios, gamified elements, and multimedia resources that actively engage learners and promote deeper understanding and retention.",
            image: "/images/online-training.jpg",
            button: {
              text: "View Examples",
              href: "/design/interactive",
              variant: "secondary"
            }
          },
          {
            text: "Assessment & Evaluation",
            description: "Comprehensive measurement of learning outcomes.",
            detailedDescription: "Our instructional design includes robust assessment strategies that measure not just knowledge acquisition, but also skill application and behavioral change. We create evaluation tools that provide actionable insights for both learners and organizations.",
            image: "/images/VideoAssessment.png",
            button: {
              text: "Explore Tools",
              href: "/design/assessment",
              variant: "outline"
            }
          }
        ]}
      />

      <div className="w-full py-16 px-4 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Design Principles We Follow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Core principles that guide our instructional design approach and ensure learning effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Learner-Centered Design</h3>
                  <p className="text-muted-foreground">
                    Every design decision is made with the learner&apos;s needs, preferences, and context in mind.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Iterative Development</h3>
                  <p className="text-muted-foreground">
                    Continuous testing and refinement based on learner feedback and performance data.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Multi-Platform Compatibility</h3>
                  <p className="text-muted-foreground">
                    Designs that work seamlessly across desktop, tablet, and mobile devices.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data-Driven Decisions</h3>
                  <p className="text-muted-foreground">
                    Using analytics and learner data to continuously improve learning experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
