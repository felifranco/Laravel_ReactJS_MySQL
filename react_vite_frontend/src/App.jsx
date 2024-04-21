import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import CustomModal from "./components/Common/CustomModal";
import ContactsIcon from "@mui/icons-material/Contacts";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import "./App.css";
import Form from "./components/Forms/Form";
import FormList from "./components/Forms/FormList";
import {
  setAddingContact,
  cancelAddingContact,
  cleanMessage,
} from "./store/Forms";

function App() {
  const isAddingContact = useSelector((state) => state.form.isAddingContact);
  const isLoading = useSelector((state) => state.form.isLoading);
  const message = useSelector((state) => state.form.message);
  const showMessage = useSelector((state) => state.form.showMessage);
  const isError = useSelector((state) => state.form.isError);

  const dispatch = useDispatch();

  const Message = () => {
    return showMessage ? (
      <Alert
        severity={isError ? "error" : "success"}
        variant="filled"
        sx={{ position: "absolute", right: 50, bottom: 50 }}
      >
        {message}
      </Alert>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (showMessage) {
        dispatch(cleanMessage());
      }
    }, 3000);
  }, [showMessage]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#F1F7E7",
      }}
    >
      {isLoading ? <LinearProgress color="secondary" /> : null}
      <Stack spacing={2} alignItems={"center"}>
        <AppBar
          position="relative"
          sx={{
            width: "90%",
            marginTop: 3,
            height: 100,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h2"
              color="white"
              sx={{ fontWeight: "bold", marginTop: 2 }}
            >
              Contactos
            </Typography>
            <ContactsIcon
              sx={{
                marginLeft: 2,
                marginTop: 3,
                fontSize: 50,
                color: "lightgray",
              }}
            />
          </Toolbar>
        </AppBar>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ControlPointIcon />}
          onClick={() => {
            dispatch(setAddingContact());
          }}
        >
          Agregar contacto
        </Button>
        <FormList />
        <Message />
      </Stack>
      <CustomModal
        open={isAddingContact}
        component={<Form />}
        handleClose={() => {
          dispatch(cancelAddingContact());
        }}
      />
    </Box>
  );
}

export default App;
