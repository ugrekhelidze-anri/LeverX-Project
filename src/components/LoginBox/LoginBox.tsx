import { FormEvent, useState } from "react";
import eyeIconHidden from "../../../public/assets/eye-slash.png";
import eyeIconVisible from "../../../public/assets/eye.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { useLoginUser } from "../../utils/loginUser";

type TLoginBoxProps = {
  setIsLogin: (condition: boolean) => void;
};

export const LoginBox = ({ setIsLogin }: TLoginBoxProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useUserContext();
  const loginUser = useLoginUser();
  const togglePassword = () => setShowPassword((prev) => !prev);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if missing fields show error
    if (!email.trim() || !password.trim()) {
      setError("Missing fields!");
      return;
    }
    
    setIsLoading(true);
    // make a call to our loginUser module
    const response = await loginUser(email, password, stayLoggedIn);
    setIsLoading(false);
    
    if (response.success) {
      // refresh context before navigation so header has the user immediately
      await refreshUser();
      navigate("/");
    } else {
      // Show error if invalid credentials
      setError(response.error!);
    }
  };

  return (
    <main className="signin">
      <div className="signin__card">
        <h1 className="signin__title">Sign In</h1>
        <p className="signin__subtitle">
          Sign in your LeverX employee services account.
        </p>
        <form className="signin__form" onSubmit={handleSubmit}>
          <div className="signin__field">
            <label className="signin__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="signin__input"
              placeholder="john.doe@leverx.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="signin__field">
            <label className="signin__label">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="signin__input"
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePassword}
              >
                <img
                  src={eyeIconHidden}
                  alt="hide password"
                  className={`password-toggle__icon password-toggle__icon--hidden ${
                    showPassword ? "" : "is-active"
                  }`}
                />
                <img
                  src={eyeIconVisible}
                  alt="show password"
                  className={`password-toggle__icon password-toggle__icon--visible ${
                    showPassword ? "is-active" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="signin__checkbox">
            <input
              type="checkbox"
              id="keepLoggedIn"
              checked={stayLoggedIn}
              onChange={(e) => {
                setStayLoggedIn(e.target.checked);
              }}
            />
            <p>Keep me logged in</p>
          </div>
          <a
            className="switch-page"
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Dont have an account? Sign up
          </a>
          <button type="submit" className="signin__submit" disabled={isLoading}>
            {isLoading ? "LOGGING IN..." : "LOG IN"}
          </button>
          <h1 className="error-message">{error}</h1>
        </form>
      </div>
    </main>
  );
};
