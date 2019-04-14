import React from "react";
import "styles/placeholders/eventsPlaceholder";

const EventsPlaceholder = () => (
  <div className="events wrapper ">
    <header className="mainHeader">
      <nav className="mainHeader__nav">
        <a className="mainHeader__logo" rel="home" href="/">
          E.
        </a>
        <ul className="mainHeader__nav__menu">
          <li className="mainHeader__nav__link-container initials">
            <span>SS</span>
          </li>
          <li className="mainHeader__nav__link-container name hideOnMobile">
            Sam Sam
          </li>
          <li className="mainHeader__nav__link-container arrow">
            <button />
          </li>
          <li className="mainHeader__nav__link-container logout hide">
            <button>Log out</button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <header className="events__header">
        <ul className="events__filter-menu-m">
          <li className="events__filter-menu-m__title">
            <button className="events__filter-menu-m__title-btn">
              <span>show: </span>all events
            </button>
          </li>
          <li>
            <ul className="events__filter-menu-m__drop ">
              <li>
                <button data-filter="future">future</button>
              </li>
              <li>
                <button data-filter="past">past</button>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="events__filter-menu">
          <li className="events__filter-menu__link active">
            <button data-filter="all">all events</button>
          </li>
          <li className="events__filter-menu__link ">
            <button data-filter="future">future events</button>
          </li>
          <li className="events__filter-menu__link ">
            <button data-filter="past">past events</button>
          </li>
        </ul>
        <ul className="events__layout-menu">
          <li>
            <button
              data-style="column"
              className="events__layout-menu__btn column"
            >
              <svg
                data-style="column"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                viewBox="0 0 433.5 433.5"
                className="active"
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
            <button data-style="row" className="events__layout-menu__btn row">
              <svg
                data-style="row"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="13"
                viewBox="0 0 17 13"
              >
                <g data-style="row" fill="none" fillRule="evenodd">
                  <path data-style="row" d="M-4-5h24v24H-4z" />
                  <path
                    className="events__layout-menu__btn__path"
                    data-style="row"
                    fill="#D9DCE1"
                    d="M0 13h17V7H0v6zM0 0v6h17V0H0z"
                  />
                </g>
              </svg>
            </button>
          </li>
        </ul>
      </header>
      <div className="events__container" />
      <button className="events__create--btn">+</button>
    </main>
  </div>
);

export default EventsPlaceholder;
