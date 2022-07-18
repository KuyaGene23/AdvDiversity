import React, { useState, useEffect, useCallback } from 'react';
import * as newsletterService from '../../services/newsletterService';
import NewsletterCard from './NewsletterCard';
import debug from 'sabio-debug';
import Pagination from 'rc-pagination';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import 'rc-pagination/assets/index.css';

function Newsletters() {
    const _logger = debug.extend('Newsletter');

    const [pageData, setPageData] = useState({
        arrayOfNewsletters: [],
        newsletterComponents: [],
    });

    const [pageIndex, updatePageIndex] = useState(0);
    const [pageSize] = useState(8);
    const [totalPages, updateTotalPages] = useState(0);
    const [currentActualPage, updateCurrentActualPage] = useState(1);

    const onChange = (e) => {
        _logger('onChange Firing', { syntheticEvent: e });
        let target = e;
        if (target > 0) {
            target--;
        }
        updatePageIndex(() => {
            const currentPageIndex = target;
            return currentPageIndex;
        });
        updateCurrentActualPage(() => {
            const paginatePage = e;
            return paginatePage;
        });

        newsletterService
            .getPaginatedNewsletters(target, pageSize)
            .then(getPaginatedNewslettersSuccess)
            .catch(getPaginatedNewslettersError);
    };

    useEffect(() => {
        newsletterService
            .getPaginatedNewsletters(pageIndex, pageSize)
            .then(getPaginatedNewslettersSuccess)
            .catch(getPaginatedNewslettersError);
    }, []);

    const getPaginatedNewslettersSuccess = (data) => {
        let returnedArray = data.item.pagedItems;

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfNewsletters = returnedArray;
            pd.newsletterComponents = returnedArray.map(mapNewsletter);
            updateTotalPages(() => {
                return data.item.totalCount;
            });
            return pd;
        });
    };

    const getPaginatedNewslettersError = (error) => {
        _logger(error, 'getPaginatedResources Error');
        toastr.error('Error on Pagination');
    };

    const mapNewsletter = (aNewsletter) => {
        return <NewsletterCard newsletter={aNewsletter} key={aNewsletter.id} onNewsletterClicked={onDeleteRequested} />;
    };

    const onDeleteRequested = useCallback((myNewsletter, eObj) => {
        _logger(myNewsletter.id, { myNewsletter, eObj });

        const handler = getDeleteSuccessHandler(myNewsletter.id);

        newsletterService.deleteNewsletters(myNewsletter.id).then(handler).catch(onDeleteError);
    }, []);

    const getDeleteSuccessHandler = (idToBeDeleted) => {
        return () => {
            setPageData((prevState) => {
                const pd = { ...prevState };
                pd.arrayOfNewsletters = [...pd.arrayOfNewsletters];

                const indOf = pd.arrayOfNewsletters.findIndex((person) => {
                    let result = false;

                    if (person.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;
                });

                if (indOf >= 0) {
                    pd.arrayOfNewsletters.splice(indOf, 1);
                    pd.newsletterComponents = pd.arrayOfNewsletters.map(mapNewsletter);
                }

                return pd;
            });
        };
    };

    const onDeleteError = (error) => {
        _logger(error);
        toastr.error('You were unsuccessful on deleting a Newsletter');
    };

    return (
        <div className="m-3">
            <div className="card container">
                <div className="container">
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <b>Newsletters - For Admin Use Only</b>
                    </h2>
                    <div
                        className="container"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link
                            to="/newsletters/add"
                            element={<NewsletterCard></NewsletterCard>}
                            className="btn btn-primary"
                            style={{ margin: `5px` }}>
                            <b>Add Newsletter</b>
                        </Link>
                        <Pagination
                            current={currentActualPage}
                            total={totalPages}
                            pageSize={pageSize}
                            onChange={onChange}></Pagination>
                    </div>
                    <div className="container">
                        <div className="row" style={{ padding: `10px` }}>
                            {pageData.newsletterComponents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newsletters;
