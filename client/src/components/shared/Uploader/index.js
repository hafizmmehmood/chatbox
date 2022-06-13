import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';
import { AddImageIcon, CrossIcon } from '../../../utils/Icons';
import { serverUrl } from '../../../config/config';

const Dropzone = (props) => {
  const {
    actionState,
    upload,
    setUpload,
    name,
    setFieldValue,
    touched,
    errors,
    description,
    validationSchema
  } = props;
  const [files, setFiles] = useState([]);
  const [fileLargeError, setFileLargeError] = useState(false);

  useEffect(() => {
    if (upload && upload.preview) {
      setFiles([upload]);
    } else {
      if (actionState && upload) {
        setFiles([
          { name: upload, path: upload, preview: serverUrl + '/' + upload }
        ]);
      } else setFiles([]);
    }
  }, [actionState, upload]);
  const { isDragActive, open, getRootProps, getInputProps } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
      multiple: false,
      accept: 'image/jpg, image/jpeg,image/png',
      minSize: 0,
      maxSize: 1000 * 350,
      onDrop: (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles) {
          setFiles(rejectedFiles);
        }
        setFileLargeError(
          rejectedFiles &&
            rejectedFiles[0] &&
            rejectedFiles[0].errors &&
            rejectedFiles[0].errors[0].code
        );

        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
        if (setUpload)
          setUpload(
            acceptedFiles && acceptedFiles.length > 0
              ? acceptedFiles[0]
              : props.icon
          );
        if (setFieldValue) {
          setFieldValue(name, acceptedFiles[0]);
        }
      }
    });
  const thumbs = files.map((file) => (
    <div className="flex items-center">
      <img className="w-12 h-12 pr-2" src={file.preview} alt="..." />
      <span className="font-sm">{file.name}</span>
    </div>
  ));
  return (
    <div className="w-full h-full relative p-2 flex justify-center items-center">
      <div className="dropzone rounded">
        <div {...getRootProps({ className: 'dropzone-upload-wrapper ' })}>
          <input {...getInputProps()} />
          <div className="dropzone-inner-wrapper rounded dropzone-avatar mx-0 ">
            <Button onClick={open} id="file-submit" className=" text-black">
              {!isDragActive && thumbs.length === 0 && (
                <div className="flex overflow-hidden justify-center align-center">
                  <span className="">{AddImageIcon}</span>
                  <p className="p-2">{description} </p>
                </div>
              )}
              {thumbs.length > 0 && (
                <div className="w-full h-full">{thumbs}</div>
              )}
            </Button>
            {files.map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  setFieldValue(name, '');
                  setFiles([]);
                }}
                className="absolute pointer"
                style={{ top: '5px', right: '5px' }}>
                {CrossIcon}
              </span>
            ))}
          </div>
        </div>
        {fileLargeError && (
          <div
            style={{
              color: '#ff4d4d',
              fontSize: '12px',
              marginLeft: '15px'
            }}>
            {fileLargeError === 'file-too-large'
              ? 'Image is too large'
              : fileLargeError === 'file-invalid-type'
              ? 'Invalid file type. Only jpg, jpeg and png files are allowed'
              : 'File not Uploaded'}
          </div>
        )}
      </div>
      {validationSchema ? (
        <div>
          {errors && touched && (
            <p
              style={{
                color: '#ff4d4d',
                fontSize: '12px',
                marginLeft: '15px'
              }}>
              {errors}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default Dropzone;
