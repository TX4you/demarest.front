import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding: 20px;
    margin-top: -40px;
   
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
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
