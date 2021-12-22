import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RenderRoutes from './components/RenderRoutes';
import Layout from './layouts/Layout';
import routes from './routes';
import './styles/Main.scss';
import { signIn } from './store/modules/auth/actions';
import UiModal from './components/UiModal';
import CreateResultModal from './components/CreateResultModal';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const privateKeyFromSession = sessionStorage.getItem('user_private_key');

    if (privateKeyFromSession) {
      dispatch(signIn(privateKeyFromSession));
    }
  }, []);

  return (
    <Layout>
      <RenderRoutes routes={routes} />
      <UiModal modalName="createResult">
        <CreateResultModal />
      </UiModal>
    </Layout>
  );
};

export default Main;
