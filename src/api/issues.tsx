import axios from 'axios';

export const fetchIssues = (page: number, per_page: number): Promise<any> => {
    return axios.get('https://api.github.com/repos/facebook/react/issues', {
        params: {
            page,
            per_page,
        },
    });
};

export const fetchRepo = () => {
    return axios.get('https://api.github.com/repos/facebook/react');
};

export const fetchIssueByNumber = (issue_number: number) => {
    return axios.get(
        `https://api.github.com/repos/facebook/react/issues/${issue_number}`
    );
};

export const fetchIssueComments = (issue_number: number) => {
    return axios.get(
        `https://api.github.com/repos/facebook/react/issues/${issue_number}/comments`
    );
};

export const fetchIssueByFilter = (
    filter: string,
    value: string,
    page: number,
    per_page: number
) => {
    return axios.get('https://api.github.com/repos/facebook/react/issues', {
        params: {
            [filter]: value,
            page,
            per_page,
        },
    });
};
