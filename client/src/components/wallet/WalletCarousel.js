import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { useStore } from '../../store';
import { WalletItem } from './WalletItem';

export const WalletCarousel = observer(({ selectedWallet, setSelectedWallet }) => {
  const { wallet } = useStore();

  const handleSelect = (index) => {
    setSelectedWallet(wallet.wallets[index]);
  };

  const defaultActiveIndex = selectedWallet ? wallet.wallets.findIndex((wallet) => wallet.id === selectedWallet.id) : 0;

  return (
    <>
      <Carousel
        activeIndex={defaultActiveIndex}
        interval={null}
        indicators={false}
        variant="dark"
        onSelect={handleSelect}
      >
        {wallet.wallets.map((wallet) => (
          <Carousel.Item key={wallet.id} className="wallet">
            <Card className="mx-5">
              <Card.Header className="d-flex mx-xxl-4 mx-lg-4 mx-xl-0 mx-0 mx-sm-2 flex-row justify-content-between align-items-center">
                <WalletItem wallet={wallet} />
              </Card.Header>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
});
