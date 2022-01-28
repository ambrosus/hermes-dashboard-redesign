import React from 'react';
import { useDispatch } from 'react-redux';
import UiButton from '../UiButton';
import { handleModal } from '../../store/modules/modal';

const SecureKeysModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(handleModal({ modalName: '' }));

  return (
    <div className="auth-modal-container">
      <h2>Securing Your Private Keys</h2>
      <p>
        Use hardware wallets to keep your private keys safe. A hardware wallet
        is a flash drive like device, designed specifically for storing your
        keys. These are HD wallets that generate private and public keys via
        mnemonic phrase or seed words when initialized. Some popular hardware
        devices that are used and trusted are Ledger Nano S and Trezor. Never
        keep private keys online, in a mail or in the cloud. There they are most
        susceptible to getting obtained by bad actors.
      </p>
      <p>
        If you don’t have a hardware wallet, you can temporarily keep your
        private keys or seed in an offline flash drive or HDD. These options are
        only safe as long as they are not in the hands of an attacker. One can
        also use offline drives that encrypt the data stored on them. This way
        you can add one more security layer for accessing your account. If there
        is no possibility to obtain a hardware wallet, the other option is paper
        wallet. A paper wallet is a piece of paper that prints the pair of
        private and public keys on it. To make it more secure, you can laminate
        it and store it in a vault.
      </p>
      <p>
        Never take a screenshot or picture of your private keys. It becomes
        easily obtainable by bad actors once they get access to your device.
        Instead, consider various cold storage solutions.
      </p>
      <h3>Reference links:</h3>
      <ul>
        <li>
          <a
            href="https://www.ledger.com/products/ledger-nano-s"
            target="_blank"
          >
            Ledger Nano S
          </a>
        </li>
        <li>
          <a href="https://trezor.io" target="_blank">
            Trezor
          </a>
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Hard_disk_drive"
            target="_blank"
          >
            HDD
          </a>
        </li>
        <li>
          <a href="https://en.bitcoin.it/wiki/Cold_storage" target="_blank">
            Cold storage
          </a>
        </li>
      </ul>
      <UiButton onclick={closeModal}>Close</UiButton>
    </div>
  );
};

export default SecureKeysModal;
