import React, {Component} from 'react'
import './invoice.css'
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import instance from '../../../utils/Networking/network'

class Invoice extends Component{
    constructor(props){
        super(props)
        this.state = {
           items: [],
           rows: [{
            desc: "Hello",
            quantity: 1,
            price: 1,
            amount: 1
           }]
        }
        // this.addRow = this.addRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.getLineItem = this.getLineItem.bind(this)
    }

    componentDidMount(){
        this.getLineItem()
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


      getLineItem = () => {
        //   const {items} = this.state.items;
        instance.get("/item").then(res => {
            console.log(res,"---response is here---")
            this.state.items = res.data.data
            console.log(this.state.items,"---items are here---")
        }).catch(e => {
            console.log(e,"---error is here---")
        })
      }
    
render(){
    return(
         <div className="invoiceSection">
         <div style={{display: "flex", position: "absolute", flexDirection: "column", right: "32px"}}>
             <label style={{marginTop: "8px", textAlign: "left"}}>Date:</label>
             <label>04/30/21</label>
         </div>
        <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-between", alignContent: "space-between", width: "100%", marginTop:"64px"}}>
            <div style={{marginLeft: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <label style={{textAlign: "left"}}>Billing To</label>
                <input style={{marginTop: "8px"}} placeholder="Custom Name" />
            </div>
            <div style={{marginRight: "32px", display: 'flex', flexDirection: "column"}}>
                <label>Invoice Number</label>
                <label style={{textAlign: "left", marginTop: "8px"}}>0123</label>                
            </div>
        </div>
          <div style={{marginTop: "48px"}}>
              <table style={{border: "1px solid #eee", padding: "8px"}}>
                  <thead>
                      <tr style={{border: "1px solid #eee", padding: "8px"}}>
                          <td>Item Description</td>
                          <td>Quantity</td>
                          <td>price</td>
                          <td>Amount</td>
                      </tr>
                  </thead>
                  <tbody style={{border: "1px solid #eee", padding: "8px"}}>
                  {this.state.rows.map(( listValue, index ) => {
          return ( <tr>
                      <td><input /></td>
                      <td><input /></td>
                      <td><input /></td>
                      <td>{listValue.amount}</td>
                      <td><button onClick={this.deleteRow}>Delete Item</button></td>
                      </tr> )})}
                  </tbody>
              </table>
              <button onClick={this.addRow}>Add Item</button>
              
          </div>
          <div style={{display: "flex", flexDirection: "row", position: "absolute", bottom: "100px"}}>
              <div>
                  <input />
              </div>
              <div>
                  <div>
                      <label>Sub Total</label>
                      <label>100</label>
                  </div>
                  <div>
                  <label>Tax</label>
                      <label>100</label>
                  </div>
                  <div>
                  <label>Total</label>
                      <label>100</label>
                  </div>
              </div>
          </div>
         {/* <Footer /> */}
        </div>
    )
}




}

export default Invoice