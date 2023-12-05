import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { addAssign } from "../../store/slices/note.slice";
import { useDispatch } from "react-redux";
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

export default function AddAssignTaskModal({ open, setOpen, noteId }) {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const handleAssignTask = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() !== "" && emailRegex.test(email)) {
      dispatch(addAssign({ id: noteId, email }));
      setOpen(false);
      setEmail("");
    } else {
      console.error("Invalid email address");
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
                ASSIGN TASK
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
                    required
                    type="email"
                    id="myInput"
                    className={classes.input}
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleAssignTask}
                  >
                    ASSIGN
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
