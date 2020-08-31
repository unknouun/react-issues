import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LoaderProps {
    children: ReactNode;
}

const Loading = styled.div`
    font-size: 30px;
    text-align: center;
    &:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 900ms infinite;
        animation: ellipsis steps(4, end) 900ms infinite;
        content: '...';
        width: 0px;
    }

    @keyframes ellipsis {
        to {
            width: 1.25em;
        }
    }

    @-webkit-keyframes ellipsis {
        to {
            width: 1.25em;
        }
    }
`;

const Loader = ({ children }: LoaderProps) => {
    return <Loading>{children}</Loading>;
};

export default Loader;
