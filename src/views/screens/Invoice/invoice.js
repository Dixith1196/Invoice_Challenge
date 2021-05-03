import React, {Component} from 'react'
import './invoice.css'
import CustomerList from '../../components/CustomerList/customerList'
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
      taxRate: 10,
      customerListDefault: {},
      customerList: [],
      tax: 0,
      subtotal: 0,
      customerName: "",
      memo: ""
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
            // if(selectedValue != "" && amount != ""){
                this.setState(prevState => ({
                    rows: [...prevState.rows, {"index": rows.length,"value": selectedValue, "amount": amount}],
                    subtotal: subtotal + amount,
                    tax: (subtotal + amount)/100*taxRate,
                    total: (subtotal + amount) + ((subtotal + amount)/100*taxRate)
                }))
                this.state.selectedPrice = "0"
                this.state.amount = ""
                
            }
            // else{
            //     console.log("Please fill all the fields")
            // }
        }

       
    

    
      deleteRow = (idx) => {
          console.log(idx, "idx is here---")
     
          var rows = [...this.state.rows];

    // rows.forEach(row => {
    //     console.log(row.index, idx, "---indexes are here---")
        // if(row.index == idx){
            rows.splice((idx) , 1);
            this.setState({rows});
       
        console.log(rows,"---rows after deleting---")
    // })

        

      

        // this.setState((prevState, props) => {
        //   return { rows: prevState.rows.slice(idx) };
        // });
      };

  
      componentDidMount(){
        this.getLineItem()
        console.log(this.state.rows,"---current rows are here---")
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
        console.log(e.target.value,"---e is here---")
        console.log("/customer?firstname=" + (e.target.value),"--searhc value is here")
       instance.get("/customer?firstname=" + e.target.value).then(res => {
           console.log(res,"---response is here---")
           this.setState({
               customerList: res.data.data,
               customerName: res.data.data[0].firstname
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
       this.setState({
           customerName: e.target.innerText
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
    const {rows,tax, memo, taxRate, customerList, subtotal, total, selectedIdx, options, selectedValue, selectedQty, selectedPrice, price, amount} = this.state
    console.log(this.state.rows,"---current rows are here2---")
    
    return(
         <div className="invoiceSection" id="container">
         <div style={{display: "flex", justifyContent: "space-around", marginTop: "64px", width: "100%", height: "72px"}}>
             <span style={{backgroundColor: "#fafafa"}}>
                 To:
                 <br />
                 <br />
                <input onChange={e => this.customerNameChange(e)}  style={{height: "72px", border: "1px #000 solid"}}  placeholder={" Customer Name"}/>
                 {customerList.length > 0 && <CustomerList getCustomerName={this.getCustomerName}  customerList={customerList} />}
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
                 {/* <tr>
                            <td>
                            {rows[0] == undefined ?  <Select options={this.state.options}
                                onChange={e=> this.selectedItem(e, 0)}></Select> :  <label>{rows[0].value.item}</label> }
                                <br />
                                 {rows[0] != undefined && <label>{rows[0].value.details}</label> }
                                </td>
                            <td>
                             <input id="qty" onChange={this.changeQty} /> 
                                </td>
                            <td>
                       
                       {rows[0] == undefined ?  <label>{selectedPrice}</label>  : <label>{rows[0].value.price}</label>}
                                </td>
                            <td>
                           {}
                            {rows[0] == undefined ?  <input value={amount} /> : <label>{rows[0].amount}</label>}
                               </td>
                            <td>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {this.deleteRow(0)}}  />
                                </td>
                            </tr>             */}
                     {rows.map((row, index) => {
                         console.log(rows[index],"--idx is here---")
                         var ix;
                       if(index == 0){
                          ix= 0
                       }else{
                           ix=index + 1
                       }
                        return ( <tr>
                            <td>
                            {rows[index] != undefined ?  <Select options={this.state.options}
                                onChange={e=> this.selectedItem(e, index)}></Select> : <label>{rows[index].value.item}</label> }
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
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => {this.deleteRow(ix)}}  />
                                </td>
                            </tr> )
                     })
                    } 
                  </tbody>
              </table>
              
              <button style={{marginTop: "8px", backgroundColor: "#fafafa", border: "0px", color: "#1571E3"}}onClick={this.addRow}>+ Add Item</button>
           <div>
      </div>
            </div>
            <span style={{backgroundColor: "#fafafa", width: "100%", height: "15vh", bottom: "25px",  display: "flex", justifyContent: "space-around"}}>
                 <input style={{height: "100%", width: "25%", border: "1px #000 solid"}} value={memo} onChange={this.getMemo} placeholder={" Memo"}/>
                 <span style={{display: "flex",flexDirection: "column"}}>
                 
                <label>Subtotal: {subtotal}</label> 
                     <br />
                     <label>Tax Rate: {taxRate}%</label>
                     <br />
                     <label>Tax: {tax}</label>
                     <br />
                     <label>Total: {total}</label>
                 </span>
             </span>
             <button onClick={() => this.createInvoice()}>Create Invoice</button>
          </div>
    )}

}

export default Invoice;