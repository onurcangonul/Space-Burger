import { useState, useEffect } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import { footerSchena } from "@/schema/footer";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const AdminFooter = () => {
  const [linkAddress, setLinkAdress] = useState("https://");
  const [footerData, setFooterData] = useState([]);
  const [iconName, setIconName] = useState("fab fa-");
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  //  "fab fa-facebook-f",
  //   "fab fa-twitter",
  //   "fab fa-instagram",
  const { location, desc, email, phoneNumber, openingHours, socialMedia } = footerData;

 
  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooterData(res?.data[0]);
        setSocialMediaLinks(res.data[0].socialMedia);
      } catch (err) {
        console.log(err);
      }
    };
   getFooterData();
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const updateData = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
        {
          location: values.location,
          email: values.email,
          phoneNumber: values.phoneNumber,
          desc: values.desc,
          openingHours: {
            day: values.day,
            hour:values.time
          },
          socialMedia: socialMediaLinks,
            
        }
      );
      if (updateData.status === 200) {
        toast.success("Update Successful");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: location,
        email: email,
        phoneNumber: phoneNumber,
        desc: desc,
        day: openingHours?.day,
        time: openingHours?.hour,
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
      type: "text",
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

  const handleCreate = (e) => {
    setSocialMediaLinks([...footerData?.socialMedia,{
      icon: iconName,
      link: linkAddress,
    }])
    setLinkAdress("https://");
    setIconName("fab fa-");
  }
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
            onChange={(e) => setLinkAdress(e.target.value)}
            value={linkAddress}
          />
          <Input
            placeholder="Icon Name"
            onChange={(e) => setIconName(e.target.value)}
            value={iconName}
          />
          <button className="btn-primary" type="button" onClick={handleCreate}>
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {socialMediaLinks?.map((item, index) => (
            <li key={index} className="flex items-center">
              <i className={`${item.icon} text-2xl`}></i>
              <button
                className="text-danger"
                onClick={() => {
                  setSocialMediaLinks((prev) =>
                    prev.filter((item, i) => i !== index)
                  );
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
