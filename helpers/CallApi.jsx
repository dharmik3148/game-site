import axios from "axios";

const CallApi = (type, endPoint, body) => {
  if (type == "DELETE") {
    try {
      axios
        .delete(`${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          //   return res.data;
        })
        .catch((err) => {
          return console.log(err);
        });
    } catch (error) {
      return console.log(error);
    }
  }
};

export default CallApi;
