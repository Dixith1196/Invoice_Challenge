import React, {Component} from 'react'
import './invoice.css'
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import instance from '../../../utils/Networking/network'
//mport { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select'

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
           },
           {
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
           },
           {
            desc: "Hello",
            quantity: 1,
            price: 1,
            amount: 1
           }],
            options: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
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
         
         <div>
             <span>
                 <input />
             </span>
             <span />
             <span>
                 <label>#Invoice:</label>
                 <label>Invoice Date:</label>
             </span>
         </div>
          <div style={{width: "80%", margin: "64px"}}>
              <table style={{border: "1px solid #eee", padding: "8px"}}>
                  <thead style={{backgroundColor: "#1571E3", color: "#ffffff"}}>
                      <tr style={{border: "1px solid #eee", padding: "8px"}}>
                          <td>Item</td>
                          <td>Quantity</td>
                          <td>price</td>
                          <td>Amount</td>
                          <td>Delete</td>
                      </tr>
                  </thead>
                  <tbody style={{border: "1px solid #eee", padding: "8px"}}>
                  {this.state.rows.map(( listValue, index ) => {
          return ( <tr>
                      <td><Select options={this.state.options} /></td>
                      <td><input /></td>
                      <td><input /></td>
                      <td>{listValue.amount}</td>
                      <td>
                          <FontAwesomeIcon  />
                          </td>
                      </tr> )})}
                  </tbody>
              </table>
              <button onClick={this.addRow}>Add Item</button>
          </div>
         {/* <Footer /> */}
        </div>
    )
}




}

export default Invoice