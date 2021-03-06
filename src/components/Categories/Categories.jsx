import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = React.memo(() => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={item}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'active' : null}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
