import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
}

interface PaginationButtonProps {
    readonly active?: boolean;
}

const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
`;
const PaginationMain = styled.div`
    display: flex;
    flex-direction: row;
`;
const PaginationButton = styled.button<PaginationButtonProps>`
    margin: 5px;
    display: block;
    width: 100%;
    line-height: 1.4;
    padding-left: 5px;
    padding-right: 5px;
    white-space: normal;
    margin-top: 0;
    margin-bottom: 10px;
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
    background-color: ${(props) => (props.active ? '#fff' : '#3a3a3a')};
    color: ${(props) => (props.active ? '#3a3a3a' : '#fff')};
    font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 13px;
`;
const PaginationEllipsis = styled.div``;

const Pagination = ({
    page,
    totalPages,
    handlePagination,
}: PaginationProps) => {
    return (
        <PaginationContainer>
            <PaginationMain>
                {page !== 1 && (
                    <PaginationButton
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                    >
                        &lt;
                    </PaginationButton>
                )}
                <PaginationButton
                    onClick={() => handlePagination(1)}
                    type="button"
                    active={page === 1}
                >
                    {1}
                </PaginationButton>
                {page > 3 && <PaginationEllipsis>...</PaginationEllipsis>}
                {page === totalPages && totalPages > 3 && (
                    <PaginationButton
                        onClick={() => handlePagination(page - 2)}
                        type="button"
                    >
                        {page - 2}
                    </PaginationButton>
                )}
                {page > 2 && (
                    <PaginationButton
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                    >
                        {page - 1}
                    </PaginationButton>
                )}
                {page !== 1 && page !== totalPages && (
                    <PaginationButton
                        onClick={() => handlePagination(page)}
                        type="button"
                        active={page !== 1 && page !== totalPages}
                    >
                        {page}
                    </PaginationButton>
                )}
                {page < totalPages - 1 && (
                    <PaginationButton
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                    >
                        {page + 1}
                    </PaginationButton>
                )}
                {page === 1 && totalPages > 3 && (
                    <PaginationButton
                        onClick={() => handlePagination(page + 2)}
                        type="button"
                    >
                        {page + 2}
                    </PaginationButton>
                )}
                {page < totalPages - 2 && (
                    <PaginationEllipsis>...</PaginationEllipsis>
                )}
                <PaginationButton
                    onClick={() => handlePagination(totalPages)}
                    type="button"
                    active={page === totalPages}
                >
                    {totalPages}
                </PaginationButton>
                {page !== totalPages && (
                    <PaginationButton
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                    >
                        &gt;
                    </PaginationButton>
                )}
            </PaginationMain>
        </PaginationContainer>
    );
};

export default Pagination;
