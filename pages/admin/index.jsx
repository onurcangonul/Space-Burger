import { useFormik } from "formik";
import { adminSchema } from "@/schema/admin";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import Link from "next/link";
const AdminLogin = (props) => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        actions.resetForm();
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
            <form className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto" onSubmit={handleSubmit}>
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
export default AdminLogin;
