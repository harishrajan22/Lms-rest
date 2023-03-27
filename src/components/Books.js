import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBook1, issueBook } from "../services/Service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 4,
  p: 3,
  borderRadius: 5,
};

function ChildModal({ bookCopy, setRefresh }) {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const { refresh } = useContext(AppContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let today = new Date().toISOString().slice(0, 10);
    let issueBookData = {
      booksCpy: bookCopy,
      member: parseInt(memberId),
      isReturned: false,
      outDate: today,
    };
    issueBook(issueBookData).then((status) =>
      status == 202 || 201
        ? (handleClose(), setRefresh(!refresh))
        : window.alert("Book Not Issued")
    );
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleOpen}
        color="success"
        sx={{ width: "70%" }}
      >
        Issue Book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 440 }}>
          <Typography variant="h6">
            Enter Member ID to Issue Book Copy of {bookCopy}
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Member ID"
              variant="outlined"
              onChange={(e) => setMemberId(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ width: 150 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Books = ({ setRefresh }) => {
  const { books, refresh } = useContext(AppContext);
  const [bookId, setBookId] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedBook, setSelectedBook] = useState({
    id: 0,
    title: "",
    isbn: 0,
    price: 0,
    bookCopy: 0,
  });

  const model = (book, copies) => {
    setSelectedBook({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      price: book.price,
      bookCopy: copies,
    });
    setOpen(true);
  };

  const deleteBook = (cpyId) => {
    deleteBook1(cpyId);
    setRefresh(!refresh);
    handleClose();
  };

  return (
    <React.Fragment>
      <Grid item>
        <Typography variant="h5">View Books</Typography>
      </Grid>
      <Grid container m={1}>
        <TextField
          id="outlined-basic"
          label="Filter by Book Id & Book Copy ID & Book Name"
          variant="outlined"
          sx={{ width: 360 }}
        />
      </Grid>
      <Grid container>
        {books.map((book) => (
          <Grid
            item
            xl={3}
            md={4}
            sm={6}
            xs={12}
            key={book.id}
            sx={{ px: "1%" }}
          >
            <Card sx={{ maxWidth: 390, my: "3%", height: 300 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://goodmockups.com/wp-content/uploads/2018/01/Free-book-cover-Backside-mockup-PSD-2.jpg"
                title="Books"
              />
              <CardContent>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Price - {book.price}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Isbn - {book.isbn}
                  </Typography>
                </Grid>
                <Typography variant="body2" color="text.secondary">
                  Book Copy ID
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  {book.book_copies.map(
                    (copies) =>
                      copies.status == "available" && (
                        <Button
                          key={copies.id}
                          onClick={() => model(book, copies.id)}
                        >
                          {copies.id}
                        </Button>
                      )
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345, my: "3%", minHeight: 270 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://goodmockups.com/wp-content/uploads/2018/01/Free-book-cover-Backside-mockup-PSD-2.jpg"
              title="Books"
            />
            <CardContent>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom variant="subtitle1" component="div">
                  Price - {selectedBook.price}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {selectedBook.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Isbn - {selectedBook.isbn}
                </Typography>
              </Grid>
            </CardContent>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: "5%",
              }}
            >
              {/* <Button variant="contained" color="success" sx={{ width: "70%" }}>
                Issue Book
              </Button> */}
              <ChildModal
                bookCopy={selectedBook.bookCopy}
                setRefresh={setRefresh}
              />

              <IconButton onClick={() => deleteBook(selectedBook.bookCopy)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Card>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Books;
