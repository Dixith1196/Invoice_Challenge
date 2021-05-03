import React, {Component} from 'react'
import './invoice.css'
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import instance from '../../../utils/Networking/network'
//mport { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select'
import ReactPaginate from 'react-paginate'

class Invoice extends Component{
    constructor(props){
      super(props)
      this.state = {
      items: [],
      rows: {"index":1, value: {}},
      offset: 0,
      data: [],
      perPage: 1,
      currentPage: 0,
      options: [],
      selectedId: "",
      selectedValue: "",
      selectedDescription: "",
      selectedQty: 0,
      price: "",
      selectedPrice: "",
      amount: "",
      addedItems: []
        }
        this.deleteRow = this.deleteRow.bind(this)
        this.getLineItem = this.getLineItem.bind(this)
      
    }

    addRow = () => {
        const {options, selectedId, rows,selectedValue, selectedQty, selectedPrice, amount, price} = this.state;
        console.log(selectedValue, selectedQty, price, amount, "--needed details are here--")
       var selectedItm = options.forEach(option => {
            console.log(option, "--options is here--")
            if(option.label == selectedValue){
                return option.value
            }
            this.setState(prevState => (
                console.log("--check how many times this calls--"),
                { 
                rows: {
                "index": this.state.rows.index + 1, 
                "value":  selectedItm
        },
            price: "",
                addedItems: [...prevState.addedItems, 
                    {
                        "id": selectedId,
                        "item": this.state.selectedValue,
                        "details":"this is a regular demo item",
                        "quantity": selectedQty,
                        "price": selectedPrice,
                        "amount": selectedQty * price,
                    },
                ]
            }))
        })
        // this.setState(prevState => (
        //     console.log("--check how many times this calls--"),
        //     { 
        //     rows: {
        //     "index": this.state.rows.index + 1, 
        //     "value":  
        //     {selectedQty: 0,
        //     selectedPrice: "",
        //     price: price,
        //     amount: ""
        // }},
        // price: "",
        //     addedItems: [...prevState.addedItems, 
        //         {
        //             "id": selectedId,
        //             "item": this.state.selectedValue,
        //             "details":"this is a regular demo item",
        //             "quantity": selectedQty,
        //             "price": selectedPrice,
        //             "amount": selectedQty * price,
        //         },
        //     ]
        // })
        
        // )

    //   }else{
    //       console.log("please fill all the details")
    //   }
    }
    
      deleteRow = () => {
        this.setState((prevState, props) => {
          return { rows: prevState.rows.slice(1) };
        });
      };

      componentDidMount(){
        this.getLineItem()
      }

      changeQty = (e)=> {
        this.setState({
            selectedQty: e.target.value,
            amount: e.target.value * this.state.selectedPrice
        })
      }


      selectedItem = (e) => {
          this.setState({
              selectedId: e.value.id,
              selectedValue: e.label,
              selectedDescription: e.value.details,
              price: e.value.price
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
    const {rows, options, addedItems, selectedQty, selectedPrice, price, amount} = this.state
   console.log(addedItems[0],amount,"how many times render calls")
 
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
               {[...Array(this.state.rows.index)].map((row, i) =>  {
                   console.log(this.state.rows,"--index is here--")
          return ( <tr>
                      <td>
                          <Select options={this.state.options}
                          onChange={this.selectedItem}></Select>
                          </td>
                      <td><input id="qty" onChange={this.changeQty} /></td>

                      <td>
                        <label>{price || rows.value.price}</label> 
                          </td>
                      <td>
                      {price  && <input value={(selectedQty * price)} />}
                         </td>
                      <td>

                          <FontAwesomeIcon  />
                          </td>
                      </tr> )})}
                  </tbody>
              </table>
              <button onClick={this.addRow}>Add Item</button>
            </div>
          </div>
    )}

}

export default Invoice;

   {/* {[...Array(this.state.options)].map((e, i) =>  {
          return ( <tr>
                      <td>
                          <Select options={this.state.options} onChange={this.selectedItem}><option>Hello</option></Select>
                          {/* {this.state.selectedItems.forEach((option, i) => <label> {
                              option.meta.lineItems.item
                          }</label>)} 
                          </td>
                      <td><input id="qty" /></td>
                      <td></td>
                      <td><input  /></td>
                      <td>
                          <FontAwesomeIcon  />
                          </td>
                      </tr> )})} */}