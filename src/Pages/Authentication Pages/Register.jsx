import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = {
      length: /.{6,}/,
      capital: /[A-Z]/,
      special: /[!@#$%^&*(),.?":{}|<>]/,
      number: /[0-9]/,
    };

    if (!passwordRegex.length.test(password)) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!passwordRegex.capital.test(password)) {
      return setError("Password must include at least one uppercase letter.");
    }
    if (!passwordRegex.special.test(password)) {
      return setError("Password must include at least one special character.");
    }
    if (!passwordRegex.number.test(password)) {
      return setError("Password must include at least one number.");
    }

    try {
      const res = await createUser(email, password);
      await updateUser(name, photoURL);
      setUser({ ...res.user, displayName: name, photoURL });
      showAlert(`Welcome to the DailyCommit ${name}`, "success");
      navigate("/");
    } catch (err) {
      showAlert("Registration Failed", err.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      showAlert(`Welcome to the DailyCommit ${name}`, "success");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="min-h-[85vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-white/60 via-[#0F172A]/20 to-white/60 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleRegister}
        className="bg-white dark:bg-[#1E293B] shadow-xl rounded-2xl w-full max-w-md p-8 space-y-3"
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

        <h2 className="text-2xl font-semibold text-center flex flex-col items-center justify-center gap-2 text-slate-800 dark:text-white">
          Sign up for
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-1 ciga tracking-wide text-[#0F172A] dark:text-[#38BDF8] transition"
          >
            <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#38BDF8] flex gap-2 items-center">
              <span className="text-lg">The</span> <span>Daily<span className="text-[#38BDF8] dark:text-white">Commit</span></span>
            </span>
          </Link>
        </h2>


        <div>
          <label className="text-sm text-slate-600 dark:text-slate-300">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-1 p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600 dark:text-slate-300">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            required
            className="w-full mt-1 p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

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
          Register
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account? <Link to="/login" className="text-[#38BDF8] font-medium">Login</Link>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <span className="h-px w-1/3 bg-slate-300"></span>
          <span className="text-sm text-slate-500">or</span>
          <span className="h-px w-1/3 bg-slate-300"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 border p-2 rounded-md text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <FcGoogle className="text-xl" /> Sign up with Google
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
