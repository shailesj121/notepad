import { login } from "../services/signup";

export default function Login() {

  const userlogin = async(event) => {
    event.preventDefault();
    const [username, password] = event.target
    const userfieldsvalue = {
        username: username.value,
        password: password.value
    }
    const userLoggedIn = login("/login", userfieldsvalue)
    console.log(userLoggedIn)

  };
  return (
    <>
      <div className="relative">
        <form onSubmit={(event) => userlogin(event)} action="">
          <input
            type="text"
            name="username"
            required
            placeholder="Your Username"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Your Password"
          />
          <button type="submit" >Login</button>
        </form>
      </div>
    </>
  );
}
