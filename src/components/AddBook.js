import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AppContext } from "../App";
import { Box, Button, Grid, TextField } from "@mui/material";
import { addBook } from "../services/Service";

const schema = yup.object({
  title: yup.string().required("must be entered"),
  price: yup
    .number("must ba a number")
    .positive()
    .required("Price is Required"),
  isbn: yup.number("must be a number").positive().required("Isbn is Required"),
  book_copies: yup
    .number("must ba a number")
    .positive()
    .required("Price is Required"),
});

const AddBook = ({setRefresh}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { refresh } = useContext(AppContext);


  const onSubmit = (data) => {
    addBook(data).then((status) => status == 201 ? setRefresh(!refresh) : alert("Some thing went wrong"));
  };

  return (
    <div>
      <Grid
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            height: "70%",
            width: { xl: "30%", md: "40%", xs: "50%", xs: "80%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            helperText={errors.title?.message}
            sx={{ my: "1%" }}
            {...register("title")}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            sx={{ my: "1%" }}
            helperText={errors.price?.message}
            {...register("price")}
          />
          <TextField
            id="outlined-basic"
            label="Isbn"
            variant="outlined"
            sx={{ my: "1%" }}
            helperText={errors.isbn?.message}
            {...register("isbn")}
          />
          <TextField
            id="outlined-basic"
            label="Book Copies"
            variant="outlined"
            sx={{ my: "1%" }}
            helperText={errors.book_copies?.message}
            {...register("book_copies")}
          />
          <Button variant="contained" sx={{ my: "2%" }} type="submit">
            Submit
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default AddBook;
