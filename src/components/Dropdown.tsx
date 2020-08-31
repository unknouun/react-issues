import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface DropdownProps {
    handleSelected: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: {
        name: string;
        value: string;
    }[];
}

const DropdownContainer = styled.div`
    margin-right: 10px;
`;
const Select = styled.select`
    padding: 8px 10px;
    border: 1px solid #a3a3a3;
    border-radius: 2px;
    max-width: 100%;
    height: 38px;
    font-family: 'Neuzeit Office', sans-serif;
    -webkit-letter-spacing: 0.025em;
    -moz-letter-spacing: 0.025em;
    -ms-letter-spacing: 0.025em;
    letter-spacing: 0.025em;
    line-height: 1.6;
    font-size: 16px;
`;
const Option = styled.option``;

const Dropdown = ({ options, handleSelected }: DropdownProps) => {
    return (
        <DropdownContainer>
            <Select onChange={handleSelected}>
                {options.map(
                    (
                        option: { name: string; value: string },
                        index: number
                    ) => {
                        return (
                            <Option key={index} value={option.value}>
                                {option.name}
                            </Option>
                        );
                    }
                )}
            </Select>
        </DropdownContainer>
    );
};

export default Dropdown;
