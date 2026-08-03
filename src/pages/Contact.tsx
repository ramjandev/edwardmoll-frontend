import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logoImg from "../assets/images/logo.png";
import { toast } from "react-toastify";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required." }),
  phone: z.string().trim().min(10, { message: "Phone number is required." }),
  email: z.string().trim().email({ message: "Valid email is required." }),
  message: z.string().trim().min(5, { message: "Tell us about your move." }),
});

type ContactFields = z.infer<typeof contactSchema>;

const Contact = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmitMessage = (data: ContactFields) => {
    toast.success(`Message sent successfully! Thank you, ${data.name}.`);
    reset();
  };

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
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/about")}>About</span>
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">Contact</span>
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
        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Contact</span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
          Let's Talk About Your <span className="text-[var(--primary)]">Move.</span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Call, email, or send us the details – a moving specialist responds within one business hour.
        </p>
      </section>

      {/* Contact Content Area */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 flex items-center gap-4">
              <span className="size-10 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                📞
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Call Us</span>
                <a href="tel:602-921-5749" className="text-sm font-black text-[var(--primary)] hover:opacity-90 transition">
                  602-921-5749
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 flex items-center gap-4">
              <span className="size-10 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                ✉
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Email</span>
                <a href="mailto:Aaaaaffordablemovingsvcs@gmail.com" className="text-xs font-semibold text-slate-200 hover:text-white transition">
                  Aaaaaffordablemovingsvcs@gmail.com
                </a>
              </div>
            </div>

            {/* Service Area */}
            <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 flex items-center gap-4">
              <span className="size-10 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                📍
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Service Area</span>
                <span className="text-xs font-semibold text-slate-200">
                  Phoenix, AZ - Entire Valley
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 flex items-center gap-4">
              <span className="size-10 rounded bg-[var(--primary)]/10 border border-[var(--border)] flex items-center justify-center text-lg">
                🕒
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Hours</span>
                <span className="text-xs font-semibold text-slate-200">
                  Mon-Sat • 7am to 7pm
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 rounded-lg border border-[var(--border)] bg-[#0c1f36]/40 p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-base font-black uppercase text-white tracking-wide">Send Us A Message</h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                Prefer an instant price?{" "}
                <span onClick={() => navigate("/quote")} className="text-[var(--primary)] hover:underline cursor-pointer">
                  Skip this and build your quote.
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmitMessage)} className="space-y-4">
              {/* Name & Phone side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                  <input
                    type="text"
                    placeholder="Edward Moll"
                    {...register("name")}
                    className={`w-full rounded border bg-[#071425] p-2.5 text-xs text-white focus:outline-none focus:border-[var(--primary)] ${
                      errors.name ? "border-red-500" : "border-[var(--border)]"
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-400 font-medium">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                  <input
                    type="tel"
                    placeholder="(602) 555-0199"
                    {...register("phone")}
                    className={`w-full rounded border bg-[#071425] p-2.5 text-xs text-white focus:outline-none focus:border-[var(--primary)] ${
                      errors.phone ? "border-red-500" : "border-[var(--border)]"
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-400 font-medium">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                <input
                  type="email"
                  placeholder="edward@example.com"
                  {...register("email")}
                  className={`w-full rounded border bg-[#071425] p-2.5 text-xs text-white focus:outline-none focus:border-[var(--primary)] ${
                    errors.email ? "border-red-500" : "border-[var(--border)]"
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-400 font-medium">{errors.email.message}</p>}
              </div>

              {/* Tell us about your move */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tell us about your move</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you are moving, stairs details, packing needs, etc..."
                  {...register("message")}
                  className={`w-full rounded border bg-[#071425] p-2.5 text-xs text-white focus:outline-none focus:border-[var(--primary)] resize-none ${
                    errors.message ? "border-red-500" : "border-[var(--border)]"
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-400 font-medium">{errors.message.message}</p>}
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded bg-[var(--primary)] py-3 px-4 text-center text-xs font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Send message
                </button>
              </div>
            </form>
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
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/contact")}>Contact</li>
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

export default Contact;
