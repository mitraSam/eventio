import React, { Component } from "react";
import "styles/main";
import "styles/pagelayout";

import Header from "./Header";

const Landing = (ChildComponent, onLogin) =>
  class Wrapper extends Component {
    render() {
      const bannerText = "“Great,kid. Don't get cocky.”";
      return (
        <div className="landing wrapper">
          <Header history={this.props.history} hideLink={onLogin} />
          <main>
            <section className="landing__banner">
              <blockquote>
                <p>{bannerText}</p>
                <hr />
                <footer>
                  <cite>Han Solo</cite>
                </footer>
              </blockquote>
            </section>
            <section className="landing__content">
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
export default Landing;
