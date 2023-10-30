import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { AppState } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const useAppstate = useContext(AppState);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);

          Swal.fire({
            title: "Logged In",
            icon: "success",
            timer: 3000,
          });
          navigate("/");
        } else {
          Swal.fire({
            title: "Invalid Credentials",
            icon: "error",
            timer: 3000,
          });
        }
      });
    } catch (err) {
      Swal.fire({
        title: "something went wrong",
        icon: "error",
        timer: 3000,
      });
    }
    setLoading(false);
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
      <h1 className="text-2xl font-bold ">Login</h1>

      <div className="w-full p-2 md:w-1/4">
        <div className="relative">
          <label htmlFor="phone" className="text-sm leading-7 text-gray-300">
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
          <label htmlFor="password" className="text-sm leading-7 text-gray-300">
            Password
          </label>
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none bg-grey-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </div>
      <button
        onClick={login}
        className="flex px-5 py-1 mx-auto mt-4 text-lg text-white bg-orange-500 border-0 rounded focus:outline-none hover:bg-orange-400"
      >
        {loading ? <TailSpin height={25} width={50} color="white" /> : "Login"}
      </button>
      <div className="mt-3">
        Do not have an account?
        <Link to={"/signup"}>
          <span className="text-blue-500 cursor-pointer hover:text-blue-400">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
