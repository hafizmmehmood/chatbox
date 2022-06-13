import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useDropzone } from 'react-dropzone';
import { AddPhotoIcon } from '../../../utils/Icons';

const UploadIcon = (props) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles([props.upload]);
  }, [props.upload]);

  const { isDragActive, open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      props.setupload(
        acceptedFiles && acceptedFiles.length > 0
          ? acceptedFiles[0]
          : props.icon
      );
    }
  });
  const thumbs = files.map((file) => (
    <div
      key={file?.name + props.key1}
      className="rounded-circle avatar-image overflow-hidden  d-100 bg-white text-center font-bold  flex justify-center align-center">
      <img
        className="img-fluid img-fit-container rounded-sm text-white"
        src={file?.preview}
        alt="..."
      />
    </div>
  ));
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file?.preview));
    },
    [files]
  );
  return (
    <>
      <Card className="card-box">
        <div className="pt-2 pb-2 flex align-center justify-center">
          <div className="dropzone rounded-circle shadow-sm">
            <div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
              <input {...getInputProps()} />
              <div className="dropzone-inner-wrapper d-100 rounded-circle dropzone-avatar">
                <div className="avatar-icon-wrapper d-100 rounded-circle m-2">
                  <Button
                    onClick={open}
                    id="file-submit"
                    className="avatar-button badge shadow-xxl btn-icon badge-position badge-position--bottom-right border-0 text-indent-0 d-30 badge-circle btn-success hover-scale-lg text-white">
                    {AddPhotoIcon}
                  </Button>
                  <div>
                    {!isDragActive && (
                      <div className="rounded-circle overflow-hidden d-100 bg-white text-center font-bold text-white-50 flex justify-center align-center"></div>
                    )}
                  </div>
                  {thumbs.length > 0 && <div>{thumbs}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default UploadIcon;
