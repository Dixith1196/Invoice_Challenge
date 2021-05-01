import React from 'react'
import './button.css'


function Button(props){
    return(
        <div>
            <div>icon</div>
            <div>{props}</div>
        </div>
    )
}

export default Button;