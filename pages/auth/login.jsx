import { useFormik } from "formik";
import { loginSchema } from "@/schema/login";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
const Login = () => {
  const { data: session } = useSession();
console.log(session)
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6 ">Login</Title>
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
            Login
          </button>
          <button
            className="btn-primary !bg-secondary"
            type="button"
            onClick={() => signIn("github")}
          >
            <i className="fab fa-github mr-2" aria-hidden="true"></i>
            Github
          </button>
          <Link href="/auth/register">
            <span className="grid place-content-center text-sm underline">
              Do you no have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
