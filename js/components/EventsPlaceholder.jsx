import React from "react";
import { Link } from "react-router-dom";
import "styles/events";

const EventsPlaceholder = () => (
  <div className="events wrapper placeholder">
    <header className="mainHeader">
      <nav className="mainHeader__nav">
        <Link className="mainHeader__logo" to="/" rel="home">
          E.
        </Link>
        <ul className="mainHeader__nav__link-container">
          <li className="mainHeader__nav--initials" />
          <li>
            <button className="mainHeader__nav--arrow" />
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <header className="events__header">
        <ul className="events__filter-menu-m">
          <li className="events__filter-menu-m--title">
            <button className="events__filter-menu-m--title-btn">
              <span>show: </span>
              all events
            </button>
          </li>
        </ul>
        <ul className="events__filter-menu">
          <li className="events__filter-menu__link">
            <button>all events</button>
          </li>
          <li className="events__filter-menu__link">
            <button>future events</button>
          </li>{" "}
          <li className="events__filter-menu__link">
            <button>past events</button>
          </li>
        </ul>
        <ul className="events__layout-menu">
          <li>
            <button
              data-style="column"
              className="events__layout-menu--btn column"
            >
              <svg
                data-style="column"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="433.5"
                viewBox="0 0 433.5 433.5"
              >
                <path
                  data-style="column"
                  d="M0,204h127.5V51H0V204z M0,382.5h127.5v-153H0V382.5z M153,382.5h127.5v-153H153V382.5z M306,382.5h127.5v-153H306V382.5z M153,204h127.5V51H153V204z M306,51v153h127.5V51H306z"
                  id="view-module"
                />
              </svg>
            </button>
          </li>
          <li>
            <button data-style="row" className="events__layout-menu--btn row">
              <svg
                data-style="row"
                viewBox="0 0 35 35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect data-style="row" y="19.52" width="35" height="15.48" />
                <rect data-style="row" width="35" height="15.481" />
              </svg>
            </button>
          </li>
        </ul>
      </header>
    </main>
  </div>
);

export default EventsPlaceholder;
