import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import Input from '../components/Input';
import IssuesList from '../components/IssuesList';
import Error from '../components/Error';
import { useIssues } from '../context/IssuesContext';
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import { fetchIssueByFilter, fetchIssues } from '../api/issues';

const HomeContainer = styled.div`
    max-width: 900px;
    margin: 40px auto 0;
    padding-top: 50px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: row;
    padding-inline-start: 40px;
    padding-inline-end: 40px;
`;
const Button = styled.button`
    display: block;
    width: 150px;
    line-height: 1.4;
    padding-left: 5px;
    padding-right: 5px;
    white-space: normal;
    min-height: 38px;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 2px;
    background-color: #3a3a3a;
    color: #fff;
    font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 13px;
    margin-right: 10px;
`;
const NoDataContainer = styled.div``;
const NoIssuesText = styled.p``;

const Home = () => {
    const [
        issues,
        setIssues,
        issuesCount,
        loading,
        setLoading,
        error,
        setError,
    ] = useIssues();
    const [value, setValue] = useState<string>('');
    const [selected, setSelected] = useState<string>('creator');
    const [filtered, setFiltered] = useState<boolean>(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
        setValue(e.target.value);
    const handleSelected = (e: ChangeEvent<HTMLSelectElement>): void =>
        setSelected(e.target.value);
    const onSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        setLoading(true);
        fetchIssueByFilter(selected, value, 1, 25).then(
            (res: { data: React.SetStateAction<null> }) => {
                console.log(res.data);
                setIssues(res.data);
                setLoading(false);
                setFiltered(true);
            }
        );
    };
    const clearFilters = () => {
        setFiltered(false);
        fetchIssues(1, 25).then((res: { data: React.SetStateAction<null> }) => {
            setIssues(res.data);
        });
    };
    const dropdownOptions = [
        { name: 'Author', value: 'creator' },
        { name: 'Labels', value: 'labels' },
        { name: 'Assignee', value: 'assignee' },
    ];

    if (error) {
        return <Error error={error} />;
    }

    return (
        <HomeContainer>
            <Form onSubmit={onSubmit}>
                <Input handleChange={handleChange} placeHolder="Filter by" />
                <Dropdown
                    options={dropdownOptions}
                    handleSelected={handleSelected}
                />
                <Button type="submit" onSubmit={onSubmit}>
                    Submit
                </Button>
                {filtered ? (
                    <Button onClick={clearFilters}>Clear Filters</Button>
                ) : null}
            </Form>
            {issues && issues.length ? (
                <IssuesList
                    issues={issues}
                    setIssues={setIssues}
                    issuesCount={issuesCount}
                    loading={loading}
                    setLoading={setLoading}
                    setError={setError}
                    filtered={filtered}
                    selected={selected}
                    value={value}
                />
            ) : (
                <NoDataContainer>
                    <NoIssuesText>No issues to list. That's rare!</NoIssuesText>
                </NoDataContainer>
            )}
        </HomeContainer>
    );
};

export default Home;
