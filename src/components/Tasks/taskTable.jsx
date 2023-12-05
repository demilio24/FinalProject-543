import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { CircularProgressbar } from "react-circular-progressbar";
import AddIcon from "@mui/icons-material/Add";
import "react-circular-progressbar/dist/styles.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddAssignTaskModal from "../models/assignedTask";
import UpdateTaskModel from "../models/updateTask";
import { useEffect, useState } from "react";
import AddCollaboratorsModal from "../models/addColaboraters";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { removeNote, updateProgress } from "../../store/slices/note.slice";
import UpdateStatusModel from "../models/updateStatus";
import EditNoteIcon from "@mui/icons-material/EditNote";
function createData(name, date, calories, fat, carbs, protein) {
  return { name, date, calories, fat, carbs, protein };
}
const getStatusProgress = (status) => {
  return status === "not started"
    ? 0
    : status === "in progress"
    ? 25
    : status === "in review"
    ? 90
    : status === "completed"
    ? 100
    : status === "cancelled"
    ? 0
    : 0;
};
const getStatusColor = (status) => {
  return status === "not started"
    ? "#F96E54"
    : status === "in progress"
    ? "#4064BC"
    : status === "in review"
    ? "#FFA747"
    : status === "completed"
    ? "#45D773"
    : status === "cancelled"
    ? "#FC5C61"
    : 0;
};

export default function TaskTable() {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state?.noteSlice);
  const [anchorEl, setAnchorEl] = useState(null);
  const [taskAssignOpen, setTaskAssignOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
  const [addCollaboratorsOpen, setAddCollaboratorsOpen] = useState(false);
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const taskAssignHandler = (noteId) => {
    setTaskAssignOpen(true);
    setSelectedNoteId(noteId);
  };

  const updateTask = (noteId) => {
    setAnchorEl(null);
    setSelectedNoteId(noteId);
    setUpdateTaskOpen(true);
  };

  const deleteteTask = (noteId) => {
    setAnchorEl(null);
    setSelectedNoteId(noteId);
    dispatch(removeNote(noteId));
  };

  const addCollaboratorsHandler = (noteId) => {
    setSelectedNoteId(noteId);
    setAddCollaboratorsOpen(true);
  };
  const updateStatusHandler = (noteId) => {
    setSelectedNoteId(noteId);
    setUpdateStatusOpen(true);
  };

  useEffect(() => {
    if (notes) {
      notes.forEach((note) => {
        const newProgress = getStatusProgress(note?.status.toLowerCase());
        dispatch(updateProgress({ id: note?.id, progress: newProgress }));
      });
    }
  }, [dispatch, notes]);
  return (
    <>
      <AddAssignTaskModal
        open={taskAssignOpen}
        setOpen={setTaskAssignOpen}
        noteId={selectedNoteId}
      />
      <AddCollaboratorsModal
        open={addCollaboratorsOpen}
        setOpen={setAddCollaboratorsOpen}
        noteId={selectedNoteId}
      />
      <UpdateTaskModel
        open={updateTaskOpen}
        setOpen={setUpdateTaskOpen}
        noteId={selectedNoteId}
      />
      <UpdateStatusModel
        open={updateStatusOpen}
        setOpen={setUpdateStatusOpen}
        noteId={selectedNoteId}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  Task{" "}
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  End{" "}
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  Progress
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  Assignees
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography variant="subtitle1" fontWeight="bold">
                  Collaborators
                </Typography>
              </TableCell>
              <TableCell align="left">
                <MoreHorizIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes &&
              notes
                .filter((row) => row?.taskText)
                .map((row) => (
                  <TableRow
                    key={row?.taskText}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.taskText}
                    </TableCell>
                    <TableCell align="left">{row?.date}</TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          sx={{
                            borderRadius: "8px",
                            color: "white",
                            fontSize: "16px",
                            width: "120px",
                            padding: "3px",
                            textTransform: "capitalize",
                            background: getStatusColor(
                              row?.status.toLowerCase()
                            ),
                            "&:hover": {
                              background: getStatusColor(
                                row?.status.toLowerCase()
                              ),
                            },
                          }}
                        >
                          {row?.status}
                        </Button>
                        <EditNoteIcon
                          onClick={() => updateStatusHandler(row?.id)}
                          sx={{
                            fontSize: "30px ",
                            ml: 1,
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </TableCell>
                    {/* <TableCell align="left">
                <FlagIcon
                  sx={{
                    fontSize: "30px ",
                    border: `1px solid ${row.fat}`,
                    p: 0.5,
                    backgroundColor: "#fff",
                    color: row.fat,
                    borderRadius: "50%",
                  }}
                />
              </TableCell> */}

                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 35,
                          }}
                        >
                          <CircularProgressbar
                            value={row?.progress}
                            styles={{
                              text: {
                                fontSize: "30px",
                                fontWeight: "bold",
                                fill: "#000",
                              },
                              path: {
                                stroke: "#54CB7F",
                              },

                              trail: {
                                stroke: "#d6d6d6",
                              },
                            }}
                          />
                        </Box>
                        <Typography>{row?.progress}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          gap: 1,
                        }}
                      >
                        <Box sx={{}}>
                          <AvatarGroup
                            max={
                              row?.assign?.length > 3 ? 3 : row?.assign?.length
                            }
                          >
                            {Array.from(
                              { length: row?.assign?.length },
                              (_, index) => (
                                <Avatar
                                  key={index}
                                  alt={`Avatar ${index + 1}`}
                                  src={`/static/images/avatar/${index + 1}.jpg`}
                                  style={{ width: "30px", height: "30px" }}
                                />
                              )
                            )}
                          </AvatarGroup>
                        </Box>
                        <AddIcon
                          onClick={() => taskAssignHandler(row?.id)}
                          sx={{
                            fontSize: "30px ",
                            p: 0.7,
                            backgroundColor: "#fff",
                            border: "1px solid #d6d6d6",
                            borderRadius: "50%",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          gap: 1,
                        }}
                      >
                        <Box sx={{}}>
                          <AvatarGroup
                            max={
                              row?.collaborators?.length > 3
                                ? 3
                                : row?.collaborators?.length
                            }
                          >
                            {Array.from(
                              { length: row?.collaborators?.length },
                              (_, index) => (
                                <Avatar
                                  key={index}
                                  alt={`Avatar ${index + 1}`}
                                  src={`/static/images/avatar/${index + 1}.jpg`}
                                  style={{ width: "30px", height: "30px" }}
                                />
                              )
                            )}
                          </AvatarGroup>
                        </Box>
                        <AddIcon
                          onClick={() => addCollaboratorsHandler(row?.id)}
                          sx={{
                            fontSize: "30px ",
                            p: 0.7,
                            backgroundColor: "#fff",
                            border: "1px solid #d6d6d6",
                            borderRadius: "50%",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box>
                        <MoreHorizIcon
                          sx={{
                            rotate: "90deg",
                            cursor: "pointer",
                          }}
                          onClick={handleClick}
                        />
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => updateTask(row?.id)}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => deleteteTask(row?.id)}>
                            {" "}
                            Delete
                          </MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
