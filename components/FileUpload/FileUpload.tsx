import React, { ChangeEvent, ReactNode, useRef } from 'react'

export interface IFileUploadProps {
  setFile: Function;
  accept: string;
  children: ReactNode;
}

const FileUpload = ({setFile, accept, children}: IFileUploadProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);

  }

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{display: 'none'}}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

export default FileUpload