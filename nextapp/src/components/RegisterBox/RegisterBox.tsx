"use client";

import { FormEvent, useState } from "react";
import eyeIconHidden from "../../../public/assets/eye-slash.png";
import eyeIconVisible from "../../../public/assets/eye.png";
import { useSignUpUser } from "../../utils/signUpUser";
import styles from "@/app/(public)/auth/page.module.scss";

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
    <main className={styles["signup"]}>
      <div className={styles["signup__card"]}>
        <h1 className={styles["signup__title"]}>Sign Up</h1>
        <p className={styles["signup__subtitle"]}>
          Sign Up to access your LeverX employee services account.
        </p>

        <form className={styles["signup__form"]} onSubmit={handleSubmit}>
          <div className={styles["signup__field"]}>
            <label className={styles["signup__label"]}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles["signup__input"]}
              placeholder="Enter your name "
              required
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className={styles["signup__field"]}>
            <label className={styles["signup__label"]}>Last name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className={styles["signup__input"]}
              placeholder="Enter your last name"
              required
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className={styles["signup__field"]}>
            <label className={styles["signup__label"]}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles["signup__input"]}
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className={styles["signup__field"]}>
            <label className={styles["signup__label"]}>Password</label>
            <div className={styles["password-input"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={styles["signup__input"]}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={togglePassword}
              >
                <img
                  src={eyeIconVisible.src}
                  alt="hide password"
                  className={`${styles["password-toggle__icon"]} ${
                    styles["password-toggle__icon--hidden"]
                  } ${showPassword ? "" : styles["is-active"]}`}
                />
                <img
                  src={eyeIconHidden.src}
                  alt="show password"
                  className={`${styles["password-toggle__icon"]} ${
                    styles["password-toggle__icon--visible"]
                  } ${showPassword ? styles["is-active"] : ""}`}
                />
              </button>
            </div>
          </div>

          <div className={styles["signup__field"]}>
            <label className={styles["signup__label"]}>Confirm password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className={styles["signup__input"]}
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <a
            className={styles["switch-page"]}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Already have an account? Sign in
          </a>

          <button
            type="submit"
            className={styles["signup__submit"]}
            disabled={isButtonEnabled}
          >
            SIGN UP
          </button>

          <h1 className={styles["error-message"]}>{error}</h1>
        </form>
      </div>
    </main>
  );
};
