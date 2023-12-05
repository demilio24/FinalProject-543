import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { CircularProgressbar } from "react-circular-progressbar";
import AddIcon from "@mui/icons-material/Add";
import "react-circular-progressbar/dist/styles.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

function createData(name, date, calories, fat, carbs, protein) {
  return { name, date, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", "Aug 31,2018", "Not Started", "#8FB848", 25, 3),
  createData(
    "Ice cream sandwich",
    "Aug 31,2018",
    "In Progress",
    "#62A7C2",
    90,
    6
  ),
  createData("Eclair", "Aug 31,2018", "In Review", "#F4504B", 100, 2),
  createData("Cupcake", "Aug 31,2018", "Completed", "#CB052C", 0, 1),
  createData("Gingerbread", "Aug 31,2018", "Cancelled", "#8FB848", 75, 4),
];

export default function TaskTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Progress</TableCell>
            <TableCell align="left">Assignees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">
                <Button
                  sx={{
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "16px",
                    width: "120px",
                    padding: "3px",
                    textTransform: "capitalize",
                    background: "orange",
                    "&:hover": {
                      background: "orange",
                    },
                  }}
                >
                  {row.calories}
                </Button>
              </TableCell>
              <TableCell align="left">
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
              </TableCell>
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
                      value={row.carbs}
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
                  <Typography>{row.carbs}%</Typography>
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
                    <AvatarGroup max={row.protein > 3 ? 3 : row.protein}>
                      {Array.from({ length: row.protein }, (_, index) => (
                        <Avatar
                          key={index}
                          alt={`Avatar ${index + 1}`}
                          src={`/static/images/avatar/${index + 1}.jpg`}
                          style={{ width: "30px", height: "30px" }}
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                  <AddIcon
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
