import { useRecordContext } from "react-admin";

export const CustomImageField = ({source}) => {
  const baseURL = 'http://localhost:8000'
  const record = useRecordContext();
  if (!record || !record[source]) return null;
  return <img src={`${baseURL}/${record[source]}`} style={{width: "100px"}}/>
}