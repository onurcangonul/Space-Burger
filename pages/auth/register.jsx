import axios from "axios";
import { useFormik } from "formik";
import { registerSchena } from "@/schema/register";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Register = () => {
  const {push} = useRouter()
  const onSubmit = async (values, actions) => {
    try {
     const res = await axios.post(
       `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
       values
      );
      if (res.status === 200) {
        toast.success("User created successfully")
        push("/auth/login")
      } 
      
    } catch (err) {
       toast.error(err.response.data.message);
      console.log(err);
    }
    actions.resetForm();

  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        comfirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchena,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
      autoComplete:"on"
    },
    {
      id: 4,
      name: "comfirmPassword",
      type: "password",
      placeholder: "Your Password Again",
      value: values.comfirmPassword,
      errorMessage: errors.comfirmPassword,
      touched: touched.comfirmPassword,
      autoComplete:"on"
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6 ">Register</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-4 mt-4">
          <button className="btn-primary" type="submit">
            REGISTER
          </button>
          <Link href="/auth/login">
            <span className="grid place-content-center text-sm underline">
              Do you have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
