import React from 'react';
import {
  FileDragAreaInfo,
  FileDragAreaContextProvider
} from '../../components/FileDragArea';
import PendingUploads from '../upload/PendingUploads';
import Bookmarks from './Bookmarks';
import ItemInfo from './ItemInfo';
import FileManager from './FileManager';

const BrowseRoute = () => {
  return (
    <FileDragAreaContextProvider>
      <PendingUploads />
      <FileDragAreaInfo />
      <div className="px-8 flex">
        <Bookmarks className="w-60" />
        <FileManager className="flex-grow" />
        <ItemInfo className="w-60" name="ok" />
      </div>
    </FileDragAreaContextProvider>
  );
};

export default BrowseRoute;
