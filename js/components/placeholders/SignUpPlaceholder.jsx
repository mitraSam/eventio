import React from 'react';
import 'styles/placeholders/pageLayoutPlaceholder';

const SignUpPlaceholder = () => (
    <div className="pageLayout--placeholder">
        <header className="mainHeader--placeholder">
            <nav className="mainHeader--placeholder__nav">
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28">
                    <path
                        fill="#323C46"
                        fillRule="evenodd"
                        d="M.078 27V.058H16.95v4.94H5.322v6.156h10.526v4.674H5.322v6.232H16.95V27H.078zm21.47-3.192c0-.963.336-1.78 1.007-2.451.671-.671 1.488-1.007 2.451-1.007.481 0 .937.089 1.368.266a3.394 3.394 0 0 1 1.862 1.843c.177.418.266.868.266 1.349A3.418 3.418 0 0 1 26.374 27c-.43.177-.887.266-1.368.266-.963 0-1.78-.336-2.451-1.007-.671-.671-1.007-1.488-1.007-2.451z"
                    />
                </svg>
                <ul className="mainHeader--placeholder__nav__menu hideOnMobile">
                    <li className="mainHeader--placeholder__nav__link-container">
                        <a className="mainHeader--placeholder__nav__link" href="/login">
                            Already have an account?<em> Sign in</em>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <section className="pageLayout--placeholder__banner">
                <blockquote>
                    <p>{"“Great,kid. Don't get cocky.”"}</p>
                    <hr />
                    <footer>
                        <cite>Han Solo</cite>
                    </footer>
                </blockquote>
            </section>
            <section className="pageLayout--placeholder__content">
                <div>
                    <form noValidate="" className="form-component--placeholder ">
                        <legend>Get started absolutely free</legend>
                        <sub>Enter your details below</sub>
                        <p>
                            <span className="form-component--placeholder__annot" />
                            <input
                                type="text"
                                placeholder="First name"
                                className="form-component--placeholder__input "
                                name="firstName"
                                value=""
                            />
                            <span className="form-component--placeholder__input-error" />
                        </p>
                        <p>
                            <span className="form-component--placeholder__annot" />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="form-component--placeholder__input"
                                name="lastName"
                                value=""
                            />
                            <span className="form-component--placeholder__input-error" />
                        </p>
                        <p>
                            <span className="form-component--placeholder__annot" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-component--placeholder__input"
                                name="email"
                                value=""
                            />
                            <span className="form-component--placeholder__input-error" />
                        </p>
                        <p>
                            <span className="form-component--placeholder__annot" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-component--placeholder__input"
                                name="password"
                                value=""
                            />
                            <span className="form-component--placeholder__input-error" />
                        </p>
                        <p>
                            <span className="form-component--placeholder__annot" />
                            <input
                                type="password"
                                placeholder="Repeat password"
                                className="form-component--placeholder__input"
                                name="repeatPassword"
                                value=""
                            />
                            <span className="form-component--placeholder__input-error" />
                        </p>
                        <a className="form-component--placeholder__bottomLink" escape="false" href="/login">
                            Already have an account ?<em> sign in</em>
                        </a>
                        <button className="form-component--placeholder__submit" type="submit">
                            {' '}
                            Sign up
                        </button>
                    </form>
                </div>
            </section>
        </main>
    </div>
);
export default SignUpPlaceholder;
