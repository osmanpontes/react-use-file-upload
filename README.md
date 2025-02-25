## Note 

This is a fork from [react-use-file-upload](https://www.npmjs.com/package/react-use-file-upload).

# React useFileUpload

A React Hook to make uploading files easier. It extracts away a lot of the boilerplate that comes with allowing users to attach and upload files to your web application. The default browser implementation for [uploading files](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) is lame, and doesn't allow you to remove attached files manually, or allow the user to select more files without deleting the previously attached ones.

This hook changes that, and allows you to remove, append, and write over files as you choose. You'll want to hide the default browser input, and create your own custom looking form.

## Installation

Installation is simple.

`npm i react-use-file-upload` or `yarn add react-use-file-upload`

## Usage

```js
import React, { useRef } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';

const Upload = () => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = createFormData();

    try {
      axios.post('https://some-api.com', formData, {
        'content-type': 'multipart/form-data',
      });
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };

  return (
    <div css={CSS}>
      <h1>Upload Files</h1>

      <p>Please use the form to your right to upload any file(s) of your choosing.</p>

      <div className="form-container">
        {/* Display the files to be uploaded */}
        <div css={ListCSS}>
          <ul>
            {fileNames.map((name) => (
              <li key={name}>
                <span>{name}</span>

                <span onClick={() => removeFile(name)}>
                  <i className="fa fa-times" />
                </span>
              </li>
            ))}
          </ul>

          {files.length > 0 && (
            <ul>
              <li>File types found: {fileTypes.join(', ')}</li>
              <li>Total Size: {totalSize}</li>
              <li>Total Bytes: {totalSizeInBytes}</li>

              <li className="clear-all">
                <button onClick={() => clearAllFiles()}>Clear All</button>
              </li>
            </ul>
          )}
        </div>

        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <div
          css={DropzoneCSS}
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
          }}
        >
          <p>Drag and drop files here</p>

          <button onClick={() => inputRef.current.click()}>Or select files to upload</button>

          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              setFiles(e, 'a');
              inputRef.current.value = null;
            }}
          />
        </div>
      </div>

      <div className="submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
```

Here is a photo of the example app above:

![example](https://user-images.githubusercontent.com/19492185/121057341-2b8e6300-c78d-11eb-9469-c46f1af39faf.png)

## API

### files

An array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects. if you need access to multiple properties of a File at a time, use this array instead of `fileNames` and `fileTypes`, which are mainly included in this hook for convenience.

```
File[]
```

### fileNames

An array containing just the names of the files.

```
string[]
```

### fileTypes

An array containing just the file types of the files.

```
string[]
```

### totalSize

A string that will pretty print the total size of the files. For example, `1024KB`, `2MB`, `4GB` etc.

```
string
```

### totalSizeInBytes

A number that represents the size of all of the files in bytes.

```
number
```

### clearAllFiles

A function that will remove all files in the `files` array.

```
() => void
```

### createFormData

A function that will prepare the `files` to be sent to an external API by creating a new [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, appending the `files` to it, and then returning the FormData object.

```
() => FormData
```

### handleDragDropEvent

A function that prevents you from writing boilerplate code, and will call `e.preventDefault` and `e.stopPropagation` behind the scenes.

```
(e) => void
```

### removeFile

A function that accepts a number(_index_) or string(_name of the file_) that will be used to remove a specific file from the `files` array.

```
(file: number | string) => void
```

### setFiles

A function that accepts the event emitted from the input field or drop zone, and creates an array of File objects. The default mode is set to, `w`, which means it will write over previous files each time new ones are attached. If you want previously attached files to not be deleted each time a user attaches new files, then you can opt in by calling setFiles like this, `setFiles(e, 'a')`, where the `a` stands for append. If you want the default behavior, there is no need to pass a second argument to this function.

```
(e: Event, mode = 'w') => void
```
