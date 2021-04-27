import React, { ReactElement, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { PublishRounded } from '@material-ui/icons';

import { OnMusicUpload } from '../../core/common';
import { MusicStorageContext } from '../../core/providers';

export function UploadNewMusic(): ReactElement {
  const db = useContext(MusicStorageContext);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files: File[] = Array.from((e.target as HTMLInputElement).files ?? []);
    return OnMusicUpload(db, files);
  };

  return (
    <>
      <input style={{ display: 'none' }} onChange={handleFileSelected} type="file" id="upload-file" />
      <label htmlFor="upload-file">
        {' '}
        <IconButton component="span" color="primary" aria-label="upload music">
          <PublishRounded fontSize="large" style={{ fill: 'rgb(var(--primary))' }} />
        </IconButton>
      </label>
    </>

  );
}
