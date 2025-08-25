"use client";

import { NavMenu } from "../../components/nav-menu";
import { Hero } from "../../../../components/hero";

export default function InPersonPage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      
      <Hero
        style="transparent"
        title="In-Person Training Solutions"
        subtitle="Expert-led training sessions that transform your organization"
        description="Our in-person training programs provide hands-on learning experiences with certified instructors. We deliver customized curriculum development, interactive workshops, and real-world application exercises tailored to your industry and organizational needs."
        button={{
          text: "Schedule Training",
          href: "/contact",
          variant: "default",
          size: "lg"
        }}
        image="/images/in-person-hero.jpg"
        imageAlt="In-person training session"
        imagePosition="bottom"
      />

      <div className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose In-Person Training?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the benefits of face-to-face learning experiences that drive real change in your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Personalized Attention</h3>
              <p className="text-muted-foreground">
                Get direct feedback and personalized guidance from expert instructors.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Foster team building and collaboration through interactive group activities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-3">Hands-On Practice</h3>
              <p className="text-muted-foreground">
                Apply knowledge immediately through practical exercises and real scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
