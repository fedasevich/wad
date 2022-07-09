import React, { useContext } from 'react'
import {observer} from 'mobx-react-lite'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Context } from '../index';


const Categories = observer(() => {
    const {category} = useContext(Context) 
  return (
    <ListGroup>
   {category.categories.map(categoryMap =>
      <ListGroup.Item active={categoryMap.id === category.selectedCategory.id} onClick={()=> category.setSelectedCategory(categoryMap)} key={categoryMap.id}>
        <h1>{categoryMap.name}</h1>
        <h4>{categoryMap.spent}</h4>
    </ListGroup.Item>
    )}
  </ListGroup>

  );
});

export default Categories