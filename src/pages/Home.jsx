import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaCard from '../components/PizzaBlock/PizzaCard/PizzaCard';
import SkeletonCard from '../components/PizzaBlock/SkeletonCard/SkeletonCard';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzas);
  const { categoryId, currentPage, searchValue, sort } = useSelector(selectFilter);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем их в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((item) => item.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;

      console.log('sort1: ', sort);
    }
    console.log('sort123');
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('1');
    console.log('sort2: ', sort);

    if (!isSearch.current) {
      getPizzas();
      console.log('2');
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortProperty: sort.sortProperty,
      });
      console.log('3');
      navigate(`?${queryString}`);
    }
    console.log('4');

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        search,
        sort,
        currentPage,
      }),
    );
  };

  const pizzas = items.map((obj) => <PizzaCard key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, i) => <SkeletonCard key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'success' ? pizzas : skeletons}</div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
