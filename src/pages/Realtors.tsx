import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const Realtors = () => {
  const navigate = useNavigate();

  const handleItems = [
    {
      title: "TENANT MOVE-OUTS",
      desc: "Fast, clean move-outs so units turn on schedule. We coordinate directly with your team.",
      icon: "🔑",
    },
    {
      title: "NEW RESIDENT MOVE-INS",
      desc: "Concierge-style welcome moves – a differentiator your leasing team can offer prospects.",
      icon: "👥",
    },
    {
      title: "FURNITURE RELOCATION",
      desc: "Model unit refreshes, on-site inventory shuffles, and last-minute room resets.",
      icon: "🏢",
    },
    {
      title: "PROPERTY PREPARATION",
      desc: "Removals, hauling, and staging support to get a listing photo-ready.",
      icon: "📋",
    },
    {
      title: "STAGING SUPPORT",
      desc: "Deliver, place, and pick up staging inventory on your timeline.",
      icon: "✨",
    },
    {
      title: "COMMUNITY PARTNERSHIPS",
      desc: "Volume pricing and priority scheduling for property management groups.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#071425]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImg} alt="AAAAAffordable Moving" className="h-10 object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/")}>Home</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/quote")}>Instant Quote</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/services")}>Services</span>
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">Realtors & Leasing</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/about")}>About</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/contact")}>Contact</span>
          </nav>

          <a
            href="tel:602-921-5749"
            className="flex items-center gap-2 rounded border border-[var(--primary)] bg-[var(--primary)]/10 py-1.5 px-4 text-sm font-bold text-[var(--primary)] shadow hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition duration-200"
          >
            📞 602-921-5749
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 lg:py-24 text-center space-y-6">
        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">For Real Estate & Leasing Pros</span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
          Helping Leasing and Real Estate <br />
          Agents <span className="text-[var(--primary)]">Keep Properties Moving.</span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          A dependable Phoenix moving partner for your turnovers, new-resident welcomes, staging, and property prep – with flat rates your team can quote confidently.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate("/quote")}
            className="w-full sm:w-auto rounded bg-[var(--primary)] py-3 px-8 text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Talk to Our Realtor Desk
          </button>
          <a
            href="tel:602-921-5749"
            className="w-full sm:w-auto rounded border border-[var(--primary)] py-3 px-8 text-center text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
          >
            📞 602-921-5749
          </a>
        </div>
      </section>

      {/* Handle items grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">What We Handle</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Everything your properties need – one crew, one call.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handleItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-6 flex flex-col justify-between space-y-6 hover:border-[var(--primary)]/30 transition duration-200 cursor-pointer"
              onClick={() => navigate("/quote")}
            >
              <div className="space-y-4">
                <div className="size-12 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom program panel */}
      <section className="max-w-7xl mx-auto px-6 pb-24 border-t border-[var(--border)] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Partner Program</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Priority scheduling for your team.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              If you're managing multiple units or running an active book of listings, we'll set up a dedicated point of contact, volume pricing, and preferred move slots.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-8 space-y-6 text-center shadow-lg">
            <h3 className="text-sm font-black text-white uppercase tracking-wider leading-relaxed">
              Get Set Up <br />
              <span className="text-xs font-medium text-slate-300 lowercase normal-case">Call our Realtor desk and we'll build a plan for your properties.</span>
            </h3>
            <div className="space-y-3">
              <a
                href="tel:602-921-5749"
                className="w-full rounded bg-[var(--primary)] py-3.5 px-4 text-center text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition block"
              >
                Call 602-921-5749
              </a>
              <a
                href="mailto:Aaaaaffordablemovingsvcs@gmail.com"
                className="w-full rounded border border-[var(--primary)] bg-transparent py-3 px-4 text-center text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
              >
                ✉ Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border)] bg-[#071425] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 space-y-4">
            <img src={logoImg} alt="AAAAAffordable Moving" className="h-10 object-contain" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Licensed, insured, and locally operated. Serving homes, apartments, businesses, seniors, and real estate professionals across the Valley.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-[var(--primary)] tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/")}>Home</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/quote")}>Instant Quote</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/services")}>Services</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/about")}>About</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/")}>Contact</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-[var(--primary)] tracking-widest">Contact</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>📞 602-921-5749</li>
              <li>📧 Aaaaaffordablemovingsvcs@gmail.com</li>
              <li>📍 Phoenix, Arizona</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-[var(--border)] text-center text-[10px] text-slate-500 uppercase tracking-widest">
          © 2026 AAAAAffordable Moving. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Realtors;
