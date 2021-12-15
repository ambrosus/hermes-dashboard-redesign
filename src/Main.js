import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderRoutes from './components/RenderRoutes';
import Layout from './layouts/Layout';
import routes from './routes';
import './styles/Main.scss';
import { signIn } from './store/modules/auth/actions';
import { fetchEventsInfo } from './store/modules/assets/actions';

const Main = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const privateKeyFromSession = sessionStorage.getItem('user_private_key');

    if (privateKeyFromSession) {
      dispatch(signIn(privateKeyFromSession));
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchEventsInfo());
    }
  }, [isAuth]);

  return (
    <Layout>
      <RenderRoutes routes={routes} />
    </Layout>
  );
};

export default Main;
