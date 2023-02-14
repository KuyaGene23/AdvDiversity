import EventCard from './EventCard';
import toastr from 'toastr';

const _logger = debug.extend('EventPage');

function Events() {
    const [eventsData, setEventsData] = useState({
        arrayOfEvents: [],
        eventComponents: [],
        eventTypes: [],
        eventCategories: '',
        eventTypesMapped: [],
        totalCount: 0,
    });

    const [search, setSearchQuery] = useState('');
    const [pageInfo, updatePageInfo] = useState({
        index: 1,
        size: 8,
    });

    useEffect(() => {
        if (search.length > 0) {
            eventService
                .searchEvents(search, pageInfo.index - 1, pageInfo.size)
                .then(onGetEventsSuccess)
                .catch(onGetEventsError);
        } else {
            eventService
                .getEvents(pageInfo.index - 1, pageInfo.size)
                .then(onGetEventsSuccess)
                .catch(onGetEventsError);
        }
    }, [pageInfo.index, search]);

    useEffect(() => {
        _logger('Rendered EventTypes');
        let payload = ['EventTypes'];
        lookUpService.getTypes(payload).then(onGetLookupSuccess).catch(onGetLookupError);
    }, []);

    const onGetLookupSuccess = (response) => {
        _logger('onGetEventLookupSuccess', response);
        setEventsData((prevState) => {
            let pd = { ...prevState };
            pd.eventTypes = response.item.eventTypes;
            pd.eventTypesMapped = response.item.eventTypes.map(mapEventTypes);
            return pd;
        });
    };

    const onGetLookupError = (err) => {
        toastr.error('onSearchEventCategoriesError', err);
    };

    const mapEventTypes = (eventType) => {
        return (
            <option value={eventType.id} key={`eventType_${eventType.id}`}>
                {eventType.name}
            </option>
        );
    };

    const onGetEventsSuccess = (response) => {
        _logger('onGetEventsSuccess', response);
        const arrayOfEvents = response.item.pagedItems;
        setEventsData((prevState) => {
            let pd = { ...prevState };
            pd.arrayOfEvents = arrayOfEvents;
            pd.eventComponents = arrayOfEvents.map(mapEvents);
            pd.totalCount = response.item.totalCount;

            return pd;
        });
    };

    const onGetEventsError = (err) => {
        toastr.error('onGetEventsError', err);
    };

    const mapEvents = (aEvent) => {
        return (
            <Col className="my-2" md={3} xxl={3} key={`aEventCard_${aEvent.id}`}>
                <EventCard aEvent={aEvent} />
            </Col>
        );
    };
    const filterEventsByType = (e) => {
        const { value } = e.target;
        if (value !== '0') {
            const filterEventsWorkshop = eventsData.arrayOfEvents.filter(
                (evtType) => evtType.eventTypes.id === Number(value)
            );
            setEventsData((prevState) => {
                let pd = { ...prevState };
                pd.eventComponents = filterEventsWorkshop.map(mapEvents);
                return pd;
            });
        } else {
            const filterEventsWorkshop = eventsData.arrayOfEvents;
            setEventsData((prevState) => {
                let pd = { ...prevState };
                pd.eventComponents = filterEventsWorkshop.map(mapEvents);
                return pd;
            });
        }
    };

    //pageChange
    const onChange = (page) => {
        _logger(page, 'page');
        updatePageInfo((prevState) => {
            const pageInfo = { ...prevState };
            pageInfo.index = page;
            return pageInfo;
        });
    };

    //handleChange
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchQuery(() => {
            return value;
        });
        updatePageInfo((prevState) => {
            const pageInfo = { ...prevState };
            pageInfo.index = 1; // -1 0
            return pageInfo;
        });
    };

    return (
        <>
            <React.Fragment>
                <Row
                    style={{
                        paddingTop: '50px',
                        boxSizing: 'content-box',
                    }}
                    containerstyle={{
                        position: 'relative',
                        overflow: 'visible',
                    }}
                    className="mb-3 mx-auto padding-40%A">
                    <h2>EVENTS</h2>
                    <Col sm={4}>
                        <Pagination
                            className="mb-3 mx-auto"
                            current={pageInfo.index}
                            total={eventsData.totalCount}
                            pageSize={pageInfo.size}
                            onChange={onChange}
                            locale={locale}></Pagination>
                    </Col>
                    <Col sm={4}>
                        <select className="form-control" onChange={filterEventsByType}>
                            <option value="0"> All</option>
                            {eventsData.eventTypesMapped}
                        </select>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="end-fields">
                                <Form className="mb-3 mx-auto float-end">
                                    <Stack direction="horizontal" gap={0}>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="search"
                                            placeholder="Search Events"
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>{eventsData.eventComponents}</Row>
            </React.Fragment>
        </>
    );
}

export default Events;
