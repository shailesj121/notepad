import { useEffect, useState } from "react";
import { login } from "../services/signup";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie"

export default function Login() {
  const navigate = useNavigate();

  const [uservalidation, setUservalidation] = useState("");
  const [loading, setloading] = useState(false)

  useEffect(() => {
    {
      setUservalidation("");
    }
  }, []);
  const userlogin = async (event) => {
    event.preventDefault()
    setloading(true)
    const [username, password] = event.target
    const userfieldsvalue = {
      username: username.value,
      password: password.value,
    };
    const result = await login("/login", userfieldsvalue);
    // console.log(result)
    const {token} = result.data
    

    if (result.data.message === "username") {
      setUservalidation({ username: "username incorrect" });
      return;
    }
    if (result.data.message === "password") {
      setUservalidation({ password: "password incorrect" });
      return;
    }

    const cookies = new Cookies(null, { path: '/' });
    cookies.set("Refresh_token", token)
    navigate("/")
  };
  return (
    <>

      <div className="min-h-screen flex items-center relative justify-center w-full">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome Back!
          </h1>
          <form onSubmit={(event) => userlogin(event)} >
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Username"
                required
              />
              <p>{uservalidation.username ? "Username Incorrect" : null}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
              <a
                href="#"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                  checked
                />
                <label
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link to="/signup">
                Create Account
                </Link>
              </a>
            </div>
            {loading? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#5994C9" stroke="#5994C9" stroke-width="7" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#5994C9" stroke="#5994C9" stroke-width="7" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#5994C9" stroke="#5994C9" stroke-width="7" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg> 
            :<button  type="submit"  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
}
          </form>
        </div>
      </div>
    </>
  );
}
