import React, {Fragment} from 'react'
import './App.css';
import Invoice from '../src/views/screens/Invoice/invoice'
import Header from '../src/views/components/Header/header'
import GlobalStyle from '../src/utils/assets/styles'


function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Invoice />
    </Fragment>
  );
}

export default App;
