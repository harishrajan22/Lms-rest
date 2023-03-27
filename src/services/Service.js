import { baseURL } from "../const/const";
import { useQuery } from "@tanstack/react-query";

export const getBooks = async () => {
  let response = await baseURL.get("books");
  return response.data;
};

export const deleteBook1 = async (bookCpyId) => {
  let response = await baseURL.delete("books/" + bookCpyId);
  return response.status;
};

export const issueBook = async (issueBook) => {
  let response = await baseURL.post("issuebooks", issueBook);
  return response.status;
};

export const addBook = async (data) => {
  let response = await baseURL.post("books", data);
  return response.status;
};
