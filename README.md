# React useFileUpload

A React Hook to make dealing with files in an upload scenario easier. It extracts away a lot of the boilerplate that comes with allowing users to add their own files to your web application.

## API

### files

An array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects. When files are attached, they are converted from a FileList, to an array.

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

A function that will prepare the `files` to be sent to an external API by creating a new [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, appending the `files` to it, and returning that same FormData object.

```
() => FormData
```

### onFileDrag

A function that prevents you from writing boilerplate code in your input fields.

```
(e) => void
```

### removeFile

```
(index: number) => void
```

### setFiles

```
(files: FileList) => void
```
