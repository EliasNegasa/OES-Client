import styled, { css } from "styled-components";

export const StyledDashboardCard = styled.div`
    border-radius: 5px;
    box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
    border: none;
    margin-bottom: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 24%;
    min-width: 230px;
    height: 120px;

    & p, h4 {
        color: #fff;
        margin: 0;
    }

    ${(props) =>
      props.orange &&
      css`
        background: linear-gradient(to right,#fe9365,#feb798);
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #fe9365;
        }
    `}

    ${(props) =>
      props.green &&
      css`
        background: linear-gradient(to right,#0ac282,#0df3a3); 
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #0ac282;
        }   
    `}

    ${(props) =>
      props.red &&
      css`
        background: linear-gradient(to right,#fe5d70,#fe909d);
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #fe5d70;
        }
    `}

    ${(props) =>
      props.blue &&
      css`
        background: linear-gradient(to right,#2f45ff,#6675ff);
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #2f45ff;
        }
        
    `}

    ${(props) =>
      props.black &&
      css`
        background: linear-gradient(to right,#252b32,#505050);
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #252b32;
        }
    `}

    ${(props) =>
      props.yellow &&
      css`
        background: linear-gradient(to right,#facd10,#fbe480);
        & .MuiSvgIcon-root {
         font-size: 4rem;
         color: #facd11;
        }
        & p, h4 {
        color: #000;
        margin: 0;
        }
    `}

    & .card-block {
        padding: 1.25rem;
    }
    
    & h4 {
        font-size: 24px;
    }
     
`;
export const StyledFlex = styled.div`
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    align-items: stretch;
    width: 100%;

    ${(props) =>
      props.smallWidth &&
      css`
      max-width: 350px;
    `}

    ${(props) =>
      props.wrapFlex &&
      css`
      flex-wrap: wrap;
      justify-content: flex-start;
    `}

    ${(props) =>
      props.right &&
      css`
      margin-left: auto;
    `}
    ${(props) =>
      props.center &&
      css`
      align-items: center;
    `}
`;
