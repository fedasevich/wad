import { observer } from 'mobx-react-lite'
import React, { useReducer } from 'react'
import { Col } from 'react-bootstrap'
import Categories from '../components/category/Categories'
import CreateCategory from '../components/category/CreateCategory'
import EditCategory from '../components/category/EditCategory'
import PageProvider from './PageProvider'

export const CategoryDispatchContext = React.createContext(null);

const Category = observer(() => {
  const [selectedPage, dispatch] = useReducer(reducer, null)

  function reducer(page, { operation, id, dispatch }) {
    switch (operation) {
      case "EDIT_CATEGORY":
        return <EditCategory id={id} dispatch={dispatch} />
      case "CREATE_CATEGORY":
        return <CreateCategory dispatch={dispatch} />
      default:
        return false
    }
  }
  return (
    <PageProvider pageName={selectedPage && "Categories"}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {
          selectedPage ||
          <Col xl={12} className='px-0 px-md-0 vh-80'>
            <Categories />
          </Col>
        }
      </CategoryDispatchContext.Provider>
    </PageProvider>
  )
})

export default Category