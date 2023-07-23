import { observer } from 'mobx-react-lite';
import React from 'react';
import { Accordion, Button, ButtonGroup, ButtonToolbar, Card, Col, Row } from 'react-bootstrap';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { DeleteCircleIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import { EditIcon } from '../../ui/Icons/WalletIcons/WalletIcons';
import { TRANSACTION_LIMITS } from '../../utils/constants';



const Actions = ({ setButtonVisible, category }) => {
  const handleSortClick = () => {
    category.setTransactionsSort(category.transactionsSort === 'DESC' ? 'ASC' : 'DESC');
    category.setTransactionsPage(1);
    setButtonVisible(true);
  };

  const handleTransactionsLimitClick = (limit) => {
    category.setTransactionsLimit(limit);
    category.setTransactionsPage(1);
    setButtonVisible(true);
  };

  return (
    <Row>
      <ButtonToolbar className="justify-content-between mb-3" aria-label="Toolbar with button groups">
        <Button className="bg-light-blue border-0" onClick={handleSortClick}>
          Sort
        </Button>
        <ButtonGroup className="me-2" aria-label="First group">
          {TRANSACTION_LIMITS.map((limit) => (
            <Button key={limit} className="bg-light-blue border-0" onClick={() => handleTransactionsLimitClick(limit)}>
              {limit}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
    </Row>
  );
};

const LoadMore = ({ buttonVisible, setButtonVisible, fetchTransaction }) => {
  const handleLoadMoreClick = async () => {
    try {
      const data = await fetchTransaction();
      if (!data.rows.length) {
        setButtonVisible(false);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      {buttonVisible ? (
        <Button className="d-flex justify-content-center mt-4 bg-light-blue border-0" onClick={handleLoadMoreClick}>
          Load More
        </Button>
      ) : (
        <h2 className="text-center">There is nothing to load...</h2>
      )}
    </>
  );
};

const Transaction = observer(({ transaction, category, wallet, index, setChangeTransactionModal }) => {
  const isDeleted = transaction.categoryId === -1 || transaction.walletId === -1;

  const handleDeleteClick = () => {
    category.deleteTransaction(transaction.id, transaction.categoryId, transaction.walletId, wallet);
  };

  const handleChangeClick = () => {
    if (setChangeTransactionModal) {
      setChangeTransactionModal({ active: true, id: transaction.id });
    }
  };

  return (
    <Col md="12" className="d-inline-flex justify-content-between mt-3 w-100">
      <Card className={`border-0 w-100 ${isDeleted ? 'text-decoration-line-through' : ''}`}>
        <Card.Header className="bg-none d-flex w-100 justify-content-between border-0">
          <div className="d-flex flex-row align-items-center">
            <Icons iconId={category.getIconIdFromCategoryById(transaction.categoryId)} />
            <h4 className="ms-3 mb-0">{transaction.description}</h4>
          </div>
          <h4>-{transaction.sum} {wallet.getCurrencyFromWalletById(transaction.walletId)}</h4>
        </Card.Header>

        <Accordion.Collapse eventKey={index}>
          <Card.Body className="d-flex justify-content-evenly bg-light-blue text-light component-one-third-border-radius-bottom">
            <div className="cursor-pointer" onClick={handleDeleteClick}>
              <DeleteCircleIcon />
              <span className="ms-2">Delete</span>
            </div>

            {setChangeTransactionModal && (
              <div className="cursor-pointer" onClick={handleChangeClick}>
                <EditIcon />
                <span className="ms-2">Change</span>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Col>
  );
});

const TransactionDate = ({ date }) => {
  return <h3>{date}</h3>;
};

const TransactionProvider = observer(({ children }) => {
  return <>{children}</>;
});

TransactionProvider.Transaction = Transaction;
TransactionProvider.Transaction.Date = TransactionDate;
TransactionProvider.Actions = Actions;
TransactionProvider.LoadMore = LoadMore;

export default TransactionProvider;
