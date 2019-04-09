import React, { Component } from "react";
import "styles/main";
import "styles/landing";

import Header from "./Header";

const Landing = (ChildComponent, login) =>
  class Wrapper extends Component {
    render() {
      const bannerText = "“Great,kid. Don't get cocky.”";
      return (
        <div className="wrapper">
          <Header onLogin={login} />
          <main className="landing">
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
