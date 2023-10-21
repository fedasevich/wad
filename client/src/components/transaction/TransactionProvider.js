import { observer } from 'mobx-react-lite';
import React from 'react';
import { Accordion, Button, ButtonGroup, ButtonToolbar, Card, Col, Row, useAccordionButton } from 'react-bootstrap';
import { useStore } from '../../store';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { DeleteCircleIcon, SortDownIcon, SortUpIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import { EditIcon } from '../../ui/Icons/WalletIcons/WalletIcons';
import { TRANSACTION_LIMITS } from '../../utils/constants';

function Actions({ setButtonVisible, category }) {
  const handleSortClick = () => {
    category.modifyTransactionsFilter({ sort: category.transactionsSort === 'DESC' ? 'ASC' : 'DESC', page: 1 });
    setButtonVisible(true);
  };

  const handleTransactionsLimitClick = (limit) => {
    category.modifyTransactionsFilter({ limit, page: 1 });
    setButtonVisible(true);
  };

  return (
    <Row>
      <ButtonToolbar className="justify-content-between mb-3" aria-label="Toolbar with button groups">
        <Button className="bg-none border-0 p-0 sortButton" onClick={handleSortClick}>
          {category.transactionsSort === 'DESC' ? <SortDownIcon /> : <SortUpIcon />}
        </Button>
        <ButtonGroup className="me-2 bg-light-blue component-half-border-radius" aria-label="Amount group">
          {TRANSACTION_LIMITS.map((limit) => (
            <Button
              key={limit}
              className={`bg-light-blue 
              border-0 px-2
              py-0
              rounded-3 ${category.transactionsLimit === limit ? 'active' : ''}`}
              onClick={() => handleTransactionsLimitClick(limit)}
            >
              {limit}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
    </Row>
  );
}

function LoadMore({ buttonVisible, fetchTransaction }) {
  const handleLoadMoreClick = async () => {
    await fetchTransaction();
  };

  return (
    <>
      {buttonVisible ? (
        <Button className="d-flex justify-content-center mt-4 bg-light-blue border-0" onClick={handleLoadMoreClick}>
          Load More
        </Button>
      ) : (
        <h4 className="text-center">There is nothing to load...</h4>
      )}
    </>
  );
}

function TransactionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      className="w-100 cursor-pointer"
      role="button"
      onKeyDown={decoratedOnClick}
      tabIndex={0}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const Transaction = observer(({ transaction, index, setChangeTransactionModal }) => {
  const { category, currency, wallet } = useStore();

  const categoryIconId = category.getIconIdFromCategoryById(transaction.categoryId);

  const transactionWallet = wallet.getWalletById(transaction.walletId);

  const isDeleted = categoryIconId === -1 || !transactionWallet;

  const handleDeleteClick = () => {
    category.deleteTransaction(transaction.id, transaction.walletId);
  };

  const handleChangeClick = () => {
    if (setChangeTransactionModal) {
      setChangeTransactionModal({ active: true, id: transaction.id });
    }
  };

  return (
    <Col md="12" className="d-inline-flex justify-content-between my-1 w-100">
      <Card className={`border-0 w-100 ${isDeleted ? 'text-decoration-line-through' : ''}`}>
        <Card.Header className="bg-none px-0 px-sm-3 d-flex w-100 justify-content-between border-0">
          <TransactionToggle eventKey={index}>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <Icons iconId={categoryIconId} />
                <h5 className="ms-3 mb-0">{transaction.description}</h5>
              </div>
              <h5 className={transaction.sum > 0 ? 'positive' : ''}>
                {transaction.sum.toFixed(2)}
                {currency.userCurrency.symbol}
              </h5>
            </div>
          </TransactionToggle>
        </Card.Header>

        <Accordion.Collapse eventKey={index}>
          <Card.Body className="d-flex justify-content-evenly bg-light-blue text-light component-one-third-border-radius-bottom">
            <button type="button" tabIndex={0} className="cursor-pointer" onClick={handleDeleteClick}>
              <DeleteCircleIcon />
              <span className="ms-2">Delete</span>
            </button>

            {setChangeTransactionModal && (
              <button type="button" tabIndex={0} className="cursor-pointer" onClick={handleChangeClick}>
                <EditIcon />
                <span className="ms-2">Change</span>
              </button>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Col>
  );
});

function TransactionDate({ date }) {
  return <h4 className="fw-medium">{date}</h4>;
}

const TransactionProvider = observer(({ children }) => {
  return <>{children}</>;
});

TransactionProvider.Transaction = Transaction;
TransactionProvider.Transaction.Date = TransactionDate;
TransactionProvider.Actions = Actions;
TransactionProvider.LoadMore = LoadMore;

export default TransactionProvider;
