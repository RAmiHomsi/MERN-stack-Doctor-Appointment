import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/userbyid", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Home</div>;
}
