import s from './CarItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../redux/favorite/slice';
import { selectFavorites } from '../../../redux/favorite/selectors';

const CarItem = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const focus = favorites.includes(car.id);
  const formattedCity = car.address
    .split(' ')
    .slice(3, 4)
    .join(' ')
    .replace(',', '');
  const formattedCountry = car.address.split(' ').slice(4).join('');

  const handleToggle = () => {
    dispatch(toggleFavorite(car.id));
  };

  return (
    <>
      <article className={s.item}>
        <div className={s['image-container']}>
          <div
            style={{ backgroundImage: `url(${car.img})` }}
            className={s.image}
          ></div>
          <button className={s.button} type="button" onClick={handleToggle}>
            <svg
              className={`${s.icon} ${focus ? s.focus : ''}`}
              width="16"
              height="16"
            >
              <use href="/icons.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
        <div className={s['car-info']}>
          <div className={s['title-container']}>
            <h2 className={s.title}>
              {car.brand} <span className={s.model}>{car.model}</span>,
            </h2>
            <span className={s.year}>&nbsp;{car.year}</span>
            <span className={s.rentalPrice}>${car.rentalPrice}</span>
          </div>
          <ul className={s['info-list']}>
            <li>{formattedCity}</li>
            <li>{formattedCountry}</li>
            <li>{car.rentalCompany}</li>
          </ul>
          <ul className={`${s['info-list']} ${s['model-list']}`}>
            <li>{car.type}</li>
            <li>{`${car.mileage.toLocaleString('uk-UA')} km`}</li>
          </ul>
        </div>
      </article>
      <Link className={s.link} to={`/catalog/${car.id}`}>
        Read More
      </Link>{' '}
    </>
  );
};

export default CarItem;
