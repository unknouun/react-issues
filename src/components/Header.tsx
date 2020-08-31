import React from 'react';
import { useIssues } from '../context/IssuesContext';
import ReactIconSVG from '../assets/React-icon.svg.png';
import OpenIcon from '../assets/OpenIcon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 40px;
    margin-bottom: 30px;
    background-color: #fafbfc;
    border-bottom: 1px solid #ebebeb;
`;
const HeaderLeft = styled(Link)`
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #000;
`;
const HeaderRight = styled.div`
    text-align: center;
    @media only screen and (max-width: 500px) {
        display: none;
    }
`;
const HeaderLogo = styled.img`
    height: 70px;
    width: 100px;
    animation: spin 5s infinite linear;
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;
const HeaderTitle = styled.h3`
    text-transform: uppercase;
    line-height: 2;
    font-weight: 300;
`;
const HeaderTab = styled.div`
    text-transform: uppercase;
    font-size: 14px;
    line-height: 4;
`;
const HeaderCount = styled.span`
    color: #b22222;
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
`;

const Header = () => {
    const issuesContext = useIssues();
    const count = issuesContext[2];

    return (
        <HeaderContainer>
            <HeaderLeft to='/'>
                <HeaderLogo src={ReactIconSVG} alt="react-logo" />
                <HeaderTitle>React's list of open issues</HeaderTitle>
            </HeaderLeft>
            <HeaderRight>
                <HeaderTab>
                    <OpenIcon />
                    <HeaderCount>{count}</HeaderCount>
                </HeaderTab>
            </HeaderRight>
        </HeaderContainer>
    );
};

export default Header;
