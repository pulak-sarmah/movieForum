import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const auth = getAuth(app);

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) => {
        console.log(result);
        uploadData();
        navigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function setPhoneNumber(e) {
    const inputValue = e.target.value;
    const numbersOnly = /^[0-9]*$/;
    if (inputValue.match(numbersOnly)) {
      setForm({ ...form, mobile: inputValue });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-8 ">
      {otpSent ? (
        <>
          <div className="w-full p-2 md:w-1/4">
            <div className="relative">
              <label htmlFor="otp" className="text-sm leading-7 text-gray-300">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>
          <button
            onClick={verifyOTP}
            className="flex px-5 py-1 mx-auto mt-4 text-lg text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-400"
          >
            {loading ? (
              <TailSpin height={25} width={50} color="white" />
            ) : (
              "Confirm OTP"
            )}
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold ">Sign up</h1>
          <div className="w-full p-2 md:w-1/4">
            <div className="relative">
              <label htmlFor="name" className="text-sm leading-7 text-gray-300">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="w-full p-2 md:w-1/4">
            <div className="relative">
              <label
                htmlFor="phone"
                className="text-sm leading-7 text-gray-300"
              >
                Mobile No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.mobile}
                onChange={setPhoneNumber}
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="w-full p-2 md:w-1/4">
            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm leading-7 text-gray-300"
              >
                Password
              </label>
              <input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type={"password"}
                id="password"
                name="password"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>
          <button
            onClick={requestOtp}
            className="flex px-5 py-1 mx-auto mt-4 text-lg text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-400"
          >
            {loading ? (
              <TailSpin height={25} width={50} color="white" />
            ) : (
              "Request OTP"
            )}
          </button>
        </>
      )}
      <div className="mt-3">
        Already have an account? {""}
        <Link to={"/login"}>
          <span className="text-blue-500 cursor-pointer hover:text-blue-400">
            Login
          </span>
        </Link>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Signup;
