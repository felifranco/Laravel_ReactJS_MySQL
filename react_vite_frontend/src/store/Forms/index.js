import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "api/formulario";

const initialState = {
  message: "",
  showMessage: false,
  isLoading: false,
  isError: false,
  reloadList: false,
  isAddingContact: false,
  isAttendingContact: false,
  list: [],
  attending: {
    id: 0,
    name: "",
    email: "",
    birth: "",
    message: "",
    image: "",
  },
};

export const getForms = createAsyncThunk("getForms", async () => {
  const res = await fetch(`${configurations.FORMS_BACKEND}/${endpoint}`);
  return res?.json();
});

export const addForm = createAsyncThunk(
  "addForm",
  async ({ name, email, birth, message, image }) => {
    const res = await fetch(`${configurations.FORMS_BACKEND}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        birth: birth,
        message: message,
        image: image,
      }),
    });

    return res?.json();
  }
);

export const updateForm = createAsyncThunk(
  "updateForm",
  async ({ id, name, email, birth, message, image }) => {
    const res = await fetch(
      `${configurations.FORMS_BACKEND}/${endpoint}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          birth: birth,
          message: message,
          image: image,
        }),
      }
    );

    return res?.json();
  }
);

export const deleteForm = createAsyncThunk("deleteForm", async (id) => {
  const res = await fetch(`${configurations.FORMS_BACKEND}/${endpoint}/${id}`, {
    method: "DELETE",
  });

  return res?.json();
});

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.isError = action.payload.error;
      state.showMessage = true;
    },
    cleanMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    setAddingContact: (state) => {
      state.isAddingContact = true;
    },
    cancelAddingContact: (state) => {
      state.attending = {
        id: 0,
        name: "",
        email: "",
        birth: "",
        message: "",
        image: "",
      };
      state.isAttendingContact = false;
      state.isAddingContact = false;
    },
    setAttending: (state, action) => {
      state.attending = action.payload;
      state.isAttendingContact = true;
      state.isAddingContact = true;
    },
    cancelAttending: (state) => {
      state.attending = {
        id: 0,
        name: "",
        email: "",
        birth: "",
        message: "",
        image: "",
      };
      state.isAttendingContact = false;
    },
  },
  extraReducers: (builder) => {
    //GET FORMS
    builder.addCase(getForms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getForms.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.valid) {
        state.list = action.payload.data;
      }
      state.reloadList = false;
    });
    builder.addCase(getForms.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      //MESSAGE
      state.message = "Ha ocurrido un error al procesar su solicitud.";
      state.showMessage = true;
    });

    //ADD FORM
    builder.addCase(addForm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingContact = false;
      //MESSAGE
      state.isError = !action.payload.valid;
      state.message = action.payload.message;
      state.showMessage = true;
    });
    builder.addCase(addForm.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      //MESSAGE
      state.message = "Ha ocurrido un error al procesar su solicitud.";
      state.showMessage = true;
      state.isAddingContact = false;
    });

    //UPDATE FORM
    builder.addCase(updateForm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAttendingContact = false;
      state.isAddingContact = false;
      //MESSAGE
      state.isError = !action.payload.valid;
      state.message = action.payload.message;
      state.showMessage = true;
    });
    builder.addCase(updateForm.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      //MESSAGE
      state.message = "Ha ocurrido un error al procesar su solicitud.";
      state.showMessage = true;
      state.isAddingContact = false;
    });

    //DELETE FORM
    builder.addCase(deleteForm.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteForm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      //MESSAGE
      state.isError = !action.payload.valid;
      state.message = action.payload.message;
      state.showMessage = true;
    });
    builder.addCase(deleteForm.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      //MESSAGE
      state.message = "Ha ocurrido un error al procesar su solicitud.";
      state.showMessage = true;
    });
  },
});

export const {
  cleanMessage,
  setMessage,
  setAddingContact,
  cancelAddingContact,
  setAttending,
  cancelAttending,
} = formSlice.actions;
export default formSlice.reducer;
