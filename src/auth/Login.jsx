import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { IssueContext } from "../context/IssueContext";
import { axiosInstance } from "../utils/axiosAPI";

const schema = yup.object({
  email: yup
    .string()
    .email("Must be valid email")
    .trim()
    .lowercase()
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveAuthInfo } = useContext(AuthContext);
  const { setNavigateRoute } = useContext(IssueContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const { email, password } = data;

    try {
      // api request to the server
      const res = await axiosInstance.post(`auth/local`, {
        identifier: email,
        password,
      });
      // on successful response navigate to issues route
      saveAuthInfo(res.data);
      setNavigateRoute(true);
      toast.success("Login successful");
      navigate(location?.state?.from || "/issues");
    } catch (err) {
      toast.error(err.response);
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={12} sm={7} md={6} className="m-auto mt-4">
          <Card className="p-3 bg-light">
            <h2 className="mb-5 text-center">Login</h2>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group as={Row} className="mb-3">
                <Col xs={1} sm={3} md={2}>
                  <Form.Label htmlFor="email" column>
                    Email
                  </Form.Label>
                </Col>
                <Col xs={11} sm={9} md={10}>
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
                <Col xs={1} sm={3} md={2}>
                  <Form.Label htmlFor="password" column>
                    password
                  </Form.Label>
                </Col>
                <Col xs={11} sm={9} md={10}>
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
              <div className="mt-4 d-flex justify-content-center">
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  size="md"
                  className="m3-3"
                  type="submit"
                  style={{ width: "160px" }}
                >
                  Login
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
