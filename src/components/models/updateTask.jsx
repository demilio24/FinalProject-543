import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../store/slices/note.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "1rem 2rem",
};

const useStyles = makeStyles({
  input: {
    width: "100%",
    height: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid #dcdcdc",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
});

export default function UpdateTaskModel({ open, setOpen, noteId }) {
  const [taskText, setTaskText] = React.useState("");
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state?.noteSlice);
  React.useEffect(() => {
    const existingNote = notes?.find((note) => note?.id === noteId);
    if (existingNote) {
      setTaskText(existingNote.taskText);
    }
  }, [noteId, notes]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const handleUpdateNote = () => {
    if (taskText.trim() !== "") {
      const updatedNote = {
        ...notes.find((note) => note?.id === noteId),
        taskText,
      };
      dispatch(updateNote(updatedNote));
      setOpen(false);
      setTaskText("");
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                fontFamily="Poppins sans-serif"
              >
                UPDATE TASK
              </Typography>
              <Box
                sx={{ fontSize: "1.5rem", color: "red", cursor: "pointer" }}
                onClick={() => setOpen(false)}
              >
                X
              </Box>
            </Box>

            <Box mt={2}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box>
                  <input
                    type="text"
                    id="myInput"
                    className={classes.input}
                    placeholder="+ Update Task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <Button
                    fullWidth
                    sx={{
                      marginTop: "1rem",
                      background: "green",
                      border: "1px solid green",
                      color: "white",
                      height: "5vh",
                      fontSize: [8, 10, 10],

                      "&:hover": {
                        background: "green",
                      },
                    }}
                    onClick={handleUpdateNote}
                  >
                    UPDATE NOTE
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
