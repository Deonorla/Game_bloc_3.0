import React from 'react';
import Hubdata from '../Features/Hubdata';

const Test = () => {
  return (
      <div>
          good
      
           {Hubdata.map((item, index) => {
               <p>{ item.title }</p>
            })

            }
    </div>
  )
}

export default Test;