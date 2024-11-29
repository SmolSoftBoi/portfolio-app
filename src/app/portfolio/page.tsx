import React from "react";
import { Container } from "react-bootstrap";

import type { StaticImageData } from "next/image";
import { Metadata } from "next";
import projects from "@/projects";
import SummarySection from "../components/SummarySection";
import Projects from "../components/Projects";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage?: StaticImageData;
  profileImage: StaticImageData;
}

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Check out Kristian's portfolio for some awesome projects!",
  keywords: ["portfolio", "full-stack", "development", "Shopify", "JavaScript"],
};

export default function Page() {
  return (
    <Container className="mt-5">
      <SummarySection
        title="Welcome to My Portfolio"
        summary="I am an ambitious software developer specialising in web design and full-stack development, focused on creating efficient, user-friendly digital experiences.
        My portfolio showcases a diverse range of projects that reflect my proficiency in technologies such as Shopify, JavaScript, TypeScript, HTML, CSS, Node.js, and PHP, all aimed at building impactful and scalable solutions."
      />
      <Projects projects={projects} />
    </Container>
  );
}
