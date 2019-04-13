import React, { Component } from "react";
import PropTypes from "prop-types";
import "styles/main";
import "styles/pageLayout";

import Header from "./MainHeader";

const PageLayout = (ChildComponent, onLogin, onSignUp) =>
  class Wrapper extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired
    };
    render() {
      const bannerText = "“Great,kid. Don't get cocky.”";
      return (
        <div className="pageLayout">
          <Header
            history={this.props.history}
            isOnSignup={onSignUp}
            isOnAuth={onLogin}
          />
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
              {ChildComponent ? (
                <ChildComponent history={this.props.history} />
              ) : (
                <h1>your home</h1>
              )}
            </section>
          </main>
        </div>
      );
    }
  };

export default PageLayout;
