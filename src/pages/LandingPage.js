import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            Empowering SAM and FinOps Excellence
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            SofClo bridges the gap between operational management and strategic alignment,
            helping you optimize software assets and cloud financial operations.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Transform Your SAM & FinOps Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
              <p className="text-gray-600">
                SAM and FinOps managers struggle with inefficiencies, lack of visibility,
                and difficulties in aligning operations with business strategy. Traditional
                tools focus only on technical compliance, missing the bigger picture.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
              <p className="text-gray-600">
                SofClo provides a structured SaaS platform that integrates SAM framework,
                operational model, and stakeholder communication into one cohesive system,
                helping you demonstrate value to leadership.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Strategic Alignment</h3>
              <p className="text-gray-600">
                Align your SAM and FinOps programs with business objectives through
                structured frameworks and operational models.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Stakeholder Engagement</h3>
              <p className="text-gray-600">
                Improve communication with stakeholders and secure management buy-in
                through effective reporting and value demonstration.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Program Optimization</h3>
              <p className="text-gray-600">
                Reduce inefficiencies and optimize your programs with best practices
                and community-driven insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Built for Enterprise Teams
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-600 mb-8">
              SofClo is designed for SAM and FinOps managers in mid-sized to large enterprises
              across technology, finance, and healthcare industries who need better tools for
              program management and stakeholder alignment.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={handleGetStarted}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
