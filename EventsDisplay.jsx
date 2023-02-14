import React, { useEffect, useState } from 'react';
import * as eventService from '../../services/eventService';
import { Row } from 'react-bootstrap';
import debug from 'sabio-debug';
import EventCardDisplay from '../events/EventCardDisplay';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';

const _logger = debug.extend('events');
const _loggerEventsDisplay = _logger.extend('eventsDisplay');

function EventsDisplay() {
    const [pageData, setPageData] = useState({
        arrayOfEvents: [],
        eventComponents: [],
        pageIndex: 0,
        pageSize: 6,
        totalCount: 30,
        current: 1,
    });

    useEffect(() => {
        eventService.getEvents(pageData.pageIndex, pageData.pageSize).then(onGetEventsSuccess).catch(onGetEventsError);
    }, [pageData.pageIndex]);

    const onGetEventsSuccess = (data) => {
        _loggerEventsDisplay(data);
        _loggerEventsDisplay(data.item.pagedItems, 'onGetEventsSuccess');
        renderEvents(data);
    };
    const renderEvents = (data) => {
        let currentEvents = data.item.pagedItems;
        let countItems = data.item.totalCount;

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfEvents = currentEvents;
            pd.eventComponents = currentEvents.map(eventMapper);
            pd.totalCount = countItems;
            return pd;
        });
    };

    const onGetEventsError = (response) => {
        _loggerEventsDisplay(response, 'onGetEventsError');
    };

    const eventMapper = (eventData) => {
        return <EventCardDisplay eventData={eventData} key={eventData.id}></EventCardDisplay>;
    };

    const onPaginationChange = (page) => {
        setPageData((prevState) => {
            let pg = { ...prevState };
            pg.current = page;
            pg.pageIndex = page - 1;
            return pg;
        });
    };

    return (
        <div className="card container-fluid">
            <div className="container">
                <h2>Events</h2>
                <div className="container">
                    <div className="card-deck">
                        <Row>{pageData.eventComponents}</Row>
                    </div>
                </div>
                <div
                    className="container center row"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Pagination
                        current={pageData.current}
                        total={pageData.totalCount}
                        pageSize={pageData.pageSize}
                        onChange={onPaginationChange}
                        locale={locale}></Pagination>
                </div>
            </div>
        </div>
    );
}

export default EventsDisplay;
