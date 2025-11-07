import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  VideoOff,
  TrendingUp,
  Users,
  Briefcase,
  Brain,
  Target,
  ArrowRight,
  CheckCircle2,
  Star,
  Linkedin,
  MessageCircle,
  Mail,
  ChevronDown,
  Shield,
  Lock,
  CreditCard,
} from "lucide-react";

// === CONSTANTS & DATA (Replace Formspree ID below) ===
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // TODO: Replace YOUR_FORM_ID with your actual Formspree form ID

const navLinks = [
  { label: "Home", href: "hero" },
  { label: "Program", href: "program" },
  { label: "Pricing", href: "pricing" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

const heroTrustIndicators = [
  "⭐ 4.9/5 from 80+ Professionals",
  "✓ 500+ Hours Delivered",
  "🌎 15+ Countries",
];

const socialLogos = ["RemoteOps", "SyncWorks", "GlobalTech", "SalesWave", "HyperConnect"];

const painPoints = [
  {
    icon: VideoOff,
    iconClass: "text-red-500",
    title: "Silent in Meetings, Invisible to Leadership",
    description:
      "You have brilliant ideas, but by the time you translate them in your head, someone else has already spoken. Your manager doesn't know what you're capable of because you're too quiet in video calls.",
  },
  {
    icon: TrendingUp,
    iconClass: "text-orange-500",
    title: "The $20K Communication Gap",
    description:
      "Remote jobs that require fluent English pay 2-3x more. You see the job postings. You're technically qualified. But you skip them because 'English native or near-native required' feels impossible.",
  },
  {
    icon: Users,
    iconClass: "text-blue-500",
    title: "Lost in Translation, Stuck in Junior Roles",
    description:
      "You miss jokes. You don't catch sarcasm. Small talk feels like a nightmare. While others bond with the team over coffee chats, you stay professionally isolated—and overlooked for opportunities.",
  },
];

const solutionColumns = [
  {
    icon: Briefcase,
    iconClass: "text-green-600",
    title: "Real Workplace Scenarios",
    items: [
      "Push back on unrealistic deadlines professionally",
      "Disagree with your manager diplomatically",
      "Present technical concepts clearly",
      "Sound senior, not junior",
    ],
  },
  {
    icon: Brain,
    iconClass: "text-blue-600",
    title: "Navigate Office Politics in English",
    items: [
      "Say \"no\" without sounding rude",
      "Read between the lines in feedback",
      "Use formal vs. casual appropriately",
      "Build genuine relationships",
    ],
  },
  {
    icon: Target,
    iconClass: "text-green-600",
    title: "Your Job, Your Challenges",
    items: [
      "Prepare YOUR actual presentations",
      "Review YOUR emails before sending",
      "Rehearse YOUR difficult conversations",
      "Industry-specific vocabulary",
    ],
  },
];

const programModules = [
  {
    week: "Week 1-3",
    title: "From Silent Observer to Active Participant",
    bullets: [
      "Master confident meeting openings",
      "Get the language to jump into discussions",
      "Learn frameworks for structured responses",
      "Deliver impactful updates without overthinking",
    ],
    outcome: "Real outcome: Speak up strategically in every meeting.",
  },
  {
    week: "Week 4-6",
    title: "From Nervous Presenter to Confident Speaker",
    bullets: [
      "Design persuasive presentation narratives",
      "Control pace, tone, and body language remotely",
      "Handle Q&A sessions with calm confidence",
      "Use storytelling that leads to buy-in",
    ],
    outcome: "Real outcome: Present to stakeholders without panic.",
  },
  {
    week: "Week 7-9",
    title: "From Awkward Small Talk to Genuine Connections",
    bullets: [
      "Unlock networking conversation starters",
      "Decode cultural references and humor",
      "Build rapport in async and live channels",
      "Lead relationship-building coffee chats",
    ],
    outcome: "Real outcome: Become memorable and trusted by peers.",
  },
  {
    week: "Week 10-12",
    title: "From Conflict Avoidance to Professional Negotiation",
    bullets: [
      "Address disagreements without burning bridges",
      "Negotiate raises and promotions with clarity",
      "Give and receive feedback with confidence",
      "Drive alignment in cross-cultural teams",
    ],
    outcome: "Real outcome: Lead conversations that move projects forward.",
  },
];

const processSteps = [
  {
    title: "Apply & Book",
    description: "Tell me about your goals so I can tailor the session.",
  },
  {
    title: "Assessment Call",
    description: "30-minute live diagnosis of your communication gaps.",
  },
  {
    title: "Custom Roadmap",
    description: "Receive a step-by-step plan designed for your role.",
  },
  {
    title: "Weekly Coaching",
    description: "Real-time practice, feedback, and accountability.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$50 USD",
    cadence: "one-time",
    features: [
      "30-minute diagnostic session",
      "Communication strengths report",
      "Tailored improvement roadmap",
      "Email follow-up with resources",
    ],
    button: "Book Diagnostic Session",
    highlight: false,
    tag: null,
    badge: null,
  },
  {
    name: "Professional",
    price: "$144 USD/month",
    cadence: "cancel anytime",
    features: [
      "Weekly 60-min 1:1 coaching calls",
      "On-demand Slack support",
      "Call recordings + transcripts",
      "Real-time document reviews",
      "Quarterly progress benchmarks",
    ],
    button: "Start Your Transformation",
    highlight: true,
    tag: "🔥 MOST POPULAR",
    badge: "✓ 87% see results in first month",
  },
  {
    name: "Intensive",
    price: "$380 USD",
    cadence: "(3-month program)",
    features: [
      "3 months of deep-dive coaching",
      "Interview & promotion preparation",
      "Mock presentations with exec feedback",
      "Advanced negotiation playbooks",
      "Unlimited async document reviews",
    ],
    button: "Get Started Today",
    highlight: false,
    tag: null,
    badge: "Save $52",
  },
];

const testimonials = [
  {
    name: "Lucía Fernández",
    role: "Product Manager, Buenos Aires",
    quote:
      "\"Mary helped me disagree with leadership without sounding defensive. I led my first global release meeting and was offered a promotion within two months.\"",
    badge: "💰 Salary increase: $28,000",
  },
  {
    name: "David Kim",
    role: "Senior Developer, Seoul",
    quote:
      "\"I used to freeze in daily stand-ups. Now I lead sprint reviews and coach teammates on communication. My confidence skyrocketed.\"",
    badge: "🚀 Promotion secured in 8 weeks",
  },
  {
    name: "Isabella Rossi",
    role: "Customer Success Lead, Milan",
    quote:
      "\"Mary translated corporate nuance into a language I could finally use. I closed my biggest enterprise client while on vacation in Bali.\"",
    badge: "🌍 Remote relocation approved",
  },
];

const stats = [
  { label: "Hours Taught", value: "500+" },
  { label: "Success Rate", value: "95%" },
  { label: "Rating", value: "4.9/5" },
  { label: "Countries", value: "15+" },
];

const faqItems = [
  {
    question: "I'm not a complete beginner, but I'm not fluent. Is this for me?",
    answer:
      "Absolutely. My clients are already working in English-speaking environments but need strategic coaching to sound confident, senior, and culturally fluent.",
  },
  {
    question: "How is this different from Duolingo/apps/YouTube?",
    answer:
      "Apps teach vocabulary. I coach you through real-life business scenarios, live feedback, and tailored role-play that mirrors your actual work challenges.",
  },
  {
    question: "What if my schedule is unpredictable?",
    answer:
      "We co-create a flexible schedule with rescheduling options. You also get async support, so progress continues even when meetings move around.",
  },
  {
    question: "Will you fix my accent?",
    answer:
      "We focus on clarity over imitation. If accent reduction is a goal, I provide targeted exercises to ensure you're always understood without losing authenticity.",
  },
  {
    question: "Can you guarantee results?",
    answer:
      "Your success depends on practice and implementation, but 95% of clients hit their goals within 90 days when they commit to the process.",
  },
  {
    question: "What if I don't see results?",
    answer:
      "If you complete the program as designed and don't see improvement, I'll extend additional coaching or connect you directly for tailored support.",
  },
];

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Program", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
  { label: "FAQs", href: "#" },
];

const credentials = [
  "CELTA Certified English Coach",
  "Former Remote Team Lead at Fortune 500",
  "Certified Business Communication Specialist",
  "Clients across 15+ countries and 6 industries",
];

const App = () => {
  // === STATE MANAGEMENT ===
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // === EFFECT: HANDLE STICKY HEADER ON SCROLL ===
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === HANDLERS ===
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("idle");

    const formData = new FormData(event.target);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        event.target.reset();
        setTimeout(() => setShowModal(false), 3000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }

    setSubmitting(false);
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const openBookingModal = () => {
    setFormStatus("idle");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* === HEADER === */}
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm transition-shadow ${
          isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-700">Mary Teacher</span>
            <span className="hidden text-sm text-gray-500 sm:block">
              English Coach for Remote Professionals
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(event) => handleNavClick(event, link.href)}
                className="text-sm font-semibold text-gray-600 transition hover:text-green-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-600"
            >
              Book Free Session
            </button>
          </div>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-green-700"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={openBookingModal}
                className="w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-600"
              >
                Book Free Session
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* === HERO SECTION === */}
        <section id="hero" className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                🎯 Trusted by 100+ Remote Professionals
              </span>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight md:text-6xl">
                Stop Losing Opportunities Because of Your English
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Master professional English for remote work in 90 days. No more freezing in meetings. No more missed promotions. Just confident communication that advances your career.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="w-full rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600 sm:w-auto"
                >
                  Book Your Free 30-Min Assessment
                </button>
                <a
                  href="#testimonials"
                  onClick={(event) => handleNavClick(event, "testimonials")}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition hover:border-green-500 sm:w-auto"
                >
                  See Real Success Stories ↓
                </a>
              </div>
              <div className="flex flex-col gap-3 text-sm text-gray-600 md:flex-row md:items-center md:gap-8">
                {heroTrustIndicators.map((indicator) => (
                  <span key={indicator}>{indicator}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 p-12 shadow-2xl">
                <div className="aspect-square rounded-xl border border-dashed border-green-200 bg-white/60 p-8">
                  <div className="flex h-full w-full items-center justify-center text-center text-lg font-semibold text-green-700">
                    Professional Video Call Scene
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SOCIAL PROOF BAR === */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
              Trusted by professionals at:
            </p>
            <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
              {socialLogos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-12 w-32 items-center justify-center rounded bg-gray-200 text-sm font-semibold uppercase tracking-wider text-gray-500 opacity-60"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === PAIN POINTS SECTION === */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                Your English is Costing You More Than You Think
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                You're qualified for the promotion. You have the skills. But when it's time to speak...
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {painPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 p-8 transition hover:shadow-lg"
                >
                  <item.icon className={`mb-6 h-12 w-12 ${item.iconClass}`} />
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-4 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === SOLUTION SECTION === */}
        <section className="bg-gradient-to-b from-green-50 via-white to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                What If English Became Your Career Accelerator Instead of Your Barrier?
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                This isn't about grammar drills. It's about mastering the communication skills that remote leadership teams crave.
              </p>
            </div>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {solutionColumns.map((column) => (
                <div key={column.title} className="rounded-2xl bg-white p-10 shadow-md">
                  <column.icon className={`mb-4 h-16 w-16 ${column.iconClass}`} />
                  <h3 className="text-2xl font-semibold text-gray-900">{column.title}</h3>
                  <ul className="mt-6 space-y-3 text-gray-700">
                    {column.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === PROGRAM SECTION === */}
        <section id="program" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                The Exact Roadmap from "I Hope They Don't Call on Me" to "I'll Lead This Meeting"
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                12 weeks of focused coaching designed for remote professionals who want confident, strategic English communication.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {programModules.map((module) => (
                <div
                  key={module.title}
                  className="rounded-2xl border-2 border-gray-200 p-8 transition hover:border-green-500"
                >
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {module.week}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900">{module.title}</h3>
                  <ul className="mt-6 space-y-3 text-gray-700">
                    {module.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
                    {module.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS SECTION === */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">Simple Process, Powerful Results</h2>
              <p className="mt-6 text-lg text-gray-600">
                Every step is designed to move you from hesitant communicator to trusted remote leader.
              </p>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-4 md:items-start">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-3 text-gray-600">{step.description}</p>
                  {index !== processSteps.length - 1 && (
                    <ArrowRight className="mt-6 hidden h-6 w-6 text-green-500 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === PRICING SECTION === */}
        <section id="pricing" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">Choose Your Investment</h2>
              <p className="mt-6 text-lg text-gray-600">
                The average remote worker who improves their English sees a $15,000+ salary increase within 12 months.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 ${
                    plan.highlight
                      ? "border-4 border-green-500 bg-white shadow-md"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  {plan.tag && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                      {plan.tag}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-bold text-gray-900">{plan.price}</p>
                  <p className="text-sm text-gray-600">{plan.cadence}</p>
                  {plan.badge && (
                    <div className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {plan.badge}
                    </div>
                  )}
                  <ul className="mt-8 space-y-3 text-gray-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openBookingModal}
                    className={`mt-10 w-full rounded-lg px-6 py-4 text-sm font-semibold transition ${
                      plan.highlight
                        ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                        : "border border-gray-300 text-gray-900 hover:border-green-500"
                    }`}
                  >
                    {plan.button}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 text-gray-600 sm:flex-row">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <CreditCard className="h-5 w-5 text-green-600" />
                💳 Secure payment
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock className="h-5 w-5 text-green-600" />
                🔒 Data protected
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Shield className="h-5 w-5 text-green-600" />
                💯 100% satisfaction guaranteed
              </div>
            </div>
          </div>
        </section>

        {/* === TESTIMONIALS SECTION === */}
        <section id="testimonials" className="bg-gradient-to-b from-green-50 via-white to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                Don't Take My Word for It. Here's What Actually Happens.
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Real professionals. Real promotions. Real confidence.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-xl bg-white p-8 shadow-md">
                  <div className="mx-auto h-20 w-20 rounded-full bg-gray-300"></div>
                  <div className="mt-4 flex items-center justify-center gap-1 text-green-600">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <p className="mt-6 italic text-gray-700">{testimonial.quote}</p>
                  <div className="mt-6 text-center">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="mt-6 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {testimonial.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === STATS BAR === */}
        <section className="bg-green-700">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-green-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* === ABOUT MARY SECTION === */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="grid gap-12 md:grid-cols-5 md:items-center">
              <div className="md:col-span-2">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 p-8 shadow-md">
                  <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-green-200 bg-white/60 text-center text-lg font-semibold text-green-700">
                    Professional Photo of Mary
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900">
                  Your Coach
                </span>
                <h2 className="mt-6 text-3xl font-bold text-gray-900 md:text-5xl">Meet Mary</h2>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  English Coach Specialized in Remote Work Communication
                </h3>
                <div className="mt-6 space-y-4 text-gray-700">
                  <p>
                    I'm Mary, a communication strategist helping remote professionals break through language barriers and earn the senior positions they deserve.
                  </p>
                  <p>
                    For the past decade, I've coached global teams across tech, sales, and product, translating corporate nuance into actionable language you can use immediately.
                  </p>
                  <p>
                    We'll work together on your real meetings, presentations, and negotiations—so you show up with clarity, presence, and leadership in every conversation.
                  </p>
                </div>
                <ul className="mt-6 space-y-3 text-gray-700">
                  {credentials.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="mt-8 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-600"
                >
                  Book Free Session with Mary
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* === FAQ SECTION === */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">Frequently Asked Questions</h2>
              <p className="mt-6 text-lg text-gray-600">
                Transparent answers so you know exactly what to expect.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.question}
                    className="mb-4 cursor-pointer rounded-lg bg-white p-6 shadow-sm transition hover:shadow-md"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          isOpen ? "rotate-180 text-green-600" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden text-gray-600 transition-all duration-300 ${
                        isOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === FINAL CTA SECTION === */}
        <section id="contact" className="bg-gradient-to-r from-green-700 to-blue-900">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center text-white sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold md:text-5xl">
              Your Next Promotion Won't Wait for Your English to "Magically" Improve
            </h2>
            <p className="mt-6 text-lg text-green-100">
              Choose confidence over guesswork. Book a tailored assessment or keep hoping the right words come when you need them.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg transition hover:shadow-2xl"
            >
              Book Your Free Assessment
            </button>
            <p className="mt-6 text-sm text-green-100">✓ 30 minutes ✓ Zero pressure ✓ Personalized assessment</p>
            <p className="mt-4 text-sm font-semibold text-green-200">Available spots this week: 3</p>
          </div>
        </section>
      </main>

      {/* === FOOTER === */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold text-white">Mary Teacher</h3>
              <p className="mt-4 text-sm text-gray-400">
                English Coach for Remote Professionals ready to lead in global teams with confidence.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="rounded-full bg-gray-800 p-3 text-white transition hover:bg-green-600">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-gray-800 p-3 text-white transition hover:bg-green-600">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="mailto:contact@maryteacher.com" className="rounded-full bg-gray-800 p-3 text-white transition hover:bg-green-600">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition hover:text-green-500">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>Email: contact@maryteacher.com</li>
                <li>WhatsApp: +1 (555) 123-4567</li>
                <li>LinkedIn: /in/mary-teacher</li>
                <li>Based in: Remote - Serving Global Clients</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-sm text-gray-500">
            © 2024 Mary Teacher. All rights reserved.
          </div>
        </div>
      </footer>

      {/* === FLOATING WHATSAPP BUTTON === */}
      <div className="group fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => window.open("https://wa.me/15551234567", "_blank")}
          className="flex items-center justify-center rounded-full bg-green-500 p-4 text-white shadow-2xl transition hover:bg-green-600"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        <span className="pointer-events-none absolute -top-12 right-1/2 translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Need help? Chat with me
        </span>
      </div>

      {/* === BOOKING MODAL === */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-12">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 text-gray-400 transition hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Book Your Free 30-Minute Assessment
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Share your details and I'll send you available slots within 24 hours.
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Current English Level</label>
                  <select
                    name="englishLevel"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  >
                    <option value="">Select your level</option>
                    <option value="Intermediate B1">Intermediate B1</option>
                    <option value="Upper-Intermediate B2">Upper-Intermediate B2</option>
                    <option value="Advanced C1">Advanced C1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Work Industry</label>
                  <select
                    name="industry"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  >
                    <option value="">Select your industry</option>
                    <option value="Tech/Software">Tech/Software</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Main Challenge
                </label>
                <textarea
                  name="mainChallenge"
                  rows="4"
                  placeholder="What's your biggest challenge with English at work?"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Preferred Time</label>
                <select
                  name="preferredTime"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                >
                  <option value="">Select a time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-green-500 px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Book My Free Session"}
              </button>
            </form>
            {formStatus === "success" && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                🎉 Thank you! I'll contact you within 24 hours.
              </div>
            )}
            {formStatus === "error" && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                Please email me directly at: contact@maryteacher.com
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
