import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IssuesProvider } from './context/IssuesContext';
import Header from './components/Header';
import Home from './pages/Home';
import IssueDetails from './pages/IssueDetails';
import styled from 'styled-components';

interface ContainerProps {
    readonly vh?: number;
    readonly vw?: number;
}

const AppContainer = styled.div<ContainerProps>`
    height: 100vh;
    width: 100vw;
    height: ${(props) => `calc(${props.vh} * 100)`};
    width: ${(props) => `calc(${props.vw} * 100)`};
    font-family: Questrial, sans-serif;
`;

function App() {
    const [vw, setVW] = useState<number>(0);
    const [vh, setVH] = useState<number>(0);
    const resizeApp = () => {
        setVH(window.innerHeight * 0.01);
        setVW(window.innerWidth * 0.01);
    };
    useEffect(() => {
        window.addEventListener('resize', resizeApp);
        resizeApp();
    });
    return (
        <AppContainer vw={vw} vh={vh}>
            <IssuesProvider>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/issues/:number">
                        <IssueDetails />
                    </Route>
                </Switch>
            </IssuesProvider>
        </AppContainer>
    );
}

export default App;
