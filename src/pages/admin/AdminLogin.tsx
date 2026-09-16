import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/Auth/authApi";
import { setUser, addCurrentUser } from "../../store/Auth/authSlice";
import CommonButton from "../../components/shared/button/CommonButton";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await login({ email, password }).unwrap();
      const token = res?.accessToken || res?.data?.accessToken;
      const user = res?.user || res?.data?.user;

      if (token) {
        dispatch(setUser(token));
        if (user) dispatch(addCurrentUser(user));
        toast.success("Welcome back!");
        navigate("/admin");
      } else {
        toast.error("Invalid server response. Token missing.");
      }
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#071425] flex items-center justify-center p-4">
      <div className="bg-[#0d1e33] p-8 rounded-xl border border-border w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-barlow text-white uppercase tracking-wider">
            Admin Login
          </h1>
          <p className="text-offYellow mt-2">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-offYellow">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-offYellow">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-[#071425] border border-yellow/20 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all"
              placeholder="••••••••"
            />
          </div>

          <CommonButton
            type="submit"
            className="w-full justify-center"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
