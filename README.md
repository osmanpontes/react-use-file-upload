# React useFileUpload

A React Hook to make dealing with files in an upload scenario easier. It extracts away a lot of the boilerplate that comes with allowing users to add their own files to your web application.

## API

### files

An array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.

```
File[]
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

### createFormData

A function that will prepare the `files` to be sent to an external API by creating a new [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, appending the `files` to it, and then returning the FormData object.

```
() => FormData
```

### handleFileDDEvent

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

A function that accepts a FileList as an argument, and converts it to an array.

```
(files: FileList) => void
```
