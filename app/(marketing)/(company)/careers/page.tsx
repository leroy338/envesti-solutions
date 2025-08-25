import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CareersPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Instructional Designer",
      department: "Learning & Development",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "5+ years",
      description: "Design and develop engaging learning experiences for corporate clients. Create innovative instructional strategies and multimedia content.",
      requirements: [
        "Master's degree in Instructional Design, Education, or related field",
        "Experience with e-learning authoring tools (Articulate, Captivate)",
        "Strong understanding of adult learning principles",
        "Portfolio of successful learning projects"
      ]
    },
    {
      id: 2,
      title: "Learning Technology Specialist",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Implement and optimize learning management systems. Provide technical support and training for digital learning platforms.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Experience with LMS platforms (Canvas, Blackboard, Moodle)",
        "Knowledge of SCORM, xAPI, and learning standards",
        "Strong troubleshooting and customer service skills"
      ]
    },
    {
      id: 3,
      title: "Corporate Trainer",
      department: "Training Delivery",
      location: "On-site / Travel Required",
      type: "Full-time",
      experience: "2+ years",
      description: "Deliver engaging in-person and virtual training sessions. Customize training content for diverse corporate audiences.",
      requirements: [
        "Bachelor's degree in Business, Communication, or related field",
        "Excellent presentation and facilitation skills",
        "Experience in corporate training or adult education",
        "Willingness to travel up to 50%"
      ]
    }
  ];

  const benefits = [
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs"
    },
    {
      title: "Professional Development",
      description: "Continuous learning opportunities, conference attendance, and certification support"
    },
    {
      title: "Work-Life Balance",
      description: "Flexible work arrangements, generous PTO, and mental health days"
    },
    {
      title: "Team Culture",
      description: "Collaborative environment, team building events, and recognition programs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Help us transform the future of corporate learning and development. 
              We&apos;re looking for passionate individuals who want to make a difference.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="gradient-horizontal">
                View Open Positions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Culture Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Work With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We&apos;re building a culture of innovation, collaboration, and continuous learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Current Openings
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore opportunities to join our growing team
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {job.department} • {job.location} • {job.type}
                      </CardDescription>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.experience}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How to Apply
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our simple and transparent application process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600">
                Complete our online application form with your resume and cover letter
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Process</h3>
              <p className="text-gray-600">
                Meet with our team through phone, video, and in-person interviews
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join the Team</h3>
              <p className="text-gray-600">
                Welcome aboard! We&apos;ll help you get started and integrated
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            If you don&apos;t see a position that fits your skills, we&apos;d still love to hear from you. 
            Send us your resume and let&apos;s discuss how you can contribute to our mission.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Send General Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
