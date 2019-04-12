import React from "react";

const SignUpPlaceholder = () => (
  <div className="landing wrapper">
    <header className="mainHeader">
      <nav className="mainHeader__nav">
        <a className="mainHeader__logo" rel="home" href="/">
          E.
        </a>
        <ul className="hideLink mainHeader__nav__link-container">
          <li className="mainHeader__nav--link">
            <a href="/login">
              Dont have an account?<span> Sign up</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <section className="landing__banner">
        <blockquote>
          <p>{"“Great,kid. Don't get cocky.”"}</p>
          <hr />
          <footer>
            <cite>Han Solo</cite>
          </footer>
        </blockquote>
      </section>
      <section className="landing__content">
        <div className="login__form-wrapper">
          <form noValidate="" className="form-component error">
            <legend>Get started absolutely free</legend>
            <p className="form-component__apiError">Validation</p>
            <p>
              <span className="form-component__annot" />
              <input
                type="text"
                placeholder="First name"
                className="form-component__input error"
                name="firstName"
                value=""
              />
              <span className="form-component__input-error">
                First name cannot be empty
              </span>
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="text"
                placeholder="Last name"
                className="form-component__input error"
                name="lastName"
                value=""
              />
              <span className="form-component__input-error">
                Last name cannot be empty
              </span>
            </p>
            <p>
              <span className="form-component__annot">Email</span>
              <input
                type="email"
                placeholder="Email"
                className="form-component__input error"
                name="email"
                value="brucebanner@strv.com"
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot">Password</span>
              <input
                type="password"
                placeholder="Password"
                className="form-component__input error"
                name="password"
                value="kill3r"
              />
              <span className="form-component__input-error" />
            </p>
            <p>
              <span className="form-component__annot" />
              <input
                type="password"
                placeholder="Repeat password"
                className="form-component__input error"
                name="repeatPassword"
                value=""
              />
              <span className="form-component__input-error">
                Repeat password cannot be empty
              </span>
            </p>
            <a
              className="form-component__bottomLink"
              escape="false"
              href="/signup"
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
