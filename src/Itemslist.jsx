import React from 'react'

const Itemslist = (props) => {
    return (
        <>
         <p className="list_item" style={{textDecoration:`${props.style}`}}>{props.item}</p>
        </>
    )
}

export default Itemslist
