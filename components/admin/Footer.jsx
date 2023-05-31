import { useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import { footerSchena } from "@/schema/footer";
import { useFormik } from "formik";

const AdminFooter = () => {
  const [linkAddress, setLinkAdress] = useState("https://");
  const [iconName, setIconName] = useState("fab fa-");
  const [icons, setIcons] = useState([
    "fab fa-facebook-f",
    "fab fa-twitter",
    "fab fa-instagram",
  ]);

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    actions.resetForm();
  };
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        location: "",
        email: "",
        phoneNumber: "",
        address: "",
        desc: "",
        day: "",
        time: "",
      },
      onSubmit,
      validationSchema: footerSchena,
    });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
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
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px] lg:text-left text-center">
        Account Settings
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
      <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Link Adress"
            defaulValue="https://"
            onChange={(e) => setLinkAdress(e.target.value)}
            value={linkAddress}
          />
          <Input
            placeholder="Icon Name"
            defaulValue="fab fa-"
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />
          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              setIcons([...icons, iconName]);
              setIconName("fab fa-");
            }}
          >
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {icons.map((icon, index) => (
            <li key={index} className="flex items-center">
              <i className={`${icon} text-2xl`}></i>
              <button
                className="text-danger"
                onClick={() => {
                  setIcons((prev) => prev.filter((item, i) => i !== index));
                }}
                type="button"
              >
                <i className="fa fa-trash text-2xl ml-2"></i>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary my-4" type="submit">
        Update
      </button>
    </form>
  );
};
export default AdminFooter;
