import React from 'react'

function ListFiles({files}) {
  return (
    <div>
      <h3>Uploaded Files</h3>
      {files.map((file) => {
        return(
            <li key={file.uuid}>
                <a href={file.downloadLink}>{file.filename}</a>
            </li>
        )
      })}
    </div>
  )
}

export default ListFiles;
