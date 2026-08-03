import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import heroImg from "../assets/images/hero.jpg";
import delivery1 from "../assets/images/delivery1.jpg";
import delivery2 from "../assets/images/delivery2.jpg";
import delivery3 from "../assets/images/delivery3.jpg";
import delivery4 from "../assets/images/delivery4.jpg";
import delivery5 from "../assets/images/delivery5.jpg";
import delivery6 from "../assets/images/delivery6.jpg";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "APARTMENT MOVING",
      desc: "Studios to high-rises across the Valley. Fast, careful, flat-rate.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        </svg>
      ),
    },
    {
      title: "RESIDENTIAL MOVING",
      desc: "Single-family homes packed, loaded, and delivered right.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      title: "SENIOR MOVES",
      desc: "Patient, respectful help with downsizing and settling in.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
    {
      title: "STORAGE MOVES",
      desc: "In, out, or between units – we handle the heavy lifting.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
    },
    {
      title: "LOADING & UNLOADING",
      desc: "Already have a truck? We'll load or unload it professionally.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M3.75 14.25h16.5M3.75 14.25V5.625c0-.621.504-1.125 1.125-1.125H16.5c.621 0 1.125.504 1.125 1.125v1.875m-17.25 6H16.5m0-6V9.75m0 0h3.75" />
        </svg>
      ),
    },
    {
      title: "FURNITURE RELOCATION",
      desc: "Rearranging or moving a few big pieces – done in one trip.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.162-.327.5-.533.868-.533.367 0 .706.206.868.533l2.89 5.867 6.476.942c.36.052.66.295.785.633.124.337.039.713-.22 1.018l-4.687 4.567 1.107 6.45c.061.359-.088.718-.386.936-.297.217-.698.248-1.026.08L12 17.25l-5.794 3.045c-.328.168-.729.137-1.026-.08-.298-.218-.447-.577-.386-.936l1.1-6.45-4.686-4.567c-.26-.305-.344-.681-.22-1.018.125-.338.424-.581.785-.633l6.477-.942 2.89-5.867Z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "FLAT RATES, NO SURPRISES",
      desc: "You know the price before we load the truck. Not by the hour.",
    },
    {
      title: "LOCALLY OWNED",
      desc: "Phoenix crew that treats your stuff like it's ours.",
    },
    {
      title: "INSTANT ONLINE QUOTE",
      desc: "Answer 7 quick questions – get a real number. No contact info needed.",
    },
    {
      title: "HONEST AND HARDWORKING",
      desc: "We show up, work hard, and earn your trust with every box.",
    },
    {
      title: "FAST BUT CAREFUL",
      desc: "Efficient moving that protects your furniture and your floors.",
    },
    {
      title: "FRIENDLY AND CARING",
      desc: "Respectful movers who treat your family and belongings right.",
    },
  ];

  const reviews = [
    {
      text: '"Quoted the price online, and that\'s exactly what I paid. Crew was fast and respectful of my furniture."',
      author: "Marisol A.",
      info: "2BR apartment - Central Phoenix",
    },
    {
      text: '"We use them for every tenant turnover. They\'re on time, careful, and our residents love them."',
      author: "Devon R.",
      info: "Property Manager - Scottsdale",
    },
    {
      text: '"They helped my mom downsize with so much patience. Best moving decision we made."',
      author: "Karen L.",
      info: "Senior move - Sun City",
    },
  ];

  const cities = [
    "Phoenix",
    "Scottsdale",
    "Tempe",
    "Mesa",
    "Chandler",
    "Gilbert",
    "Glendale",
    "Peoria",
    "Surprise",
    "Avondale",
    "Goodyear",
    "Sun City",
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#071425]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImg} alt="AAAAAffordable Moving" className="h-10 object-contain" />
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">Home</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/quote")}>Instant Quote</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/services")}>Services</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/about")}>About</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/contact")}>Contact</span>
          </nav>

          {/* Phone Button */}
          <a
            href="tel:602-921-5749"
            className="flex items-center gap-2 rounded border border-[var(--primary)] bg-[var(--primary)]/10 py-1.5 px-4 text-sm font-bold text-[var(--primary)] shadow hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition duration-200"
          >
            📞 602-921-5749
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Brand Details */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <img src={logoImg} alt="AAAAAffordable Moving Big" className="w-full max-w-[420px] object-contain" />
            
            <div className="inline-block rounded-full bg-[var(--primary)]/10 border border-[var(--primary)] px-4 py-1 text-xs font-black uppercase text-[var(--primary)] tracking-widest">
              📍 Phoenix, Arizona • Flat-Rate Movers
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
              Moving Services <br />
              Across <span className="text-[var(--primary)]">Phoenix</span> & Beyond
            </h1>
            <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
              Price in under 60 seconds • No contact info required
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-2">
            <button
              onClick={() => navigate("/quote")}
              className="w-full sm:w-auto rounded bg-[var(--primary)] py-4.5 px-8 text-center text-sm font-black tracking-widest uppercase text-[var(--primary-foreground)] shadow-lg hover:opacity-90 transition duration-150 cursor-pointer"
            >
              Build My Instant Quote
            </button>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Or</span>
              <a
                href="tel:602-921-5749"
                className="flex items-center gap-2 text-lg font-black text-[var(--primary)] hover:opacity-90 transition"
              >
                📞 602-921-5749
              </a>
            </div>
          </div>
        </div>

        {/* Visual loader Column */}
        <div className="lg:col-span-6 rounded-lg overflow-hidden border border-[var(--border)] shadow-2xl relative">
          <img src={heroImg} alt="Affordable Moving Truck loading" className="w-full object-cover max-h-[460px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071425]/40 to-transparent" />
        </div>
      </section>

      {/* Banner Ribbons Row */}
      <section className="w-full border-y border-[var(--border)] bg-[#0c1f36]/40 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <span className="text-base sm:text-lg font-black text-[var(--primary)] block">💵 Flat Rates</span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase">No surprises at checkout</span>
          </div>
          <div className="space-y-1 border-x border-[var(--border)]">
            <span className="text-base sm:text-lg font-black text-[var(--primary)] block">⏰ On-Time, Every Time</span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase">Phoenix reliability</span>
          </div>
          <div className="space-y-1">
            <span className="text-base sm:text-lg font-black text-[var(--primary)] block">🌵 Phoenix Local</span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase">Locally owned operations</span>
          </div>
        </div>
      </section>

      {/* What we move section */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">What We Move</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Wide Variety of Local Moves
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-6 flex items-start gap-4 hover:border-[var(--primary)]/40 transition duration-200 cursor-pointer"
              onClick={() => navigate("/quote")}
            >
              <div className="size-12 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center shrink-0">
                {svc.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-extrabold text-white tracking-wide">{svc.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <span
            onClick={() => navigate("/quote")}
            className="text-xs font-black text-[var(--primary)] hover:underline cursor-pointer uppercase tracking-widest"
          >
            See All Services →
          </span>
        </div>
      </section>

      {/* Inline banner CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-lg border border-[var(--border)] bg-gradient-to-r from-[#0d1e33] to-[#122c4a] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Instant Quote</span>
            <h3 className="text-2xl font-black text-white uppercase">Get a real price in under a minute.</h3>
            <p className="text-xs text-slate-300">Seven quick questions. No name, phone, or email required.</p>
          </div>
          <button
            onClick={() => navigate("/quote")}
            className="w-full md:w-auto rounded bg-[var(--primary)] py-4 px-8 text-center text-sm font-black tracking-widest uppercase text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Build My Instant Quote
          </button>
        </div>
      </section>

      {/* Why Us section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)] space-y-12">
        <div className="space-y-2 text-center">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Why AAAAAffordable</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Movers You Can <span className="text-[var(--primary)]">Actually</span> Afford.
          </h2>
        </div>

        {/* 6 Grid points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div key={feat.title} className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/20 p-6 space-y-3">
              <span className="text-xs font-black text-[var(--primary)] tracking-widest uppercase block border-b border-[var(--border)] pb-2">
                ✓ {feat.title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6">
          <button
            onClick={() => navigate("/quote")}
            className="w-full sm:w-auto rounded bg-[var(--primary)] py-4 px-8 text-center text-sm font-black tracking-widest uppercase text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Build My Instant Quote
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase">Or</span>
            <a
              href="tel:602-921-5749"
              className="flex items-center gap-2 text-lg font-black text-[var(--primary)] hover:opacity-90 transition"
            >
              📞 602-921-5749
            </a>
          </div>
        </div>
      </section>

      {/* Our Crew Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)] space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Our Crew</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Real Movers. Real Work.
          </h2>
        </div>

        {/* Carousel grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[delivery1, delivery2, delivery3, delivery4, delivery5, delivery6].map((img, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden border border-[var(--border)] h-40 relative group">
              <img src={img} alt={`Crew work ${idx + 1}`} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)] space-y-12">
        <div className="space-y-2 text-center">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Phoenix Families & Pros Trust Us.
          </h2>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.author} className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/40 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex gap-1 text-[var(--primary)] text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-xs italic text-slate-200 leading-relaxed">{rev.text}</p>
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">{rev.author}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">{rev.info}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area Map list */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[var(--border)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Service Area</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Serving the entire Phoenix Metro.
            </h2>
            <p className="text-xs text-slate-400">If you're moving in the Valley of the Sun, we've got you covered.</p>
          </div>

          {/* Badges list */}
          <div className="flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <span
                key={city}
                className="rounded bg-[#0d1e33] border border-[var(--border)] px-4 py-1.5 text-xs font-bold text-slate-200 uppercase"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <div className="lg:col-span-5 rounded-lg bg-[#0d1e33]/50 border border-[var(--border)] p-8 space-y-6 text-center shadow-lg">
          <button
            onClick={() => navigate("/quote")}
            className="w-full rounded bg-[var(--primary)] py-4.5 px-8 text-center text-sm font-black tracking-widest uppercase text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Build My Instant Quote
          </button>
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase">Or</span>
            <a
              href="tel:602-921-5749"
              className="flex items-center gap-2 text-base font-black text-[var(--primary)] hover:opacity-90 transition"
            >
              📞 602-921-5749
            </a>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <footer className="w-full border-t border-[var(--border)] bg-[#071425] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo column */}
          <div className="md:col-span-6 space-y-4">
            <img src={logoImg} alt="AAAAAffordable Moving logo footer" className="h-10 object-contain" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Licensed, insured, and locally operated. Serving homes, apartments, businesses, seniors, and real estate professionals across the Valley.
            </p>
          </div>

          {/* Link directory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-[var(--primary)] tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <li className="cursor-pointer hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/quote")}>Instant Quote</li>
              <li className="cursor-pointer hover:text-white" onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}>Services</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/quote")}>Realtors & Leasing</li>
              <li className="cursor-pointer hover:text-white" onClick={() => window.scrollTo({ top: 1800, behavior: 'smooth' })}>About</li>
              <li className="cursor-pointer hover:text-white" onClick={() => window.scrollTo({ top: 3200, behavior: 'smooth' })}>Contact</li>
            </ul>
          </div>

          {/* Contacts info */}
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

export default Home;
