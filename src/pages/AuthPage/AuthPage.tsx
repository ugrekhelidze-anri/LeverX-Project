import { useState } from "react";
import "./AuthPage.scss";
import { LoginBox } from "../../components/LoginBox/LoginBox";
import { RegisterBox } from "../../components/RegisterBox/RegisterBox";
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <p className="app-header__brand-label">LeverX</p>
          <h1 className="app-header__brand-title">EMPLOYEE SERVICES</h1>
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
