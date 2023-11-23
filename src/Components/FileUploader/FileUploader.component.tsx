import { FC, useState, ChangeEvent } from "react";

//mui-icons
import AttachFileIcon from "@mui/icons-material/AttachFile";

//style
import {
  AddFileText,
  AttachInput,
  AttachmentInputHolder,
  AttachmentLabel,
  AttachmentUploadButton,
  AttachmentUploadButtonImgDiv,
  FileUploadDoneButton,
  FileUploaderContainer,
  UploadedFiles,
} from "./style/FileUploader.style";

export interface File {
  name: string;
}
interface FileUploaderProps {
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  closeFileUploader: React.Dispatch<React.SetStateAction<boolean>>;
}


const FileUploader: FC<FileUploaderProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDone = () => {
    props.setAttachments(files);
    props.closeFileUploader(false);
  };

  let displayFiles;
  const fileUpload = new DataTransfer();

  if (files.length > 0) {
    displayFiles = files.map((f, index) => {
      const handleSingleFileDelete = () => {
        setFiles(files.filter((a) => a !== f));
        const attachmentInput =
          document.querySelector<HTMLInputElement>("#attachment");
        if (attachmentInput) {
          attachmentInput.files = fileUpload.files;
        }
      };
      return (
        <div
          key={index}
          style={{
            backgroundColor: "#e5f7fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px",
            fontSize: "14px",
          }}
        >
          <div className="uploaded-file-name">{f.name}</div>
          <div
            onClick={handleSingleFileDelete}
            className="uploaded-file-remove-button"
          >
            Remove
          </div>
        </div>
      );
    });
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      fileUpload.items.add(fileList[0]);
      setFiles((files) => [...files, { name: fileList[0].name }]);
    }
  };

  return (
    <FileUploaderContainer>
      <UploadedFiles>{displayFiles}</UploadedFiles>
      <AttachmentInputHolder>
        <AttachmentLabel htmlFor="attachment">
          <AttachmentUploadButton>
            <AttachmentUploadButtonImgDiv>
              <AttachFileIcon />
            </AttachmentUploadButtonImgDiv>
            <AddFileText>Add File</AddFileText>
          </AttachmentUploadButton>
        </AttachmentLabel>
        <AttachInput id="attachment" type="file" onChange={handleFileChange} />
      </AttachmentInputHolder>
      <FileUploadDoneButton onClick={onDone}>Done</FileUploadDoneButton>
    </FileUploaderContainer>
  );
};

export default FileUploader;
