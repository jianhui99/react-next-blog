'use client';

import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogHero from "@/components/BlogHero";

export default function Home() {
  return (
    <>
      <Header />
      <BlogHero />
      <BlogList />
      <Footer />
    </>
  );
}
