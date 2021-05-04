import React from 'react';

const CustomerList = ({customerList=[], getCustomerName}) => {
    // const {getCustomerName} = props
  return (
    <>
    { customerList.map((data,index) => {
        if (data) {
          return (     
            <div key={data.id} style={{position: "relative", backgroundColor: "#ffffff", }}>
                <ul style={{backgroundColor: "#ffffff",  height: "50px"}}>
                  {data != undefined &&  <li onClick={(e) => getCustomerName(e)} style={{position: "absolute",cursor:"pointer", margin: "4px", color: "black"}}>{data.firstname + " " + data.lastname}</li> }
                </ul>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default CustomerList