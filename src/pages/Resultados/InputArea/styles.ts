import styled from "styled-components";


export const Container = styled.div`
    background-color: #CCC;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding: 10px;
    margin-top: 0px;
`;
export const H1 = styled.h1`
    margin: 0;
    padding: 0;
    color: #7890a8;
    padding-top: 5px;
    margin-bottom: 10px;
`;
export const Button = styled.button`
    background: white;
    color: #7890a8;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #7890a8;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: #7890a8;
        color: white;
    }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;
export const form = styled.form`
  display: flex;
  justify-items: center;
  align-items: center;
`;

interface ItemProps {
    placeholder: string; 
    tamanho: number;
  }

  export const Select = styled.select<{tamanho: number}>`
      width: ${props => props.tamanho ? `${props.tamanho}px` : `100%`};
      display: flex;
      background: white;
      color: gray;
      padding: 0.25em 1em;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #7890a8;
      margin-left: 10px;

      option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
      }
    `;

export const Input = styled.input.attrs<ItemProps>(({ placeholder, tamanho }) => (
            {
                type: 'text',
                size: tamanho ? tamanho : undefined,
            }
        ))<ItemProps>`
    placeholder: ${props => props.placeholder ? `${props.placeholder}` : ``};
    border-radius: 5px;
    border: 1px solid #7890a8;
    display: flex;
    margin: 1em;
    padding: 0.25em 1em;
    ::placeholder {
        color: #7890a8;
    };
    
`;
