import React from 'react';
import 'styles/placeholders/pageLayoutPlaceholder';

const LoginPlaceholder = () => (
    <div className="pageLayout">
        <header className="mainHeader">
            <nav className="mainHeader__nav">
                <a className="mainHeader__logo" rel="home" href="/">
                    E
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
                        <legend>Sign in to envatio</legend>
                        <sub>Enter your details below</sub>
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

                        <a className="form-component__bottomLink" escape="false" href="/login">
                            {"Don't have an account"} ?<em> sign up</em>
                        </a>
                        <button className="form-component__submit" type="submit">
                            {' '}
                            Sign in
                        </button>
                    </form>
                </div>
            </section>
        </main>
    </div>
);
export default LoginPlaceholder;
