import { FormEvent, useState } from "react";
import eyeIconHidden from "../../../public/assets/eye-slash.png";
import eyeIconVisible from "../../../public/assets/eye.png";
import { useSignUpUser } from "../../utils/signUpUser";

type TRegisterBoxProps = {
  setIsLogin: (condition: boolean) => void;
};

export const RegisterBox = ({ setIsLogin }: TRegisterBoxProps) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const signUpUser = useSignUpUser();
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // passwords dont match throw error
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // throw error if missing fields
    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      setError("Missing fields");
      return;
    }

    // disable button after first submit
    setIsButtonEnabled(true);
    setError(""); // clear previous errors

    // send an auth request
    const data = await signUpUser({ first_name, last_name, email, password });
    // if everything went well redirect user to login page
    if (data.success) {
      setIsLogin(true);
    } else {
      setError(data.error || "Something went wrong"); // show backend error
    }

    // enable button after it runs and returns
    setIsButtonEnabled(false);
  };

  return (
    <main className="signup">
      <div className="signup__card">
        <h1 className="signup__title">Sign Up</h1>
        <p className="signup__subtitle">
          Sign Up to access your LeverX employee services account.
        </p>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__field">
            <label className="signup__label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="signup__input"
              placeholder="Enter your name "
              required
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="signup__field">
            <label className="signup__label">Last name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="signup__input"
              placeholder="Enter your last name"
              required
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="signup__field">
            <label className="signup__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="signup__input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signup__field">
            <label className="signup__label">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="signup__input"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePassword}
              >
                <img
                  src={eyeIconVisible}
                  alt="hide password"
                  className={`password-toggle__icon password-toggle__icon--hidden ${
                    showPassword ? "" : "is-active"
                  }`}
                />
                <img
                  src={eyeIconHidden}
                  alt="show password"
                  className={`password-toggle__icon password-toggle__icon--visible ${
                    showPassword ? "is-active" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="signup__field">
            <label className="signup__label">Confirm password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="signup__input"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <a
            className="switch-page"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Already have an account? Sign in
          </a>
          <button
            type="submit"
            className="signup__submit"
            disabled={isButtonEnabled}
          >
            SIGN UP
          </button>
          <h1 className="error-message">{error}</h1>
        </form>
      </div>
    </main>
  );
};
