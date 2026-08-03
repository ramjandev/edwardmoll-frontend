import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "APARTMENT MOVING",
      desc: "Studios, walk-ups, and high-rises across the Valley. We coordinate elevator reservations, loading docks, and building rules so move day stays on schedule.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        </svg>
      ),
    },
    {
      title: "RESIDENTIAL MOVING",
      desc: "From condos to full single-family homes. Careful pad-wrapping, disassembly and reassembly, and a flat rate quoted before we start.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      title: "SENIOR MOVES",
      desc: "Patient, respectful help with downsizing, unpacking, and setting up a new home. We work at your pace and treat every item with care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
    {
      title: "STORAGE MOVES",
      desc: "Into a unit, out of a unit, or between two units. Skip the hourly rental – we bring the truck, muscle, and materials.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
    },
    {
      title: "LOADING & UNLOADING",
      desc: "Renting your own truck or shipping container? Our crew loads it tight and safe, or unloads at your destination.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M3.75 14.25h16.5M3.75 14.25V5.625c0-.621.504-1.125 1.125-1.125H16.5c.621 0 1.125.504 1.125 1.125v1.875m-17.25 6H16.5m0-6V9.75m0 0h3.75" />
        </svg>
      ),
    },
    {
      title: "FURNITURE RELOCATION",
      desc: "Rearranging a room, moving a few big pieces across town, or picking up a marketplace find. In and out, same day.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[var(--primary)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.162-.327.5-.533.868-.533.367 0 .706.206.868.533l2.89 5.867 6.476.942c.36.052.66.295.785.633.124.337.039.713-.22 1.018l-4.687 4.567 1.107 6.45c.061.359-.088.718-.386.936-.297.217-.698.248-1.026.08L12 17.25l-5.794 3.045c-.328.168-.729.137-1.026-.08-.298-.218-.447-.577-.386-.936l1.1-6.45-4.686-4.567c-.26-.305-.344-.681-.22-1.018.125-.338.424-.581.785-.633l6.477-.942 2.89-5.867Z" />
        </svg>
      ),
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
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">Services</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</span>
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
        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Services</span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
          Every Phoenix Move, <br />
          <span className="text-[var(--primary)]">Done Right.</span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Full-service local moving with honest flat rates. Pick your move type below – or skip ahead and build a quote.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate("/quote")}
            className="w-full sm:w-auto rounded bg-[var(--primary)] py-3 px-8 text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Build My Instant Quote
          </button>
          <a
            href="tel:602-921-5749"
            className="w-full sm:w-auto rounded border border-[var(--primary)] py-3 px-8 text-center text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
          >
            📞 Call 602-921-5749
          </a>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-6 flex flex-col justify-between space-y-6 hover:border-[var(--primary)]/30 transition duration-200 cursor-pointer"
              onClick={() => navigate("/quote")}
            >
              <div className="space-y-4">
                <div className="size-12 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                  {svc.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">{svc.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Quote Panel */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-center border-t border-[var(--border)] pt-16 space-y-6">
        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Ready When You Are</span>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
          See Your Flat Rate Now.
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Answer 7 quick questions to get an instant estimate. No contact info required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate("/quote")}
            className="w-full sm:w-auto rounded bg-[var(--primary)] py-3 px-8 text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
          >
            Build My Instant Quote
          </button>
          <a
            href="tel:602-921-5749"
            className="w-full sm:w-auto rounded border border-[var(--primary)] py-3 px-8 text-center text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
          >
            📞 Call 602-921-5749
          </a>
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

export default ServicesPage;
