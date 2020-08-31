import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeHolder: string;
}

const InputContainer = styled.div``;
const InputField = styled.input`
    padding: 8px 10px;
    border: 1px solid #a3a3a3;
    border-radius: 2px;
    max-width: 100%;
    height: 20px;
    font-family: 'Neuzeit Office', sans-serif;
    letter-spacing: 0.025em;
    line-height: 1.6;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    margin-right: 10px;
`;


const Input = ({ handleChange, placeHolder }: InputProps) => {
    return (
        <InputContainer>
            <InputField
                type="text"
                onChange={(e) => handleChange(e)}
                placeholder={placeHolder}
            />
        </InputContainer>
    );
};

export default Input;
