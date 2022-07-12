import React, { useContext, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';


const Categories = observer(() => {
    const {category} = useContext(Context) 
  

  return (
   
    <>
    <Row>
       <h2>Categories:</h2>
   {category.categories.map(categoryMap =>
    <Col md="4" >
     
    <div className="p-4 mb-2 " 
    style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border:categoryMap.id === category.selectedCategory.id ? '3px solid red' : '3px solid black'}}
      onClick={()=> category.setSelectedCategory(categoryMap) }  
     key={categoryMap.id}>
      
        <h1>{categoryMap.name}</h1>
        <h4>{categoryMap.spent}</h4>
    </div>
    </Col>
    
    )}
</Row>
    </>
  );
});

export default Categories