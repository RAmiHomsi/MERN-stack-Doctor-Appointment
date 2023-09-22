import axios from "axios";
import { useEffect } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/userbyid",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1>home</h1>
    </Layout>
  );
}
