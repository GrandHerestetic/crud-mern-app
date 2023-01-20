import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    console.log(user)
    axios
      .post("/create", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>Create users page</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={user.title}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="Name and Surname"
          />
          <Form.Control
            onChange={handleChange}
            name="description"
            value={user.description}
            style={{ marginBottom: "1rem" }}
            placeholder="Group"
          />
        </Form.Group>
        <Button
          onClick={createUser}
          variant="outline-success"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE USERS
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-success"
        style={{ width: "100%" }}
      >
        ALL USERS
      </Button>
    </div>
  );
}

export default CreateUser;
