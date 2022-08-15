import styled from "styled-components";


export const Table = styled.table`
    width: 100%;
    background-color: #FFF;
    padding: 20px;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
`;

export const TableHeadLine = styled.tr`
    background-color: #7890a8;
`;

export const TableHeadColumn = styled.th<{ width?: number}>`
    width: ${props => props.width ? `${props.width}px` : `auto`};
    padding: 10px 0;
    border: none;
`;

export const TableLine = styled.tr`
    :nth-of-type(odd) {
        background-color: #c4c8c5;
    }
    :hover {
        background-color: #edd5c5;
    }
`;

export const TableColumn = styled.td`
    padding: 10px 0;
    border: none;
`;
