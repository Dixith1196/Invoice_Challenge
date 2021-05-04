import React, {Component} from 'react'
import './invoice.css'
import CustomerList from '../../components/CustomerList/customerList'
import instance from '../../../utils/Networking/network'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import moment  from "moment";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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
      taxRate: 10,
      customerListDefault: {},
      customerList: [],
      tax: 0,
      subtotal: 0,
      customerName: "",
      memo: "",
      invoiceNumber: "",
      total: 0,
      showList: false,
        }
        this.deleteRow = this.deleteRow.bind(this)
        this.getLineItem = this.getLineItem.bind(this)
        this.getCustomerName = this.getCustomerName.bind(this)
      
    }

    addRow = () => {
        const {subtotal,tax, total,taxRate, options, selectedId, rows,selectedValue, selectedQty, selectedPrice, amount, price} = this.state;
        console.log(selectedValue, "--needed details are here--")

        if(rows.length == 0){
            this.setState(prevState => ({
                rows: [...prevState.rows, {"index": rows.length,"value": selectedValue, "amount": amount}],
            }))
        }else{
            if(selectedValue != "" && amount != ""){
                this.setState(prevState => ({
                    rows: [...prevState.rows, {"index": rows.length,"value": selectedValue, "amount": amount}],
                    subtotal: subtotal + amount,
                    tax: (subtotal + amount)/100*taxRate,
                    total: (subtotal + amount) + ((subtotal + amount)/100*taxRate)
                }))
                this.state.selectedPrice = "0"
                this.state.amount = ""    
            }else{
                toast.warning("Please fill all the fields to add an item to invoice")
            }
            }
              
        }

      deleteRow = (idx) => {
          console.log(idx, "idx is here---")
          var rows = [...this.state.rows];
            rows.splice((idx) , 1);
            this.setState({rows});
       
        console.log(rows,"---rows after deleting---")
    
      };

  
      componentDidMount(){
        this.getLineItem()
        console.log(this.state.rows,"---current rows are here---")
        var invNum = require('invoice-number')
       
        this.setState({
            invoiceNumber: Math.random().toString(36).substr(2, 9)
        })
      }

      changeQty = (e)=> {
          console.log(e.target.value * this.state.selectedPrice, "---amount is here---")
        this.setState({
            selectedQty: e.target.value,
            amount: e.target.value * this.state.selectedPrice
        })
      }


    getMemo = (e) => {
        this.setState({
            memo: e.target.value
        })
      }


      selectedItem = (e, i) => {
          console.log(e, i, "--- e ishere---")
         this.setState({
             selectedIdx: i,
             selectedValue: e.value, 
             selectedPrice: e.value.price,
         })
    }

    customerNameChange = (e) => {
       instance.get("/customer?firstname=" + e.target.value).then(res => {
           console.log(res,"---response is here---")
           this.setState({
               showList: true,
               customerList: res.data.data,
            //    customerName: res.data.data[0].firstname + " " + res.data.data[0].lastname
           })
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

    getCustomerName = (e) => {
        console.log(e,"---value is here---")
        var name = e.target.innerText
       
       this.setState({
           customerName: name,
           showList: false
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

       handlePageClick = ({ selected: selectedPage }) => {
           const {perPage} = this.state
          this.setState({
              currentPage: selectedPage
          })
    }

render(){
    const {rows,tax, memo, taxRate, showList,customerName, customerList, subtotal, total, selectedIdx, options, selectedValue, selectedQty, selectedPrice, price, amount} = this.state
    console.log(this.state.rows,"---current rows are here2---")
   {customerName &&  (document.getElementById("customerInput").value = customerName)}
    return(
         <div className="invoiceSection" id="container">
        <ToastContainer />
         <div style={{display: "flex", justifyContent: "space-around", marginTop: "16px", width: "100%", height: "72px"}}>
             <span style={{backgroundColor: "#fafafa",  width: "25%"}}>
                <h3 style={{margin: "0px", marginBottom: "8px"}}>Customer</h3>
                <input id="customerInput" onChange={this.customerNameChange}  style={{height: "72px",width: "100%",  border: "1px #000 solid"}}  placeholder={"  Customer Name"}/>
                 {customerList.length > 0 && showList && <CustomerList getCustomerName={this.getCustomerName}  customerList={customerList} />}
             </span>
             <span />
             <span style={{display: "flex", marginTop: "32px", flexDirection: "column", justifyContent: "space-evenly",backgroundColor: "#fafafa"}}>
               <span style={{display: "flex", flexDirection: "row", backgroundColor: "#fafafa"}}><h3 style={{margin: "0px", marginBottom: "8px"}}>#Invoice: </h3><label style={{alignSelf: "center", textAlign: "center", marginLeft: "8px",color: "gray"}}>{this.state.invoiceNumber}</label></span> 
               <span style={{display: "flex", flexDirection: "row", backgroundColor: "#fafafa"}}> <h3 style={{margin: "0px", marginBottom: "8px"}}>Invoice Date: </h3><label style={{alignSelf: "center", textAlign: "center", marginLeft: "8px", color: "gray"}}>{moment().format("MM-DD-YYYY")}</label></span> 
             </span>
         </div>
       
         <span style={{height: "2px", marginTop: "48px", backgroundColor: "rgb(171,171,171, 0.5)", width: "80%", borderRadius: "10px", backgroundClip: "content-box"}} />
    
          <div style={{width: "80%", margin: "8px", marginBottom: "64px"}}>
              <table style={{border: "1px solid #eee", borderRadius: "8px", padding: "8px"}}>
                  <thead style={{backgroundColor: "#1571E3", color: "#ffffff", borderRadius: "8px"}}>
                      <tr style={{border: "1px solid #eee", padding: "8px", borderRadius: "8px"}}>
                          <td>Item</td>
                          <td>Quantity</td>
                          <td>price</td>
                          <td>Amount</td>
                          <td>Actions</td>
                      </tr>
                  </thead>
                  <tbody style={{border: "1px solid #eee", padding: "8px"}}>
                     {rows.map((row, index) => {
                         console.log(rows[index],"--idx is here---")
                         var ix;
                       if(index == 0){
                          ix= 0
                       }else{
                           ix=index + 1
                       }
                       console.log(rows, "rows areh ere----")
                        return ( <tr>
                            <td>
                            {rows[index + 1] === undefined ?  <Select options={this.state.options}
                                onChange={e=> this.selectedItem(e, index)}></Select> 
                                : <label>{rows[index].value.item}</label> }
                                <br />
                                 {rows[index + 1] != undefined && <label>{rows[index + 1].value.details}</label> }
                                </td>
                            <td><input id="qty" onChange={this.changeQty} /></td>
                            <td>
                            {rows[index + 1] == undefined ?  <label>{selectedPrice}</label>  : <label>{rows[index + 1].value.price}</label>}
                                </td>
                            <td>
                            {rows[index + 1] == undefined ?  <label>{amount}</label>  : <label style={{color: "#gray"}}>{rows[index + 1].amount}</label>}
                               </td>
                            <td>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {this.deleteRow(ix)}}  />
                                </td>
                            </tr> )
                     })
                    } 
                  </tbody>
              </table>
              
              <button style={{marginTop: "8px", backgroundColor: "#fafafa", border: "0px", color: "#1571E3",}} className={"addItem"} onClick={this.addRow}>+ Add Item</button>
           <div>           
      </div>
            </div>
            <span style={{backgroundColor: "#fafafa", width: "100%", marginTop: "10%",  display: "flex", justifyContent: "space-around"}}>
            <span style={{display: "flex", flexDirection: "column", width: "25%", backgroundColor: "#fafafa"}}>
 
            <h3 style={{margin: "0px", marginBottom: "8px"}}>Memo</h3>
                           
        
                 <input style={{height: "100%", width: "100%", border: "1px #000 solid"}} value={memo} onChange={this.getMemo} placeholder={"  Add the memo of the invoice"}/>
                 </span>
                 <span style={{display: "flex",flexDirection: "column", width: "20%", padding: "16px", border: "0.5px #000 solid"}}>
                 
                 <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}> <label>Subtotal</label>  <label>${subtotal}</label></span>
                     <br />
                     <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}><label>Tax Rate</label><label>{taxRate}%</label></span>
                     <br />
                     <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}><label>Tax</label><label>{tax}</label></span>
                     <br />
                     <span style={{height: "1px", backgroundColor: "#adabab", width: "100%", borderRadius: "10px", backgroundClip: "content-box"}} />
                     <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}><label style={{marginTop: "8px", color: "#1571E3"}}>Total </label><label style={{marginTop: "8px", color: "#1571E3"}}>${total}</label></span>   
                 </span>
             </span>
             <button className={"addInvoice"} style={{backgroundColor: "#1571E3", padding: "12px", marginBottom: "16px", border: "0px", borderRadius: "4px", color: "#ffffff", marginTop: "16px", alignSelf: "flex-end", marginRight: "13%"}} onClick={() => this.createInvoice()}>+ Create Invoice</button>
          </div>
    )}

}

export default Invoice;