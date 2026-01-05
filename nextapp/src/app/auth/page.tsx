"use client";

import { useState } from "react";
import headerStyles from "@/components/Header/Header.module.scss";
import { LoginBox } from "@/components/LoginBox/LoginBox";
import { RegisterBox } from "@/components/RegisterBox/RegisterBox";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={headerStyles["app"]}>
      <header className={headerStyles["app-header"]}>
        <div className={headerStyles["app-header__brand"]}>
          <p className={headerStyles["app-header__brand-label"]}>LeverX</p>
          <h1 className={headerStyles["app-header__brand-title"]}>
            EMPLOYEE SERVICES
          </h1>
        </div>
      </header>
      {
        // by default should be login active
        isLogin ? (
          <LoginBox setIsLogin={setIsLogin} />
        ) : (
          <RegisterBox setIsLogin={setIsLogin} />
        )
      }
    </div>
  );
};

export default AuthPage;
