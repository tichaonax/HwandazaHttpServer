import React from 'react'

export const Suggestions = (props) => {
  let  options = []; 
  if(props.results){
  options = props.results.map(r => (
    <li>
      {r.Name}
    </li>
  ))}
  
  return <ul>{options}</ul>
}

export default Suggestions