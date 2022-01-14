import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UiInput from '../../../../components/UiInput';
import searchIcon from '../../../../assets/svg/search.svg';
import AssetItem from '../../../../components/AssetItem';
import {
  searchAssets,
  setSearchedAssets,
} from '../../../../store/modules/assets/actions';
import { useDebouncedEffect } from '../../../../utils/useDebounce';

const Search = () => {
  const dispatch = useDispatch();
  const { searchedAssetsList } = useSelector((state) => state.assets);
  const [name, setName] = useState('');

  useDebouncedEffect(
    () => {
      if (name) {
        dispatch(
          searchAssets([
            {
              field: 'content.data.name',
              operator: 'contains',
              value: name,
            },
          ]),
        ).then((res) => dispatch(setSearchedAssets(res)));
      }
    },
    [name],
    500,
  );

  return (
    <div className="search-result-page search-page">
      <h1 className="search-page__title">Search Results</h1>
      <UiInput
        placeholder="Name"
        className="search-result-page__input"
        imgSrc={searchIcon}
        onChange={setName}
        value={name}
      />
      <p className="search-result-page__count">
        Found {searchedAssetsList.length} results
      </p>
      <div>
        {searchedAssetsList.map((el) => (
          <AssetItem assetData={el} key={el.content.idData.assetId} />
        ))}
      </div>
    </div>
  );
};

export default Search;
