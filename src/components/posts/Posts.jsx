import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Posts = () => {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState('');
  return (
    <div className='md:w-[60%] mx-auto mt-16 p-2'>

      <form className='flex flex-col justify-start items-center gap-3 p-2'>
        <input className='w-full p-3 rounded' type="file" name="" id="" onChange={(e)=>setFiles(e.target.files[0])}/>
        <ReactQuill className='w-full h-72 ' theme="snow" value={value} onChange={setValue} />;
        <button type='submit' className='w-full capitalize bg-[#FBBC04] p-3 rounded'>submit</button>
      </form>

    </div>
  )
}

export default Posts