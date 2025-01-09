import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Define the type for the props
interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  movieData: {
    title: string;
    release_date: string;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "primary.main",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

const BasicModal: React.FC<BasicModalProps> = ({
  open,
  onClose,
  movieData,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {movieData?.title || "Movie Title"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Release Date: {movieData?.release_date || "Unknown"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BasicModal;
