import { useEffect, useState } from "react";
import { ImageInput, useInput, useRecordContext } from "react-admin";

export const CustomImageField = ({ source }) => {
  const baseURL = "http://localhost:8000";
  const record = useRecordContext();
  const fullURL = `${baseURL}/${record[source]}`;
  console.log(fullURL);
  // if (source) {
  //   return <img src={URL.createObjectURL(`${fullURL}`)} style={{ width: "100px" }}/>;
  // }
  if (!record || !record[source]) return null;
  return <img src={`${fullURL}`} style={{ width: "100px" }} />;
};
