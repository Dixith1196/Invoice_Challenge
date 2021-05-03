import React, {Component} from 'react'
import './invoice.css'
import instance from '../../../utils/Networking/network'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import moment  from "moment";
class Invoice extends Component{
    constructor(props){
      super(props)
      this.state = {
      items: [],
      rows: [],
      offset: 0,
      data: [],
      perPage: 1,
      currentPage: 0,
      selectedIdx: 1,
      options: [],
      selectedId: "",
      selectedValue: "",
      selectedDescription: "",
      selectedQty: 0,
      price: "",
      selectedPrice: "0",
      amount: "",
      edit: false,
      customerName: ""
        }
        this.deleteRow = this.deleteRow.bind(this)
        this.getLineItem = this.getLineItem.bind(this)
      
    }

    addRow = () => {
        const {options, selectedId, rows,selectedValue, selectedQty, selectedPrice, amount, price} = this.state;
        console.log(selectedValue, "--needed details are here--")
       if(selectedValue != "" && amount != ""){
        this.setState(prevState => ({
            rows: [...prevState.rows, {"index": rows.length + 1,"value": selectedValue, "amount": amount}],
        }))
        this.state.selectedPrice = "0"
        this.state.amount = ""
    }else{
        console.log("Please fill all the fields")
    }
    }
    
      deleteRow = () => {
        this.setState((prevState, props) => {
          return { rows: prevState.rows.slice(1) };
        });
      };

      editRow = (idx) => {
          console.log("---edit now row---")
          const {rows} = this.state

          rows[idx] = undefined
          this.setState({
              edit: true
          })
      }

      componentDidMount(){
        this.getLineItem()
      }

      changeQty = (e)=> {
          console.log(e.target.value * this.state.selectedPrice, "---amount is here---")
        this.setState({
            selectedQty: e.target.value,
            amount: e.target.value * this.state.selectedPrice
        })
      }


      selectedItem = (e, i) => {
          console.log(e, i, "--- e ishere---")
         this.setState({
             selectedIdx: i,
             selectedValue: e.value, 
             selectedPrice: e.value.price
         })
    }

    customerNameChange = (e) => {
        console.log(e,"---e is here---")
       instance.get("/customer?firstName="(e.target.value)).then(res => {
           console.log(res,"---response is here---")
       }).catch(e => {
           console.log(e, "---error is here---")
       })
    }

    createInvoice = () => {
        const {rows} = this.state;
        const body = {
                "customer_id": "",
                "payment_method_id":"",
                "meta": {
                    "tax":2,
                    "subtotal":10,
                    "lineItems": rows
                },
                "total": "12.00",
                "url": "https://omni.fattmerchant.com/#/bill/",
                "send_now": false,
                "files": []
        }
        instance.post('/invoice', body).then(res => {
            console.log(res, "---response is here---")
        }).catch(e => {
            console.log(e,"---error is here---")
        })
    }

      getLineItem = (props) => { 
        instance.get("/item").then(res => {
            console.log(res.data.data, res.data.data.item,"--needs are here--")
            this.setState({
                items: res.data.data,
                currentPage: res.data.current_page,
                perPage: res.data.per_page,
            })
            this.state.items.forEach(item => {
                this.setState(prevState => ({
                    options: [...prevState.options, {value: item, label: item.item,
                    }]
                })) 
            })
        }).catch(e => {
            console.log(e,"---error is here---")
        })
      }
render(){
    const {rows, selectedIdx, options, selectedValue, selectedQty, selectedPrice, price, amount} = this.state
    return(
         <div className="invoiceSection">
         <div style={{display: "flex", justifyContent: "space-around", marginTop: "64px", width: "100%", height: "72px"}}>
             <span style={{backgroundColor: "#fafafa"}}>
                 To:
                 <br />
                 <br />
                 <input onChange={e => this.customerNameChange(e)} style={{height: "72px", border: "1px #000 solid"}}  placeholder={" Customer Name"}/>
             </span>
             <span />
             <span style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly",backgroundColor: "#fafafa"}}>
                 <label>#Invoice:</label>
                 <label>Invoice Date: {moment().format("MM-DD-YYYY")}</label>
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
                          <td>Actions</td>
                      </tr>
                  </thead>
                  <tbody style={{border: "1px solid #eee", padding: "8px"}}>
                 <tr>
                            <td>
                            {rows[0] == undefined ?  <Select options={this.state.options}
                                onChange={e=> this.selectedItem(e, 0)}></Select> :  <label>{rows[0].value.item}</label> }
                                <br />
                                 {rows[0] != undefined && <label>{rows[0].value.details}</label> }
                                </td>
                            <td><input id="qty" onChange={this.changeQty} /></td>
                            <td>
                       
                       {rows[0] == undefined ?  <label>{selectedPrice}</label>  : <label>{rows[0].value.price}</label>}
                                </td>
                            <td>
                           {}
                            {rows[0] == undefined ?  <input value={amount} /> : <label>{rows[0].amount}</label>}
                               </td>
                            <td>
                            <FontAwesomeIcon icon={faEdit} onClick={() => {this.editRow(0)}}  />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {this.deleteRow(0)}}  />
                                </td>
                            </tr> 
                     
                     {rows.map((row, index) => {
                         console.log(rows[index + 1],"--idx is here---")

                        return ( <tr>
                            <td>
                            {rows[index + 1] == undefined ?  <Select options={this.state.options}
                                onChange={e=> this.selectedItem(e, index)}></Select> : <label>{rows[index + 1].value.item}</label> }
                                <br />
                                 {rows[index + 1] != undefined && <label>{rows[index + 1].value.details}</label> }
                                </td>
                            <td><input id="qty" onChange={this.changeQty} /></td>
                            <td>
                            {rows[index + 1] == undefined ?  <label>{selectedPrice}</label>  : <label>{rows[index + 1].value.price}</label>}
                                </td>
                            <td>
                            {rows[index + 1] == undefined ?  <label>{amount}</label>  : <label>{rows[index + 1].amount}</label>}
                               </td>
                            <td>
                            <FontAwesomeIcon icon={faEdit}   />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {this.deleteRow(index)}}  />
                                </td>
                            </tr> )
                     })
                    }
                  </tbody>
              </table>
              <button style={{marginTop: "8px", backgroundColor: "#fafafa", border: "0px", color: "#1571E3"}}onClick={this.addRow}>+ Add Item</button>
            </div>
            {/* <span style={{backgroundColor: "#fafafa", width: "100%", height: "15vh", bottom: "25px", position: "absolute", display: "flex", justifyContent: "space-around"}}>
                 <input style={{height: "100%", width: "25%", border: "1px #000 solid"}}  placeholder={" Memo"}/>
                 <span style={{display: "flex",flexDirection: "column"}}>
                     <label>Subtotal: </label>
                     <br />
                     <label>Tax Rate: </label>
                     <br />
                     <label>Tax: </label>
                     <br />
                     <label>Total: </label>
                 </span>
             </span> */}
             <button onClick={() => this.createInvoice()}>Create Invoice</button>
          </div>
    )}

}

export default Invoice;