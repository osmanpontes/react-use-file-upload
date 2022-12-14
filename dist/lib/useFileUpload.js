"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileUpload = void 0;
const react_1 = require("react");
/**
 * @function formatBytes
 */
const formatBytes = (bytes, decimals = 2) => {
    if (typeof bytes !== 'number')
        return 'n/a';
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
/**
 * @function getTotalSizeInBytes
 */
const getTotalSizeInBytes = (files) => {
    return files.reduce((acc, file) => (acc += file.size), 0);
};
/**
 * @function handleDragDropEvent
 */
const handleDragDropEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
/**
 * @ReactHook
 */
const useFileUpload = () => {
    const [files, setFilesState] = (0, react_1.useState)([]);
    const [fileNames, setFileNames] = (0, react_1.useState)([]);
    const [fileTypes, setFileTypes] = (0, react_1.useState)([]);
    const [totalSize, setTotalSize] = (0, react_1.useState)('');
    const [totalSizeInBytes, setTotalSizeInBytes] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        setFileNames(files.map((file) => file.name));
        setFileTypes(files.map((file) => file.type));
        handleSizes(files);
    }, [files]);
    /** @function setFiles */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setFiles = (0, react_1.useCallback)((e, mode = 'w') => {
        var _a;
        let filesArr = [];
        if ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.files) {
            filesArr = Array.from(e.currentTarget.files);
        }
        else if (e === null || e === void 0 ? void 0 : e.dataTransfer.files) {
            filesArr = Array.from(e.dataTransfer.files);
        }
        else {
            console.error('Argument not recognized. Are you sure your passing setFiles an event object?');
        }
        if (mode === 'w') {
            setFilesState(filesArr);
        }
        else if (mode === 'a') {
            setFilesState([...files, ...filesArr]);
        }
    }, [files]);
    /** @function handleSizes */
    const handleSizes = (0, react_1.useCallback)((files) => {
        const sizeInBytes = getTotalSizeInBytes(files);
        const prettySize = formatBytes(sizeInBytes);
        setTotalSizeInBytes(sizeInBytes);
        setTotalSize(prettySize);
    }, []);
    /** @function removeFile */
    const removeFile = (0, react_1.useCallback)((file) => {
        if (typeof file !== 'number' && typeof file !== 'string') {
            console.error('argument supplied to removeFile must be of type number or string.');
            return;
        }
        if (typeof file === 'string') {
            setFilesState((previousFiles) => previousFiles.filter((_file) => _file.name !== file));
        }
        else {
            setFilesState((previousFiles) => previousFiles.filter((_file, i) => i !== file));
        }
    }, [files]);
    /** @function clearAllFiles */
    const clearAllFiles = (0, react_1.useCallback)(() => {
        setFilesState([]);
    }, []);
    /** @function createFormData */
    const createFormData = (0, react_1.useCallback)(() => {
        const formData = new FormData();
        for (const file of files) {
            formData.append(file.name, file);
        }
        return formData;
    }, [files]);
    return {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        clearAllFiles,
        createFormData,
        handleDragDropEvent,
        removeFile,
        setFiles,
    };
};
exports.useFileUpload = useFileUpload;
