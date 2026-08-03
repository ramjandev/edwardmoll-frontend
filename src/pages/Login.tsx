import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/Auth/authApi";
import { setUser } from "../store/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logoImg from "../assets/images/logo.png";

// Declare Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address (e.g. admin@gmail.com)." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type LoginFields = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "Admin@1234",
    },
  });

  const onSubmit = async (data: LoginFields) => {
    setErrorMessage("");
    try {
      const res = await login(data).unwrap();
      if (res?.data?.accessToken) {
        dispatch(setUser(res.data.accessToken));
        navigate("/admin");
      }
    } catch (err: any) {
      setErrorMessage(
        err.data?.message || err.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-12 font-sans">
      <div className="w-full max-w-md space-y-8 bg-[#0c1f36]/60 backdrop-blur border border-[var(--border)] rounded-lg p-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img src={logoImg} alt="Phoenix Moving Logo" className="h-14 mx-auto object-contain" />
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">
            Phoenix Admin
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to access your bookings management dashboard.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && (
            <div className="text-xs text-red-400 bg-red-950/40 border border-red-800 rounded p-2.5">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)] ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-[var(--border)]"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] font-medium text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--primary)] ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-[var(--border)]"
                }`}
              />
              {errors.password && (
                <p className="text-[11px] font-medium text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Autocomplete notice */}
          <div className="rounded border border-amber-900 bg-amber-950/20 p-3 text-xs text-amber-400">
            🔑 **Developer Notice**: The form is pre-filled with the default admin account seeded during database setup.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-[var(--primary)] py-2.5 px-4 text-center text-sm font-semibold text-[var(--primary-foreground)] shadow transition hover:opacity-95 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            ← Back to Customer Quote Wizard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
