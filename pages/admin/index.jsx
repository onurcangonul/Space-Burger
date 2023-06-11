import axios from "axios";
import { useFormik } from "formik";
import { adminSchema } from "@/schema/admin";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const AdminLogin = (props) => {
const { push } = useRouter()    
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        console.log(res.data);
          actions.resetForm();
          toast.success("Login Success")
          push("/admin/profile")

      }
    } catch (err) {
     toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Your Username",
      value: values.userName,
      errorMessage: errors.userName,
      touched: touched.userName,
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
        <Title addClass="text-[40px] mb-6 ">Admin Login</Title>
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
          <button className="btn-primary">Login</button>
          <Link href="/">
            <span className="grid place-content-center text-sm underline">
              Return Home Page
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";

    if (myCookie.token === process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: "/admin/profile",
                permanent: false,

        }
    }
    };
    return {
        props: {}
    }
}


export default AdminLogin;
