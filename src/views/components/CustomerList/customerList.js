import React from 'react';

const CustomerList = ({customerList=[], getCustomerName}) => {
    // const {getCustomerName} = props
  return (
    <>
    { customerList.map((data,index) => {
        if (data) {
          return (
            <div key={data.id} style={{position: "relative", height: "64px", backgroundColor: "red",  overflow: "scroll"}}>
                <ul style={{position: "relative", flex: 1}}>
                    <li onClick={(e) => getCustomerName(e)} style={{position: "absolute",margin: "4px"}}>{data.firstname}</li>
                </ul>
              {/* <h1>{data.firstname}</h1> */}
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default CustomerList