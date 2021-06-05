import { useState, useCallback } from 'react';
import { useFileUploadHook } from './types';

/**
 * @function bytesToSize
 */
const bytesToSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const log = (Math.log(bytes) / Math.log(1024)).toString();
  const i = parseInt(log, 10);

  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)}${sizes[i]}`;
};

/**
 * @function getTotalSizeInBytes
 */
const getTotalSizeInBytes = (files: File[]): number => {
  return files.reduce((acc, file: File) => (acc += file.size), 0);
};

/**
 * @function handleFileDDEvent
 */
const handleFileDDEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * @ReactHook
 */
export const useFileUpload = (): useFileUploadHook => {
  const [files, setFilesState] = useState<File[]>([]);
  const [totalSize, setTotalSize] = useState('');
  const [totalSizeInBytes, setTotalSizeInBytes] = useState(0);

  /** @function setFiles */
  const setFiles = useCallback((files: FileList): void => {
    if (!(files instanceof FileList)) {
      console.error('argument supplied to setFiles must be of type: FileList');
    } else {
      const filesArr: File[] = Array.from(files);
      setFilesState(filesArr);
      handleSizes(filesArr);
    }
  }, []);

  /** @function handleSizes */
  const handleSizes = useCallback((files: File[]): void => {
    const sizeInBytes = getTotalSizeInBytes(files);
    const prettySize = bytesToSize(sizeInBytes);
    setTotalSizeInBytes(sizeInBytes);
    setTotalSize(prettySize);
  }, []);

  /** @function getFileNames */
  const getFileNames = () => {
    return files.map((file) => file.name);
  };

  /** @function getFileTypes */
  const getFileTypes = () => {
    return files.map((file) => file.type);
  };

  /** @function removeFile */
  const removeFile = useCallback(
    (file: number | string): void => {
      if (typeof file !== 'number' && typeof file !== 'string') {
        console.error('argument supplied to removeFile must be of type number or string.');
        return;
      }

      if (typeof file === 'string') {
        setFilesState(files.filter((_file: File) => _file.name !== file));
      } else {
        setFilesState(files.filter((_file: File, i) => i !== file));
      }
    },
    [files],
  );

  /** @function createFormData */
  const createFormData = useCallback((): FormData => {
    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    return formData;
  }, [files]);

  return {
    files,
    totalSize,
    totalSizeInBytes,
    createFormData,
    getFileNames,
    getFileTypes,
    handleFileDDEvent,
    removeFile,
    setFiles,
  };
};
