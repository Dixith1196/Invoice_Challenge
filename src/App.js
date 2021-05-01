import React, {Fragment} from 'react'
import logo from './logo.svg';
import './App.css';
import Invoice from '../src/views/screens/Invoice/invoice'
import Header from '../src/views/components/Header/header'
import GlobalStyle from '../src/utils/assets/styles'


function App() {
  return (
    <Fragment>
      <GlobalStyle />
      {/* <div> */}
      <Header />
      <Invoice />
        {/* </div>  */}
    </Fragment>
  );
}

export default App;
