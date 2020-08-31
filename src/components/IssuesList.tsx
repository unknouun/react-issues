import React, { useState, useEffect, SetStateAction } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import OpenIcon from '../assets/OpenIcon';
import Pagination from './Pagination';
import { fetchIssues, fetchIssueByFilter } from '../api/issues';
import Loader from './Loader';
import styled from 'styled-components';

interface IssuesListProps {
    issues: any[];
    setIssues: any;
    issuesCount: number;
    loading: boolean;
    setLoading: (bool: boolean) => void;
    setError: (err: Error) => void;
    filtered: boolean;
    selected: string;
    value: string;
}

const ListContainer = styled.div``;
const UnorderedList = styled.ul`
    list-style: none;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
    padding-inline-end: 40px;
`;
const Issue = styled.div`
    display: flex;
    flex-direction: row;
`;
const ListIssue = styled.li``;
const IssueIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
`;
const IssueHeader = styled.div`
    display: flex;
    flex-direction: row;
`;
const IssueTitle = styled.h3``;
const IssueDetailsLink = styled(Link)`
    text-decoration: none;
    color: #000;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
        color: #0366d6;
    }
`;
const IssueSubText = styled.p`
    margin: 5px;
`;
const Labels = styled.span`
    display: block;
    font-size: 1.17em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`;
const Label = styled.button`
    color: #fff;
    background-color: #3a3a3a;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 10px;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 5px;
`;

const IssuesList = ({
    issues,
    setIssues,
    issuesCount,
    loading,
    setLoading,
    setError,
    filtered,
    selected,
    value,
}: IssuesListProps) => {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const handlePagination = (page: number) => {
        setLoading(true);
        if (filtered) {
            return fetchIssueByFilter(selected, value, page, 25)
                .then((res: { data: React.SetStateAction<null> }) => {
                    setIssues(res.data);
                    if (page <= totalPages) setPage(page);
                    else setPage(totalPages);
                    setLoading(false);
                })
                .catch((err) => setError(err));
        }
        fetchIssues(page, 25)
            .then((res: { data: React.SetStateAction<null> }) => {
                setIssues(res.data);
                if (page <= totalPages) setPage(page);
                else setPage(totalPages);
                setLoading(false);
            })
            .catch((err) => setError(err));
    };

    useEffect(() => {
        if (issuesCount) {
            setTotalPages(Math.ceil(issuesCount / 25));
        }
    }, [issuesCount]);

    const renderLabels = (labels: any) => {
        return labels.map((label: any, index: number) => {
            return <Label key={index}>{label.name}</Label>;
        });
    };

    if (loading) {
        return <Loader>Loading</Loader>;
    }

    return (
        <ListContainer>
            <UnorderedList>
                {issues.map((issue: any, index: number) => {
                    return (
                        <Issue key={index}>
                            <IssueIcon>
                                <OpenIcon />
                            </IssueIcon>
                            <ListIssue>
                                <IssueHeader>
                                    <IssueTitle>
                                        <IssueDetailsLink
                                            to={`/issues/${issue.number}`}
                                        >
                                            {issue.title}
                                        </IssueDetailsLink>
                                        {issue.labels.length ? (
                                            <Labels>
                                                {renderLabels(issue.labels)}
                                            </Labels>
                                        ) : null}
                                    </IssueTitle>
                                </IssueHeader>

                                <IssueSubText>
                                    #{issue.number} Opened{' '}
                                    {moment(issue.created_at).fromNow()} by{' '}
                                    {issue.user.login}
                                </IssueSubText>
                            </ListIssue>
                        </Issue>
                    );
                })}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePagination={handlePagination}
                />
            </UnorderedList>
        </ListContainer>
    );
};

export default IssuesList;
