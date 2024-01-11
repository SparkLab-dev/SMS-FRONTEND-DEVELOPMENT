import { Container, Snackbar } from "@mui/material";
import { ItemPrices } from "Components/Item/style/Item.style";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { FC, useCallback } from "react";
import SnackBar from "./SnackBar/SnackBar.component";
import { removeSnackbarByID } from "redux/actions/actions-snackbar";
import { createPortal } from "react-dom";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { SnackBarContainer } from "./style/SnackbarList.style";

const SnackBarList: FC<{}> = () => {
  const snackbarPortalElement = document.getElementById("snackbar-root");
  const { items } = useAppSelector((state) => state.snackbar);
  const dispatch: AppDispatch = useDispatch();

  const closeSnackbarHandler = useCallback(
    (id: string | number) => {
      dispatch(removeSnackbarByID(String(id)));
    },
    [dispatch]
  );

  if (snackbarPortalElement == null || !items || ItemPrices.length < 1)
    return <></>;
  return (
    <>
      {createPortal(
        <SnackBarContainer>
          {items.map((snackData, _) => (
            <SnackBar
              key={snackData!.id}
              id={snackData!.id}
              type={snackData.type}
              message={snackData.message}
              onSnackClose={closeSnackbarHandler}
            />
          ))}
        </SnackBarContainer>,
        snackbarPortalElement
      )}
    </>
  );
};

export default SnackBarList;
