import React from "react";
import "styles/eventsHeader";
const EventsHeader = ({
  selectedFilter,
  filters,
  activeLayout,
  open,
  setFilter,
  changeLayout,
  modifyDropdown
}) => (
  <header className="events__header">
    <ul className="events__filter-menu-m">
      <li className="events__filter-menu-m__title">
        <button
          className="events__filter-menu-m__title-btn"
          onClick={modifyDropdown}
        >
          <span>show: </span>
          {selectedFilter} events
        </button>
      </li>
      <li>
        <ul className={`events__filter-menu-m__drop ${open}`}>
          {filters
            .filter(filter => filter !== selectedFilter)
            .map(filter => (
              <li key={filter}>
                <button data-filter={filter} onClick={setFilter}>
                  {filter}
                </button>
              </li>
            ))}
        </ul>
      </li>
    </ul>
    <ul className="events__filter-menu">
      {filters.map(filter => (
        <li
          className={`events__filter-menu__link ${
            filter === selectedFilter ? "active" : ""
          }`}
          key={filter}
        >
          <button
            data-filter={filter}
            onClick={setFilter}
          >{`${filter} events`}</button>
        </li>
      ))}
    </ul>
    <ul className="events__layout-menu">
      <li>
        <button
          data-style="column"
          onClick={changeLayout}
          className="events__layout-menu__btn column"
        >
          <svg
            data-style="column"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="433.5"
            viewBox="0 0 433.5 433.5"
            className={activeLayout === "column" ? "active" : ""}
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
        <button
          data-style="row"
          onClick={changeLayout}
          className="events__layout-menu__btn row"
        >
          <svg
            data-style="row"
            className={activeLayout === "row" ? "active" : ""}
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
);

export default EventsHeader;
