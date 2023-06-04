import Title from "../ui/Title";
import Input from "../form/Input";
import { newPasswordSchena } from "@/schema/newPassword";
import { useFormik } from "formik";
import axios from "axios";

const Password = ({user}) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
    actions.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        comfirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchena,
    });
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "comfirmPassword",
      type: "password",
      placeholder: "Your Password Confirm",
      value: values.comfirmPassword,
      errorMessage: errors.comfirmPassword,
      touched: touched.comfirmPassword,
    },
  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5 " onSubmit={handleSubmit}>
      <Title addClass="text-[40px] lg:text-left text-center">
        Password
      </Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn-primary my-4" type="submit">Update</button>
    </form>
  );
};
export default Password;
