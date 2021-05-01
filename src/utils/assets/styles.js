import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

 p{
     font-size: 32px;
     padding: 0;
 }

 span{
     background: #ffffff;
 }

 table{
     background-color: #ffffff;
     width: 100%;
     border-collapse: collapse;
 }

 thead, td {
  padding: 15px;
  text-align: left;
  border-collapse: collapse;
}

tbody{
  border-collapse: collapse;
}

 label{
     font-size: 16px;
 }

    input {
        outline: 0;
        border-width: 0 0 2px;
        border-color: #DEDEDE;
      }
      input:focus {
        border-color: #000
      }
 


`;

export default GlobalStyle;