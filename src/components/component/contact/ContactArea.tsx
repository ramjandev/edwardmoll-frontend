import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required." }),
  phone: z.string().trim().min(10, { message: "Phone number is required." }),
  email: z.string().trim().email({ message: "Valid email is required." }),
  message: z.string().trim().min(5, { message: "Tell us about your move." }),
});

type ContactFields = z.infer<typeof contactSchema>;

import CommonButton from "@/components/shared/button/CommonButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { inputClass } from "../quote/steps/Step9BookingForm";

const contactInfo = [
  {
    label: "Call Us",
    value: "602-921-5749",
    icon: Phone,
    href: "tel:602-921-5749",
    valueClassName:
      "text-sm font-black text-yellow hover:opacity-90 transition",
  },
  {
    label: "Email",
    value: "Aaaaaffordablemovingsvcs@gmail.com",
    icon: Mail,
    href: "mailto:Aaaaaffordablemovingsvcs@gmail.com",
    valueClassName:
      "text-xs font-semibold text-slate-200 hover:text-white transition",
  },
  {
    label: "Service Area",
    value: "Phoenix, AZ - Entire Valley",
    icon: MapPin,
    valueClassName: "text-xs font-semibold text-slate-200",
  },
  {
    label: "Hours",
    value: "Mon-Sat • 7am to 7pm",
    icon: Clock3,
    valueClassName: "text-xs font-semibold text-slate-200",
  },
];
const ContactArea = () => {
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
    reset();
  };
  return (
    <section className="">
      <CommonSpace style="bottom">
        <CommonWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 ">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-lg border border-yellow/30 hover:border-yellow bg-[#0d1e33]/50 p-5 group"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded  bg-yellow/10  transition-all duration-300 group-hover:bg-yellow">
                      <Icon
                        size={18}
                        className="text-yellow group-hover:text-black "
                      />
                    </span>

                    <div className="space-y-1">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-offYellow">
                        {item.label}
                      </span>

                      {item.href ? (
                        <a href={item.href} className={item.valueClassName}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={item.valueClassName}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" rounded-lg border border-yellow/30 bg-[#0c1f36]/40 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black uppercase text-white tracking-wide">
                  Send Us A Message
                </h3>
                <p className="text-base text-offYellow font-medium mt-1">
                  Prefer an instant price? Skip this and{" "}
                  <span
                    onClick={() => navigate("/quote")}
                    className="text-yellow hover:underline cursor-pointer"
                  >
                    build your quote.
                  </span>
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitMessage)}
                className="space-y-4"
              >
                {/* Name & Phone side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={inputClass.label}>Name</label>
                    <input
                      type="text"
                      placeholder="Edward Moll"
                      {...register("name")}
                      className={inputClass.input}
                    />
                    {errors.name && (
                      <p className={inputClass.error}>{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className={inputClass.label}>Phone</label>
                    <input
                      type="tel"
                      placeholder="(602) 555-0199"
                      {...register("phone")}
                      className={inputClass.input}
                    />
                    {errors.phone && (
                      <p className={inputClass.error}>{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={inputClass.label}>Email</label>
                  <input
                    type="email"
                    placeholder="edward@example.com"
                    {...register("email")}
                    className={inputClass.input}
                  />
                  {errors.email && (
                    <p className={inputClass.error}>{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className={inputClass.label}>
                    Tell us about your move
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are moving, stairs details, packing needs, etc..."
                    {...register("message")}
                    className={inputClass.input}
                  />
                  {errors.message && (
                    <p className={inputClass.error}>{errors.message.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <CommonButton size="xl" type="submit" className="w-full!">
                    Send message
                  </CommonButton>
                </div>
              </form>
            </div>
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default ContactArea;
