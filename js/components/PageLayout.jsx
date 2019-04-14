import React, {Component} from 'react';
import 'styles/main';
import 'styles/pageLayout';

import Header from './MainHeader';

/* wrap children components and display them according to page layout design */
const PageLayout = (ChildComponent, onLogin, onSignUp) =>
    class Wrapper extends Component {
        render() {
            const bannerText = "“Great,kid. Don't get cocky.”";
            return (
                <div className="pageLayout">
                    <Header isOnSignup={onSignUp} isOnAuth={onLogin} />
                    <main>
                        <section className="pageLayout__banner">
                            <blockquote>
                                <p>{bannerText}</p>
                                <hr />
                                <footer>
                                    <cite>Han Solo</cite>
                                </footer>
                            </blockquote>
                        </section>
                        <section className="pageLayout__content">
                            {ChildComponent ? <ChildComponent /> : <h1>your home</h1>}
                        </section>
                    </main>
                </div>
            );
        }
    };

export default PageLayout;
