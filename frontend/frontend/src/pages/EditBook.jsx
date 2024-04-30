import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom" 

const EditBook = () => {
  const [inputs, setInputs] = useState({title: '',author: '',publishYear: ''});
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setInputs({
          title: res.data.title,
          author: res.data.author,
          publishYear: res.data.publishYear
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('An error occurred. Please check console');
        console.log(err);
      });
  }, []);
  



  const handleChange = (e) => {
    setInputs({
     ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleEditBook = () => {
    const data = {
      title: inputs.title,
      author: inputs.author,
      publishYear: inputs.publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(err);
      });
  };
  

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Title</label>
          <input className="border-2 border-gray-500 py-2 w-full" name="title" type="text" onChange={handleChange} value={inputs.title}  />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Author</label>
          <input className="border-2 border-gray-500 py-2 w-full" type="text" name="author" onChange={handleChange} value={inputs.author}  />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Publish Year</label>
          <input className="border-2 border-gray-500 py-2 w-full" type="text" name="publishYear" onChange={handleChange} value={inputs.publishYear}  />
        </div>

      <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Edit Book</button>
      </div>
    </div>
  )
}

export default EditBook
