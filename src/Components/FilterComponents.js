import React from "react";
import { Typography } from "@mui/material";
export default function FilterComponent(props){
    const handleChange=(e)=>{
        console.log(e.target.value, e.target.checked);
    }
    return (
        <div>
            <Typography fontWeight={'700'}>{props.heading}</Typography>
            {props.values.map((val)=>(
                <label key={val}><input type="checkbox" onChange={(e)=>handleChange(e)} value={val}/>{val}<br/></label>
            ))}
        </div>
    );
}