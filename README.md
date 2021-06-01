# React useFileUpload

A React Hook to make dealing with files in an upload scenario easier. It extracts away a lot of the boilerplate that comes with allowing users to add their own files to your web application.

## API

### files

```
File[]
```

### fileNames

```
string[]
```

### fileTypes

```
string[]
```

### totalSize

```
string
```

### totalSizeInBytes

```
number
```

### createFormData

```
() => FormData
```

### onFileDrag

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
