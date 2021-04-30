import React, {Component} from 'react'
import './index.css'
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'


class Invoice extends Component{
    constructor(props){
        super(props)
        this.state = {
           rows: [{
               desc: "Hello",
               quantity: 1,
               price: 1,
               amount: 1
           },
           {
            desc: "Hello",
            quantity: 1,
            price: 1,
            amount: 1
        }]
        }
        this.addRow = this.addRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }

    addRow = () => {
        this.setState((prevState, props) => {
          const row =  {
            desc: "Hello",
            quantity: 1,
            price: 1,
            amount: 1
        };
          return { rows: [...prevState.rows, row] };
        });
      };
    
      deleteRow = () => {
        this.setState((prevState, props) => {
          return { rows: prevState.rows.slice(1) };
        });
      };
    
   

render(){
    return(
        <div style={{display: "flex", flexDirection: "row"}}>
         <Header />
          <div className="invoiceSection">
              {/* <label>Invoice Challenge</label> */}
              <table>
                  <thead>
                      <tr>
                          <td>Item Description</td>
                          <td>Quantity</td>
                          <td>price</td>
                          <td>Amount</td>
                      </tr>
                  </thead>
                  <tbody>
                  {this.state.rows.map(( listValue, index ) => {
          return ( <tr>
                      <td>{listValue.desc}</td>
                      <td>{listValue.quantity}</td>
                      <td>{listValue.price}</td>
                      <td>{listValue.amount}</td>
                      </tr> )})}
                  </tbody>
              </table>
              <button onClick={this.addRow}>Add Item</button>
              <button onClick={this.deleteRow}>Delete Item</button>
          </div>
         <Footer />
        </div>
    )
}




}

export default Invoice