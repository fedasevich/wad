import { Col, Container, Row } from 'react-bootstrap';
import { categoryIconsColors } from '../../../utils/constants';
import { ReactComponent as Airplane } from './airplane-outline.svg';
import { ReactComponent as Barbell } from './barbell.svg';
import { ReactComponent as Bus } from './bus.svg';
import { ReactComponent as Car } from './car-outline.svg';
import { ReactComponent as Charity } from './charity.svg';
import { ReactComponent as Cinema } from './cinema.svg';
import { ReactComponent as Earth } from './earth-outline.svg';
import { ReactComponent as EmiInsurance } from './emi-insurance.svg';
import { ReactComponent as Fitness } from './fitness-outline.svg';
import { ReactComponent as Fuel } from './fuel.svg';
import { ReactComponent as GameController } from './game-controller.svg';
import { ReactComponent as Gifts } from './gifts.svg';
import { ReactComponent as Home } from './home.svg';
import { ReactComponent as Household } from './household.svg';
import { ReactComponent as Investment } from './investment.svg';
import { ReactComponent as Jewelry } from './jewelry.svg';
import { ReactComponent as Library } from './library-outline.svg';
import { ReactComponent as Loan } from './loan.svg';
import { ReactComponent as Office } from './office.svg';
import { ReactComponent as Palette } from './palette.svg';
import { ReactComponent as Paw } from './paw-outline.svg';
import { ReactComponent as Phone } from './phone.svg';
import { ReactComponent as Pizza } from './pizza.svg';
import { ReactComponent as Rent } from './rent.svg';
import { ReactComponent as Restaurant } from './restaurant-outline.svg';
import { ReactComponent as Rose } from './rose-outline.svg';
import { ReactComponent as Taxi } from './taxi.svg';
import { ReactComponent as Tshirt } from './tshirt.svg';
import { ReactComponent as University } from './university.svg';
import { ReactComponent as Wifi } from './wifi-outline.svg';

export const icons = [
  {
    id: -1,
    backgroundColor: categoryIconsColors.DELETED,
    svg: 'deleted'
  },
  {
    id: 1,
    backgroundColor: categoryIconsColors.GROCERIES,
    svg: <Pizza />
  },
  {
    id: 2,
    backgroundColor: categoryIconsColors.HEALTH,
    svg: <Barbell />
  },
  {
    id: 3,
    backgroundColor: categoryIconsColors.SPORTS,
    svg: <Fitness />
  },
  {
    id: 4,
    backgroundColor: categoryIconsColors.TRANSPORT,
    svg: <Bus />
  },
  {
    id: 5,
    backgroundColor: categoryIconsColors.COSMETICS,
    svg: <Palette />
  },
  {
    id: 6,
    backgroundColor: categoryIconsColors.CLOTHES,
    svg: <Tshirt />
  },
  {
    id: 7,
    backgroundColor: categoryIconsColors.EDUCATION,
    svg: <University />
  },
  {
    id: 8,
    backgroundColor: categoryIconsColors.HOUSE,
    svg: <Home />
  },
  {
    id: 9,
    backgroundColor: categoryIconsColors.OFFICE,
    svg: <Office />
  },
  {
    id: 10,
    backgroundColor: categoryIconsColors.ANIMALS,
    svg: <Paw />
  },
  {
    id: 11,
    backgroundColor: categoryIconsColors.FLOWERS,
    svg: <Rose />
  },
  {
    id: 12,
    backgroundColor: categoryIconsColors.BOOKS,
    svg: <Library />
  },
  {
    id: 13,
    backgroundColor: categoryIconsColors.CINEMA,
    svg: <Cinema />
  },
  {
    id: 14,
    backgroundColor: categoryIconsColors.AIR_TRAVEL,
    svg: <Airplane />
  },
  {
    id: 15,
    backgroundColor: categoryIconsColors.LOAN_REPAYMENT,
    svg: <Loan />
  },
  {
    id: 16,
    backgroundColor: categoryIconsColors.ENTERTAINMENT,
    svg: <GameController />
  },
  {
    id: 17,
    backgroundColor: categoryIconsColors.TAXI,
    svg: <Taxi />
  },
  {
    id: 18,
    backgroundColor: categoryIconsColors.JEWELRY,
    svg: <Jewelry />
  },
  {
    id: 19,
    backgroundColor: categoryIconsColors.TRAVELS,
    svg: <Earth />
  },
  {
    id: 20,
    backgroundColor: categoryIconsColors.CAR,
    svg: <Car />
  },
  {
    id: 21,
    backgroundColor: categoryIconsColors.HOUSEHOLD_APPLIANCES,
    svg: <Household />
  },
  {
    id: 22,
    backgroundColor: categoryIconsColors.GIFTS,
    svg: <Gifts />
  },
  {
    id: 23,
    backgroundColor: categoryIconsColors.FUEL,
    svg: <Fuel />
  },
  {
    id: 24,
    backgroundColor: categoryIconsColors.INSURANCE,
    svg: <EmiInsurance />
  },
  {
    id: 25,
    backgroundColor: categoryIconsColors.INVESTMENTS,
    svg: <Investment />
  },
  {
    id: 26,
    backgroundColor: categoryIconsColors.CHARITY,
    svg: <Charity />
  },
  {
    id: 27,
    backgroundColor: categoryIconsColors.PHONE,
    svg: <Phone />
  },
  {
    id: 28,
    backgroundColor: categoryIconsColors.INTERNET,
    svg: <Wifi />
  },
  {
    id: 29,
    backgroundColor: categoryIconsColors.RENTAL_HOUSING,
    svg: <Rent />
  },
  {
    id: 30,
    backgroundColor: categoryIconsColors.CAFES_AND_RESTAURANTS,
    svg: <Restaurant />
  }
];

export function Icons({ iconId }) {
  const index = icons.findIndex((icon) => icon.id === iconId);

  return (
    <div
      style={{ backgroundColor: icons[index].backgroundColor }}
      className="bg-main-blue component-one-third-border-radius categoryIcon"
    >
      {icons[index].svg}
    </div>
  );
}

export function AllCategoryIcons({ selectedIcon, setSelectedIcon }) {
  return (
    <Container fluid>
      <Row className="all-icons-row">
        {icons
          .filter((icon) => icon.id > 0)
          .map((icon) => (
            <Col
              xs={6}
              sm={3}
              md={2}
              lg={2}
              xl={3}
              key={icon.id}
              className="mb-2 d-flex justify-content-center align-items-center text-center "
            >
              <div
                className="component-one-third-border-radius categoryIcon"
                style={{
                  outline: icon.id === selectedIcon?.id ? '2px solid black' : null,
                  backgroundColor: icon.backgroundColor
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIcon(icon);
                  }}
                >
                  {icon.svg}
                </button>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export const parseCategoriesIcons = (categories) =>
  categories.map((category) => icons.find((icon) => icon.id === category.iconId).backgroundColor);

export const getCategoryBackgroundColorByIconId = (id) => icons.find((icon) => icon.id === id).backgroundColor;
