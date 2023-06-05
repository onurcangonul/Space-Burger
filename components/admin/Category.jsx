import { useState, useEffect } from "react";
import Input from '../form/Input';
import Title from '../ui/Title';
import axios from "axios";

const Category = () => {
    const [inputText, setInputText] = useState("");
    const [categories, setCategories] = useState([]);
    
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);
  
  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {title: inputText}
      )
      setCategories([...categories, res.data])
      setInputText("")
    } catch (err) {
      console.log(err)
    }
  }

 const handleDelete = async (id) => {
   try {
    await axios.delete(
       `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
     );
     setCategories(categories.filter((cat) => cat._id !== id))
   } catch (err) {
     console.log(err);
   }
 };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Categories</Title>
      <div className="mt-5">
        <div className="flex gap-4 flex-1 items-center">
          <Input
            placeholder="Add a new category"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button className="btn-primary w-24 h-auto" onClick={handleCreate}>
            Add
          </button>
        </div>
        <div className="mt-10 max-h-[250px] overflow-auto pb-4">
          {categories.map((category) => (
            <div key={category._id} className="flex justify-between mt-4">
              <p className="text-xl">{category.title}</p>
              <button
                className="btn-primary !bg-danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Category