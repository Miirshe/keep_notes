import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../lib/Firebase';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { BiSolidImageAdd } from 'react-icons/bi';
const Posts = () => {
  const navigate = useNavigate();
  const states = useLocation().state;
  const { id } = useParams();
  const [value, setValue] = useState(states?.Note || null);
  const [file, setFile] = useState(null);
  const [ user , setUser ] = useState([]);

  useEffect(()=>{
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        setUser(userAuth);
      }else{
        setUser(null);
      }
    })
  },[])
  const [PostImage, setPostImage] = useState(file);
	const [progress, setProgress] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageref = ref(storage, file.name);
      const UploadTask = uploadBytesResumable(storageref, file);
      UploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload progress" + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("upload is puased");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      }, (error) => {
        console.log("error: " + error)
      },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
            toast.success("Image Successfully Storage into the Firestorage .")
            setPostImage((prev) => ({ ...prev,avator: downloadUrl }))
          })
        })
    }
    file && uploadFile();
  }, [file,value])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      Note:value,
      avator : PostImage
    }
    if (!id) {
      try {
        await addDoc(collection(db, "Notes"), {
          Note:values.Note,
          avator : values.avator,
          timestemp: serverTimestamp(),
          userId: user?.uid,
        }).then(()=>{
          navigate('/')
          toast.success("Note Created Successfully.")
        }).catch(err=>{
          console.log(err);
        })
      } catch (err) {
        console.log("error", err)
      }
    }else{

      try {
        const newUpdate = doc(db, "Notes", id);
        await updateDoc(newUpdate, {
          Note:values.Note,
          avator : values.avator,
          timestemp: serverTimestamp(),
          userId: user?.uid,
        }).then(()=>{
          navigate('/')
          toast.success("Notes Created Successfully.")
        }).catch((error)=>{
          console.log(error.message);
        })
      } catch (err) {
        console.log("error", err)
      }

    }
  }
  return (
    <div className='md:w-[60%] mx-auto mt-32 p-2'>

      <Link to='/Notes' className="text-xl p-2">Home / <span className="text-[#FBBC04]"> AddNotes </span> </Link>

      <form className='flex flex-col justify-start items-center gap-3 p-2 relative mt-10'
      onSubmit={handleSubmit}>
        <input className='w-full p-3 rounded cursor-pointer hidden' type="file" name="" id="upload" onChange={(e)=>setFile(e.target.files[0])}/>
        <label htmlFor="upload" id='upload' className=' absolute top-5 right-4 md:right-10'><BiSolidImageAdd size={30} className='inline text-xl font-bold cursor-pointer'/></label>
        <ReactQuill className='w-full h-72 ' theme="snow" value={value} onChange={setValue} />
        <button type='submit' className='w-full capitalize bg-[#FBBC04] p-3 rounded mt-20' disabled={progress !== null && progress > 100 }> submit </button>
      </form>

    </div>
  )
}

export default Posts;