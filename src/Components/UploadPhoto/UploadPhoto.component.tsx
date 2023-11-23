import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  EditPhotoContainer,
  InputHold,
  PhotoEdit,
  PhotoPreview,
  Preview,
} from "./style/UploadPhoto.style";
import { LabelDescription } from "Components/GenericInput/style/GenericInput.style";

interface LogoProps {
  profilePhoto: string;
  profilePhotoType: string;
  reload: boolean;
  sendPhoto: (file: File) => void;
}

function UploadPhoto(props: LogoProps) {
  const [editLogoURL, setEditLogoURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditLogoURL(
      `data:${props.profilePhotoType};base64,${props.profilePhoto}`
    );
  }, [props.profilePhoto, props.profilePhotoType, props.reload]);

  const emptyfileList = new DataTransfer();

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.files = emptyfileList.files;
    }
  }, [props.reload, emptyfileList.files]);

  const handlePhotoUpdate = (file: File) => {
    props.sendPhoto(file);
  };

  console.log(
    document.querySelector<HTMLInputElement>("#imageUpload")
      ? document.querySelector<HTMLInputElement>("#imageUpload")?.files
      : ""
  );

  return (
    <EditPhotoContainer>
      <PhotoEdit>
        <InputHold
          type="file"
          id="imageUpload"
          accept=".png, .jpg, .jpeg"
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setEditLogoURL(URL.createObjectURL(file));
              handlePhotoUpdate(file);
            }
          }}
          ref={fileInputRef}
        />
        <LabelDescription onClick={() => fileInputRef.current?.click()}>
          <EditIcon />
        </LabelDescription>
      </PhotoEdit>
      <PhotoPreview>
        <Preview
          id="logoPreview"
          style={{ backgroundImage: `url(${editLogoURL ?? ""})` }}
        ></Preview>
      </PhotoPreview>
    </EditPhotoContainer>
  );
}
export default UploadPhoto;
