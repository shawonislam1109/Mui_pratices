import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FromValid from "./FromValid";
import { Backdrop, Fade, Stack } from "@mui/material";
import ModalData from "./ModalData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "auto",
};

export default function EditModal({ open, handleClose }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}>
        <Stack height="50%" border="none" overflow="auto" in={open} sx={style}>
          <Box>
            <ModalData handleClose={handleClose} open={open} />
          </Box>
        </Stack>
      </Modal>
    </div>
  );
}
