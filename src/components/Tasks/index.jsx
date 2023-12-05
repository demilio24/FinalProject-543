import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TaskTable from "./taskTable";
import { useDispatch, useSelector } from "react-redux";
import { initializeNotes, searchNote } from "../../store/slices/note.slice";

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

const AddNote = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { originalNotes } = useSelector((state) => state?.noteSlice);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Dispatching initializeNotes");
    dispatch(initializeNotes(originalNotes));
  }, [dispatch, originalNotes]);

  useEffect(() => {
    console.log("Dispatching searchNote");
    let searchItem = search ? search.toLowerCase() : "";
    dispatch(searchNote(searchItem));
  }, [search, dispatch, originalNotes]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4"    fontFamily="Poppins sans-serif">
          Task Board
        </Typography>
        <Box>
          <input
            placeholder="search task"
            className={classes.input}
            value={search}
            onChange={(e) => changeHandler(e)}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <TaskTable />
      </Box>
    </Box>
  );
};

export default AddNote;
