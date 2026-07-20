import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PlaygroundHub from "./PlaygroundHub";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Playground",
  description:
    "Interactive AI demos — image classification, object detection, sentiment analysis, text summarization, and LLM chat.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar />
      <PlaygroundHub />
      <Footer />
    </>
  );
}
