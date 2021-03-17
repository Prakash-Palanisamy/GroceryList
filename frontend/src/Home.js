import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

   const date = new Date();
   const month = monthNames[date.getMonth()];

   const [allGroceryItems, setAllGroceryItems] = useState([]);
   useEffect(() => {
     fetch(`http://localhost:5000/grocery/getAll`)
       .then((response) => response.json())
       .then(({allGroceryItems }) => {
        setAllGroceryItems(allGroceryItems);
       });
   }, []);

  // console.log(allGroceryItems)

  const deleteItem =(id) =>{
    axios.delete('http://localhost:5000/grocery/deleteGroceryItem',{ data: { _id: id } });
    window.location.reload(false);
  };

  const purchaseItem =(id) =>{
    axios.put('http://localhost:5000/grocery/updatePurchaseStatus',{ _id: id , isPurchased: true } );
    window.location.reload(false);
  };

  const something=(event)=> {
    if (event.keyCode === 13) {
        axios.post('http://localhost:5000/grocery/add',{  groceryItem: event.target.value  ,isPurchased: false } );
        console.log(event.target.value);
    }
}



    return (
       <div className="grid-container">
        <header className="row center"><p>Monthly Grocery Planning Application</p>  </header>
        <main>
            <div className="row center">
              <div className="container">
                <h1>Plan for the month of {month}</h1>
                <form>
                 <input id="groceryInput" type="text" placeholder="Add Shopping Item" onKeyDown={(e) => something(e) }></input>
                </form>
               
                {allGroceryItems.map((items) =>(
                    <div className="items" key={items._id}>
                    <h4>{ items.isPurchased === true ? <h4><strike>{items.groceryItem}</strike></h4>: <h4>{items.groceryItem}</h4>}</h4>
                    <button className="button button1" onClick={()=> purchaseItem(items._id)}>{items.isPurchased === false ? "Purchase":"Purchased"}</button>
                    <button className="button button2" onClick={()=> deleteItem(items._id)}>X</button>
                  </div>
                ))}                           
              </div>           
            </div>
        </main>
      </div>
    )
}

export default Home
