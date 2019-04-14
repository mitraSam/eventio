import React from 'react';
import PropTypes from 'prop-types';
import 'styles/eventsHeader';
const EventsHeader = ({selectedFilter, filters, activeLayout, open, setFilter, changeLayout, modifyDropdown}) => (
    <header className="events__header">
        <ul className="events__filter-menu-m">
            <li className="events__filter-menu-m__title">
                <button className="events__filter-menu-m__title-btn" onClick={modifyDropdown}>
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
                <li className={`events__filter-menu__link ${filter === selectedFilter ? 'active' : ''}`} key={filter}>
                    <button data-filter={filter} onClick={setFilter}>{`${filter} events`}</button>
                </li>
            ))}
        </ul>
        <ul className="events__layout-menu">
            <li>
                <button data-style="column" onClick={changeLayout} className="events__layout-menu__btn column">
                    <svg
                        data-style="column"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="433.5"
                        viewBox="0 0 433.5 433.5"
                        className={activeLayout === 'column' ? 'active' : ''}>
                        <path
                            data-style="column"
                            d="M0,204h127.5V51H0V204z M0,382.5h127.5v-153H0V382.5z M153,382.5h127.5v-153H153V382.5z M306,382.5h127.5v-153H306V382.5z M153,204h127.5V51H153V204z M306,51v153h127.5V51H306z"
                            id="view-module"
                        />
                    </svg>
                </button>
            </li>
            <li>
                <button data-style="row" onClick={changeLayout} className="events__layout-menu__btn row">
                    <svg
                        data-style="row"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="13"
                        viewBox="0 0 17 13"
                        className={activeLayout === 'row' ? 'active' : ''}>
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
);
EventsHeader.propTypes = {
    selectedFilter: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    activeLayout: PropTypes.string.isRequired,
    open: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    changeLayout: PropTypes.func.isRequired,
    modifyDropdown: PropTypes.func.isRequired,
};
export default EventsHeader;
