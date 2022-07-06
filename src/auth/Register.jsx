import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../utils/axiosAPI";

const schema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username must be 5 or more in length"),
  email: yup
    .string()
    .email("Must be valid email")
    .trim()
    .lowercase()
    .required("Email is Required"),
  password: yup
    .string()
    .min(6, "password must be 6 character long")
    .required("Password is Required"),
  confirmPassword: yup
    .string()
    .required("confirm Password is Required")
    .oneOf([yup.ref("password")], "confirmPassword doesn't match"),
});

const Register = () => {
  const navigate = useNavigate();
  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const { username, email, password } = data;

    try {
      // api request to the server
      const res = await axiosInstance.post("auth/local/register", {
        username,
        email,
        password,
      });
      // on successful response navigate to issues route
      saveAuthInfo(res.data);
      toast.success("Registration successful");
      navigate("/issues");
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={12} sm={7} md={6} className="m-auto mt-4">
          <Card className="p-3 bg-light">
            <h2 className="mb-5 text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group as={Row} className="mb-3">
                <Col sm={3}>
                  <Form.Label htmlFor="username" column>
                    username
                  </Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    isInvalid={errors.username}
                    {...register("username")}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={3}>
                  <Form.Label htmlFor="email" column>
                    Email
                  </Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    isInvalid={errors.email}
                    {...register("email")}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={3}>
                  <Form.Label htmlFor="password" column>
                    password
                  </Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    isInvalid={errors.password}
                    {...register("password")}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={3}>
                  <Form.Label htmlFor="confirmPassword" column>
                    confirm Password
                  </Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter confirmPassword"
                    isInvalid={errors.confirmPassword}
                    {...register("confirmPassword")}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <div className="mt-4 d-flex justify-content-center">
                <Button
                  variant="success"
                  disabled={isSubmitting}
                  size="md"
                  className="m3-3"
                  type="submit"
                  style={{ width: "160px" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
