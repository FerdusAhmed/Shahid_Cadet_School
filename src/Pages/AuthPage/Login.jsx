import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from 'react-toastify';
import SocialLogin from "../../components/Shared/SocialLogin";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../auth/authInit';


const Login = () => {
  const { register, handleSubmit,getValues, formState: {errors} } = useForm();
  const { loginUser,userPassRest } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async userInfo => {
     setLoading(true);
    if (!userInfo?.email) {
      toast.error('Please enter a valid email');
      return;
    }

    const docRef = doc(db, 'users', userInfo.email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      toast.info('User not found');
      setLoading(false)
      return;
    }

    const userData = docSnap.data();

    if (userData.lockUntil && Date.now() < userData.lockUntil) {
      toast.info('Account is locked. Try again later ❌');
      setLoading(false)
      return;
    }

    try {
     

      // ✅ login try
      await loginUser(userInfo.email, userInfo.password);

      // ✅ success  then reset
      await updateDoc(docRef, {
        wrongAttempts: 0,
        lockUntil: null,
      });

      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);

      const freshSnap = await getDoc(docRef);
      const freshData = freshSnap.data();

      const attempts = (freshData.wrongAttempts || 0) + 1;

      if (attempts >= 3) {
        await updateDoc(docRef, {
          wrongAttempts: 0,
          lockUntil: Date.now() + 30 * 1000, // 30 sec
        });

        toast.info('Account locked for 30 seconds 🔒');
      } else {
        await updateDoc(docRef, {
          wrongAttempts: attempts,
        });

        toast.info(`Wrong attempts: ${attempts}`);
      }
    } finally {
      setLoading(false);
    }
  };

   const handleForgetPassword = () => {
     const email = getValues("email");
      userPassRest(email)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success("Check your email to reset password");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    };


  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h3 className="text-3xl font-black tracking-tight mb-2">
            Nexus-School
          </h3>
          <p className="text-blue-50 opacity-90 font-medium">
            Login to your School
          </p>
        </div>

        <div className="card-body p-8 pt-6">
          <form  onSubmit={handleSubmit(handleLogin)} className="space-y-4">
           
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`input input-bordered focus:input-primary w-full `} //${errors.email ? "input-error" : ""}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={`input input-bordered focus:input-primary w-full`}
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* create by saleh-ahmad */}
            <div>
              <button onClick={handleForgetPassword} type='button' className="link link-hover">Forget password?</button>
            </div>
            {/* Login Button */}
            <button className={`${loading ? 'opacity-80' : ''} btn btn-primary btn-block text-white font-bold mt-2 `}>
              {loading ? "Logging in..." : " Sign In"}
            </button>
          </form>
        </div>
        {/* Social Login */}
        <SocialLogin></SocialLogin>

        <p className="text-center text-sm mt-4 pb-3">
          New to <span className="font-semibold">Nexus-School? </span>
          <Link
            state={location.state}
            className="text-primary font-bold hover:underline"
            to="/register"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
