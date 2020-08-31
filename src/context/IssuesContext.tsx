import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
} from 'react';
import { fetchIssues, fetchRepo } from '../api/issues';

const IssuesContext = createContext<any>([]);

interface IssuesProviderProps {
    children: ReactNode;
}

const IssuesProvider = ({ children }: IssuesProviderProps) => {
    const [issues, setIssues] = useState(null);
    const [issuesCount, setIssuesCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        fetchIssues(1, 25)
            .then((res: { data: React.SetStateAction<null> }) =>
                setIssues(res.data)
            )
            .catch((err) => setError(err));
        fetchRepo()
            .then((res) => {
                setIssuesCount(res.data.open_issues_count);
                setLoading(false);
            })
            .catch((err) => setError(err));
    }, []);

    let data = [
        issues,
        setIssues,
        issuesCount,
        loading,
        setLoading,
        error,
        setError,
    ];

    return (
        <IssuesContext.Provider value={data}>{children}</IssuesContext.Provider>
    );
};

const useIssues = () => {
    const context = useContext(IssuesContext);
    if (context === undefined)
        throw new Error('useIssues must be used inside IssuesProvider');

    return context;
};

export { IssuesProvider, useIssues };
