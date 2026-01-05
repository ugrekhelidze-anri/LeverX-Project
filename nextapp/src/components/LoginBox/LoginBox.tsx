"use client";

import { FormEvent, useState } from "react";
import eyeIconHidden from "../../../public/assets/eye-slash.png";
import eyeIconVisible from "../../../public/assets/eye.png";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../hooks/useUserContext";
import { useLoginUser } from "../../utils/loginUser";
import styles from "@/app/auth/page.module.scss";

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

  const router = useRouter();
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
      router.push("/");
    } else {
      // Show error if invalid credentials
      setError(response.error!);
    }
  };

  return (
    <main className={styles["signin"]}>
      <div className={styles["signin__card"]}>
        <h1 className={styles["signin__title"]}>Sign In</h1>
        <p className={styles["signin__subtitle"]}>
          Sign in your LeverX employee services account.
        </p>

        <form className={styles["signin__form"]} onSubmit={handleSubmit}>
          <div className={styles["signin__field"]}>
            <label className={styles["signin__label"]}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles["signin__input"]}
              placeholder="john.doe@leverx.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className={styles["signin__field"]}>
            <label className={styles["signin__label"]}>Password</label>
            <div className={styles["password-input"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={styles["signin__input"]}
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={togglePassword}
              >
                <img
                  src={eyeIconHidden.src}
                  alt="hide password"
                  className={`${styles["password-toggle__icon"]} ${
                    styles["password-toggle__icon--hidden"]
                  } ${showPassword ? "" : styles["is-active"]}`}
                />
                <img
                  src={eyeIconVisible.src}
                  alt="show password"
                  className={`${styles["password-toggle__icon"]} ${
                    styles["password-toggle__icon--visible"]
                  } ${showPassword ? styles["is-active"] : ""}`}
                />
              </button>
            </div>
          </div>

          <div className={styles["signin__checkbox"]}>
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
            className={styles["switch-page"]}
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Dont have an account? Sign up
          </a>

          <button
            type="submit"
            className={styles["signin__submit"]}
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOG IN"}
          </button>

          <h1 className={styles["error-message"]}>{error}</h1>
        </form>
      </div>
    </main>
  );
};
