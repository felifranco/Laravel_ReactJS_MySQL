import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import CustomModal from "../Common/CustomModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getForms,
  setAttending,
  deleteForm,
  setMessage,
} from "../../store/Forms";

const FormList = () => {
  const forms = useSelector((state) => state.form.list);
  const reloadList = useSelector((state) => state.form.reloadList);

  const [image, setImage] = useState({ show: false, content: "" });

  const dispatch = useDispatch();

  const handleClickShowImage = (image) => {
    setImage({ content: image, show: true });
  };

  const handleClickShowEdit = (contact) => {
    dispatch(setAttending(contact));
  };

  const handleClickDelete = (id) => {
    dispatch(deleteForm(id));
  };

  const PreviewImage = () => {
    return (
      <>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          sx={{ marginBottom: 2 }}
          align="center"
        >
          Vista previa
        </Typography>
        <Box
          component={"img"}
          alt="Vista previa"
          src={image.content}
        />
      </>
    );
  };

  useEffect(() => {
    if (reloadList) {
      dispatch(getForms());
    }
  }, [reloadList]);

  useEffect(() => {
    dispatch(getForms());
  }, []);

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "90%", maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Nombre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Correo electrónico
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Fecha de nacimiento
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Mensaje
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Imagen
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"} align="center">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form) => {
              return (
                <TableRow key={form.id}>
                  <TableCell>
                    <Typography align="center">{form.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{form.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{form.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{form.birth}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{form.message}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {form.image ? (
                      <IconButton
                        onClick={() => {
                          handleClickShowImage(form.image);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          dispatch(
                            setMessage({
                              message: "No tiene una imagen almacenada.",
                              error: true,
                            })
                          );
                        }}
                      >
                        <ImageNotSupportedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        handleClickShowEdit(form);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleClickDelete(form.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal
        open={image.show}
        component={<PreviewImage />}
        handleClose={() => {
          setImage({ ...image, show: false });
        }}
      />
    </>
  );
};

export default FormList;
