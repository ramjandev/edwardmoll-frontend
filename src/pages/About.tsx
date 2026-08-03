import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      title: "HONEST PRICING",
      desc: "Flat rates you see up front. What we quote is what you pay.",
      icon: "🛡️",
    },
    {
      title: "RESPECT FOR YOUR STUFF",
      desc: "Pad-wrapped, carefully loaded, delivered right – every time.",
      icon: "🧡",
    },
    {
      title: "PHOENIX THROUGH AND THROUGH",
      desc: "We live here. We know the buildings, the traffic, and the heat.",
      icon: "📍",
    },
    {
      title: "5-STAR STANDARD",
      desc: "Show up on time, work hard, leave happy customers. Every move.",
      icon: "⭐",
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
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</span>
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">About</span>
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
        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">About Us</span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
          A Phoenix Moving Company <br />
          <span className="text-[var(--primary)]">Built on Trust.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          AAAAAffordable Moving is a locally owned, flat-rate moving company serving Phoenix and the entire Valley. We started with a simple idea: moving shouldn't be expensive, stressful, or full of surprises. Honest prices, careful crews, and clear communication – every move.
        </p>
      </section>

      {/* Value Cards Row */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/30 p-6 space-y-4">
              <span className="size-10 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                {v.icon}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-white uppercase tracking-wider">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promise & Direct CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-[var(--border)] pt-16">
          {/* Left Promise */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Our Promise</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              The price we quote is the price you pay.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              No hourly meter running. No hidden fees for stairs, long carries, or heavy items unless we discuss it up front. If our flat rate isn't right for your move, we'll tell you before we start.
            </p>
          </div>

          {/* Right Panel Card */}
          <div className="lg:col-span-5 rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-8 space-y-6 text-center shadow-lg">
            <h3 className="text-sm font-black text-white uppercase tracking-wider leading-relaxed">
              Ready to Move? <br />
              <span className="text-xs font-medium text-slate-300 lowercase normal-case">Get an instant flat-rate quote or call us directly.</span>
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/quote")}
                className="w-full rounded bg-[var(--primary)] py-3.5 px-4 text-center text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
              >
                Build My Instant Quote
              </button>
              <a
                href="tel:602-921-5749"
                className="w-full rounded border border-[var(--primary)] bg-transparent py-3 px-4 text-center text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
              >
                Call 602-921-5749
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

export default About;
