import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth";
import Loader from "../../Components/Extra Components/Loader";
import axios from 'axios';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const axiosSecure = useAxiosSecure();

const saveUserToDB = async (user) => {
  try {
    await axios.post('http://localhost:3000/users', {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: 'user',
      type: 'normal',
      premiumTaken: null,
    });
  } catch (error) {
    console.error('Error saving user:', error.message);
  }
};

  const checkAndExpirePremium = async (email) => {
  try {
    const userRes = await axios.get(`http://localhost:3000/users/${email}`);
    const premiumTaken = userRes.data.premiumTaken;
    // console.log("Premium Taken:", premiumTaken);
    // console.log("Current Date:", new Date());
    // console.log("Premium Expiry Date:", new Date(premiumTaken));
    // console.log("Is Premium Expired:", new Date() > new Date(premiumTaken));
    if (premiumTaken && new Date() > new Date(premiumTaken)) {
  // Premium expired, update in DB
  await axiosSecure.patch(`/users/premium/${email}`, { 
  premiumTaken: "null",
  type: "normal"
});
}
  } catch (err) {
    console.error("Error checking premium expiry:", err);
  }
};

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      background: "#D0E7F9",
        color: "#0F172A",
        confirmButtonColor: "#38BDF8",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);
    try {
      const result = await signIn(email, password);
      await saveUserToDB(result.user);
      await checkAndExpirePremium(result.user.email);
      showAlert("Welcome Back!", `Logged in as ${result.user.displayName}`, "success");
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      // navigate("/login");
      showAlert("Login Failed", "Wrong Credentials", "error");
      navigate(location.state?.from || "/", { replace: true });
      
      
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      await saveUserToDB(result.user);
      await checkAndExpirePremium(result.user.email);
      showAlert("Welcome!", `Logged in as ${result.user.displayName}`, "success");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      setError(error.message);
      showAlert("Oops!", "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-[85vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-white/60 via-[#0F172A]/20 to-white/60 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        {loading && <Loader />}
      <motion.form
        onSubmit={handleLogin}
        className="bg-white dark:bg-[#1E293B] shadow-xl rounded-2xl w-full max-w-md p-8 space-y-5"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Floating Squares */}
      <div className="absolute top-30 left-10 w-16 h-16 bg-[#38BDF8]/20 dark:bg-[#38BDF8]/20 rounded-lg animate-pulse"></div>
      <div className="absolute top-30 right-10 w-16 h-16 bg-[#38BDF8]/20 dark:bg-[#38BDF8]/20 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-[#38BDF8]/20 dark:bg-[#38BDF8]/10 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-[#38BDF8]/20 dark:bg-[#38BDF8]/10 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 lg:w-12 lg:h-12 bg-[#38BDF8]/30 dark:bg-[#38BDF8]/30 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 lg:w-12 lg:h-12 bg-[#38BDF8]/30 dark:bg-[#38BDF8]/30 rounded-lg animate-pulse"></div>

        <h2 className="text-2xl font-semibold text-center flex flex-col items-center justify-center gap-2 justify center text-slate-800 dark:text-white">
          Login to {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 ciga tracking-wide text-[#0F172A] dark:text-[#38BDF8] transition"
      >
        <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#38BDF8] flex gap-2 items-center">
          <span className="text-lg">The</span> <span>Daily<span className="text-[#38BDF8] dark:text-white">Commit</span></span>
        </span>
      </Link>
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="text-sm text-slate-600 dark:text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600 dark:text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#38BDF8] hover:bg-[#0ea5e9] text-white p-2 rounded-md transition"
        >
          Login
        </button>

        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          Don’t have an account? <Link to="/register" className="text-[#38BDF8] font-medium">Register</Link>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <span className="h-px w-1/3 bg-slate-300"></span>
          <span className="text-sm text-slate-500">or</span>
          <span className="h-px w-1/3 bg-slate-300"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border p-2 rounded-md text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Login;
