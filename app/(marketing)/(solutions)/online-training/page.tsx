"use client";

import { NavMenu } from "../../components/nav-menu";
import { Hero } from "../../../../components/hero";
import { CardBanner } from "../../../../components/card-banner";

export default function OnlineTrainingPage() {
  const onlineTrainingCards = [
    {
      image: "/images/VideoAssessment.png",
      title: "Learning Management System",
      description: "Advanced LMS platform with comprehensive course management, progress tracking, and analytics.",
      cta: {
        text: "Explore LMS",
        href: "/lms",
        variant: "default" as const,
      }
    },
    {
      image: "/images/MobileLearning.jpg",
      title: "Mobile-First Design",
      description: "Responsive content that works seamlessly across all devices and screen sizes.",
      cta: {
        text: "Learn More",
        href: "/mobile",
        variant: "secondary" as const,
      }
    },
    {
      image: "/images/digitalProduct.png",
      title: "Advanced Analytics",
      description: "Comprehensive reporting and insights to measure training effectiveness and ROI.",
      cta: {
        text: "View Demo",
        href: "/analytics",
        variant: "outline" as const,
      }
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      
      <Hero
        style="transparent"
        title="Online Training Solutions"
        subtitle="Scalable learning experiences that drive results"
        description="Our robust online training hosting solutions provide scalable, accessible learning experiences for organizations of all sizes. We offer advanced LMS platforms, mobile-responsive content, progress tracking, and comprehensive analytics to optimize your training outcomes."
        button={{
          text: "Schedule a Consultation",
          href: "/trial",
          variant: "default",
          size: "lg"
        }}
        image="/images/online-training.jpg"
        imageAlt="Online training platform"
        imagePosition="bottom"
      />

      <div className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Online Training?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages of digital learning that adapts to your organization&apos;s needs and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-muted-foreground">
                Learn at your own pace with 24/7 access to training materials.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Cost Effective</h3>
              <p className="text-muted-foreground">
                Reduce travel costs and time away from work with online training.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Mobile Learning</h3>
              <p className="text-muted-foreground">
                Access training anywhere, anytime on any device.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardBanner
        header="Our Online Training Platform"
        subheader="Envesti Solutions provides a comprehensive suite of online training tools designed to enhance learning outcomes and streamline your training processes."
        cards={onlineTrainingCards}
      />

      <div className="w-full py-16 px-4 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to deliver effective online training experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎓</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Course Creation</h3>
                  <p className="text-muted-foreground">
                    Easy-to-use tools for creating engaging, interactive courses with multimedia content.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">👥</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">
                    Comprehensive user management with role-based access and permissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor learner progress with detailed analytics and reporting tools.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Security & Compliance</h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade security with compliance tracking for regulated industries.
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
