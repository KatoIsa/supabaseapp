import { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css"; // Importing the CSS file for styling

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "";
    if (!password) newErrors.password = "";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <div className="login-form">
      <h2 className="login-form__title">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={`login-form__input ${
              errors.email ? "login-form__input--error" : ""
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && (
            <span className="login-form__error">{errors.email}</span>
          )}
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={`login-form__input ${
              errors.password ? "login-form__input--error" : ""
            }`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && (
            <span className="login-form__error">{errors.password}</span>
          )}
        </div>
        <div className="login-form__group">
          <button type="submit" className="login-form__button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
