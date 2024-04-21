import { Box, Paper, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({
  open = false,
  component = null,
  handleClose = () => {},
}) => {
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 4,
        }}
      >
        <Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ marginTop: 1, marginBottom: -2 }}
          >
            <Box flexGrow={1}></Box>
            <Box>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          {component}
        </Box>
      </Paper>
    </Modal>
  );
};

export default CustomModal;
