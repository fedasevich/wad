import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useReducer } from 'react';
import { Col } from 'react-bootstrap';
import Loader from '../components/loader/Loader';
import PageProvider from './PageProvider';

const Categories = lazy(() => import('../components/category/Categories'));
const CreateCategory = lazy(() => import('../components/category/CreateCategory'));
const EditCategory = lazy(() => import('../components/category/EditCategory'));

export const CategoryDispatchContext = React.createContext(null);

const reducer = (page, { operation, id, dispatch }) => {
  switch (operation) {
    case 'EDIT_CATEGORY':
      return <EditCategory id={id} dispatch={dispatch} />;
    case 'CREATE_CATEGORY':
      return <CreateCategory dispatch={dispatch} />;
    default:
      return false;
  }
};

const Category = observer(() => {
  const [selectedPage, dispatch] = useReducer(reducer, null);

  return (
    <PageProvider pageName={selectedPage && 'Categories'}>
      <Suspense fallback={<Loader isFullHeight={!selectedPage} />}>
        <CategoryDispatchContext.Provider value={dispatch}>
          {selectedPage || (
            <Col xl={12} className="px-0 px-md-0 vh-80">
              <Categories />
            </Col>
          )}
        </CategoryDispatchContext.Provider>
      </Suspense>
    </PageProvider>
  );
});

export default Category;
