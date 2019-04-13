import React from "react";
import "styles/pageLayoutPlaceholder";

const SignUpPlaceholder = () => (
  <div className="pageLayout">
    <header className="mainHeader">
      <nav className="mainHeader__nav">
        <a className="mainHeader__logo" rel="home" href="/">
          E.asdasd
        </a>
        <ul className="mainHeader__nav__menu hideOnMobile">
          <li className="mainHeader__nav__link-container">
            <a className="mainHeader__nav__link" href="/login">
              Already have an account?<em> Sign in</em>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <section className="pageLayout__banner">
        <blockquote>
          <p>{"“Great,kid. Don't get cocky.”"}</p>
          <hr />
          <footer>
            <cite>Han Solo</cite>
          </footer>
        </blockquote>
      </section>
      <section className="pageLayout__content">
        <div className="login__form-wrapper">
          <form noValidate="" className="form-component ">
            <legend>Get started absolutely free</legend>
            <sub>Enter your details below</sub>
            <p>
              <span className="form-component__annot" />
              <input
                type="text"
                placeholder="First name"
                className="form-component__input "
                name="firstName"
                value=""
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="text"
                placeholder="Last name"
                className="form-component__input "
                name="lastName"
                value=""
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="email"
                placeholder="Email"
                className="form-component__input "
                name="email"
                value=""
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="password"
                placeholder="Password"
                className="form-component__input "
                name="password"
                value=""
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="password"
                placeholder="Repeat password"
                className="form-component__input "
                name="repeatPassword"
                value=""
              />
              <span className="form-component__input-error" />
            </p>
            <a
              className="form-component__bottomLink"
              escape="false"
              href="/login"
            >
              Already have an account ?<em> sign in</em>
            </a>
            <button className="form-component__submit" type="submit">
              {" "}
              Sign up
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
);
export default SignUpPlaceholder;
