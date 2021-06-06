export type useFileUploadHook = {
  files: File[];
  fileNames: string[];
  fileTypes: string[];
  totalSize: string;
  totalSizeInBytes: number;
  clearAll: () => void;
  createFormData: () => FormData;
  handleDragDropEvent: (e: Event) => void;
  removeFile: (file: number | string) => void;
  setFiles: (files: FileList) => void;
};
