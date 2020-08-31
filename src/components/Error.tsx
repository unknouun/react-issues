import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div``;

const Error = ({ error }: any) => {
    return <ErrorContainer>{error.message}</ErrorContainer>;
};

export default Error;
