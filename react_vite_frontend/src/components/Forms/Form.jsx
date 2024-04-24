import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { addForm, updateForm, cancelAttending } from "../../store/Forms";

const Form = () => {
  const isAttendingContact = useSelector(
    (state) => state.form.isAttendingContact
  );
  const attending = useSelector((state) => state.form.attending);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    id: 0,
    name: { valid: false, value: "" },
    email: { valid: false, value: "" },
    birth: { valid: false, value: "" },
    message: { valid: false, value: "" },
    image: { valid: false, value: "" },
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const inputFile = e.target.files[0];
      const imageBase64 = await toBase64(inputFile);
      setData({ ...data, image: { valid: true, value: imageBase64 } });
    }
  };

  const handleClickAdd = () => {
    if (isAttendingContact) {
      dispatch(
        updateForm({
          id: data.id,
          name: data.name.value,
          email: data.email.value,
          birth: data.birth.value,
          message: data.message.value,
          image: data.image.value,
        })
      );
      dispatch(cancelAttending());
    } else {
      dispatch(
        addForm({
          name: data.name.value,
          email: data.email.value,
          birth: data.birth.value,
          message: data.message.value,
          image: data.image.value,
        })
      );
    }
  };

  useEffect(() => {
    if (isAttendingContact) {
      setData({
        id: attending.id,
        name: { valid: attending.name ? true : false, value: attending.name },
        email: {
          valid: attending.email ? true : false,
          value: attending.email,
        },
        birth: {
          valid: attending.birth ? true : false,
          value: attending.birth,
        },
        message: {
          valid: attending.message ? true : false,
          value: attending.message,
        },
        image: {
          valid: attending.image ? true : false,
          value: attending.image,
        },
      });
    }
  }, [isAttendingContact, attending]);

  return (
    <Box sx={{ marginTop: 2, width: 500 }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{ marginBottom: 2 }}
        align="center"
      >
        Datos del contacto
      </Typography>
      <Stack spacing={3} alignItems={"center"}>
        <TextField
          fullWidth
          className="text-field"
          required
          id="name"
          label="Nombre completo"
          value={data.name.value}
          onChange={(e) => {
            setData({
              ...data,
              name: { valid: e.target.validity.valid, value: e.target.value },
            });
          }}
          helperText={!data.name.valid ? "Ingrese su nombre completo." : ""}
          error={!data.name.valid}
        />
        <TextField
          fullWidth
          className="text-field"
          required
          id="email"
          label="Correo electrónico"
          value={data.email.value}
          onChange={(e) => {
            setData({
              ...data,
              email: { valid: e.target.validity.valid, value: e.target.value },
            });
          }}
          helperText={
            !data.email.valid ? "Ingrese un correo electrónico válido." : ""
          }
          error={!data.email.valid}
        />
        <TextField
          fullWidth
          className="text-field"
          required
          id="birth"
          label="Fecha de nacimiento"
          value={data.birth.value}
          onChange={(e) => {
            setData({
              ...data,
              birth: { valid: e.target.validity.valid, value: e.target.value },
            });
          }}
          helperText={
            !data.birth.valid ? "Ingrese su fecha de nacimiento." : ""
          }
          error={!data.birth.valid}
        />
        <TextField
          fullWidth
          className="text-field"
          required
          id="message"
          label="Mensaje"
          value={data.message.value}
          onChange={(e) => {
            setData({
              ...data,
              message: {
                valid: e.target.validity.valid,
                value: e.target.value,
              },
            });
          }}
          helperText={!data.message.valid ? "Ingrese un mensaje." : ""}
          error={!data.message.valid}
        />
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <Button variant="contained" color="primary" onClick={handleClickAdd}>
          {isAttendingContact ? "Modificar" : "Agregar"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
