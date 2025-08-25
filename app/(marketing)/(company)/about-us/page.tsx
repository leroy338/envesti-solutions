"use client";

import { NavMenu } from "../../components/nav-menu";
import { Hero } from "../../../../components/hero";
import { Card, CardTitle, CardDescription } from "../../../../components/ui/card";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      
      <Hero
        style="gradient-horizontal"
        title="About Envesti Solutions"
        subtitle="Empowering organizations through innovative training solutions"
        description="From our humble beginnings serving foster care agencies to becoming a comprehensive training partner for organizations nationwide, Envesti Solutions has been dedicated to excellence in professional development and compliance training."
        button={{
          text: "Our Services",
          href: "/solutions",
          variant: "secondary",
          size: "lg"
        }}
        image="/images/in-person-hero.jpg"
        imageAlt="Envesti Solutions team"
        imagePosition="right"
      />

      <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Our Story Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A journey from specialized training to comprehensive learning solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Humble Beginnings
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Envesti Solutions was founded with a clear mission: to help foster care agencies maintain compliance with state regulators through effective training programs. We recognized that child care workers needed accessible, high-quality training to ensure the safety and well-being of children in their care.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Growth & Evolution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As we successfully served the foster care community, we discovered that organizations across various industries faced similar challenges. They needed reliable, engaging training solutions that could adapt to their unique needs while maintaining the highest standards of quality and compliance.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Comprehensive Solutions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, Envesti Solutions offers a full spectrum of training services, from professional development and leadership training to specialized courses like CPR certification. Our commitment to excellence and innovation has made us a trusted partner for organizations of all sizes.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🌱</div>
                    <h4 className="text-xl font-semibold text-foreground">Growing Together</h4>
                    <p className="text-sm text-muted-foreground">
                      From foster care training to comprehensive learning solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Values Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Mission & Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle className="text-xl font-semibold mb-3">Excellence</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We maintain the highest standards in all our training programs, ensuring quality and effectiveness in every course we deliver.
                </CardDescription>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle className="text-xl font-semibold mb-3">Partnership</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We work closely with our clients to understand their unique needs and develop customized training solutions that drive real results.
                </CardDescription>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">💡</div>
                <CardTitle className="text-xl font-semibold mb-3">Innovation</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We continuously evolve our training methods and technologies to provide cutting-edge learning experiences that engage and inspire.
                </CardDescription>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🛡️</div>
                <CardTitle className="text-xl font-semibold mb-3">Compliance</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We understand the critical importance of regulatory compliance and ensure all our training programs meet or exceed industry standards.
                </CardDescription>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">❤️</div>
                <CardTitle className="text-xl font-semibold mb-3">Care</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We care deeply about the impact of our training on individuals, organizations, and the communities they serve.
                </CardDescription>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🌍</div>
                <CardTitle className="text-xl font-semibold mb-3">Accessibility</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We believe quality training should be accessible to all organizations, regardless of size or industry.
                </CardDescription>
              </Card>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive training solutions for every organization
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🏠</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Foster Care & Child Care Training
                      </h3>
                      <p className="text-muted-foreground">
                        Our foundation in foster care training continues to be a core service, helping agencies maintain compliance with state regulations and provide the best care for children.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💼</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Professional Development
                      </h3>
                      <p className="text-muted-foreground">
                        Leadership training, communication skills, project management, and other essential professional skills that help organizations and individuals grow.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🆘</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Safety & Certification
                      </h3>
                      <p className="text-muted-foreground">
                        CPR certification, workplace safety training, and other critical safety programs that protect employees and ensure regulatory compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🏥</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Industry-Specific Training
                      </h3>
                      <p className="text-muted-foreground">
                        Specialized training programs tailored to healthcare, education, non-profits, and other industries with unique compliance and training needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-accent/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h4 className="font-semibold text-foreground">100+</h4>
                    <p className="text-sm text-muted-foreground">Training Courses</p>
                  </div>
                  <div className="bg-accent/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <h4 className="font-semibold text-foreground">500+</h4>
                    <p className="text-sm text-muted-foreground">Organizations Served</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-accent/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">🌟</div>
                    <h4 className="font-semibold text-foreground">10+</h4>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                  <div className="bg-accent/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-semibold text-foreground">50+</h4>
                    <p className="text-sm text-muted-foreground">Industries Supported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16 bg-accent/20 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Training?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Join hundreds of organizations that trust Envesti Solutions for their training and compliance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Our Solutions
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
