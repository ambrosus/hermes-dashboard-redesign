/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import RenderRoutes from './components/RenderRoutes';
import Layout from './layouts/Layout';
import routes from './routes';
import { signIn } from './store/modules/auth/actions';
import UiModal from './components/UiModal';
import CreateResultModal from './components/CreateResultModal';
import SearchModal from './components/SearchModal';
import ImportantInfoModal from './components/ImportantInfoModal';
import SecureKeysModal from './components/SecureKeysModal';
import { background } from 'stylelint-order/rules/shorthandData';
import './styles/Main.scss';

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
      <UiModal contentStyles={{ padding: 0 }} modalName="createResult">
        <CreateResultModal />
      </UiModal>
      <UiModal modalName="secureKeys">
        <SecureKeysModal />
      </UiModal>
      <UiModal modalName="searchModal" isFullWindow>
        <SearchModal />
      </UiModal>
      <UiModal
        contentStyles={{ background: 'rgba(0, 0, 0, 0.6)' }}
        modalName="importantInfoModal"
        isFullWindow
      >
        <ImportantInfoModal />
      </UiModal>
      <NotificationContainer />
    </Layout>
  );
};

export default Main;
