export type useFileUploadHook = {
  files: File[];
  totalSize: string;
  totalSizeInBytes: number;
  createFormData: () => FormData;
  getFileNames: () => string[];
  getFileTypes: () => string[];
  handleFileDDEvent: (e: Event) => void;
  removeFile: (file: number | string) => void;
  setFiles: (files: FileList) => void;
};
