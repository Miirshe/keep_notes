import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { auth, storage } from "../lib/Firebase"
import { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from "react-toastify"
import { BiHide, BiShow } from "react-icons/bi"

const Signup = () => {
	const [type , setType] = useState('password');
	const navigate = useNavigate();
	const initialValues = {
		username : '',
		email :'',
		password : '',
		photo:null
	}
	const [saveUser , setSaveUser ] = useState(initialValues);
	const { username , email , password	, photo	} = saveUser;
	const [file , setFile] = useState(null);
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
				setSaveUser((prev) => ({ ...prev, photo: downloadUrl }))
	
            })
			})
		}
		file && uploadFile();
    }, [file])

	const validationSchema = Yup.object({
		username : '',
		email : Yup.string().required("Please enter a valid email"),
		password : Yup.string().required("Please enter a valid password")
		.matches(/[a-z]/,'password at least one small letter is required')
		.matches(/[A-Z]/,'password at least one capital letter is required')
		.matches(/[0-9]/,'password at least one Number is required')
		.min(8,'password must be less than 8 characters')
	})
	const handleSubmit = async ( values , { resetForm }) => {
		try {
			const { email, password , username} = values;

			const { user } = await createUserWithEmailAndPassword(auth , email, password);
			await updateProfile(user,{ displayName:`${username}`,photoURL:photo}).then(()=>{
				toast.success('successfully registered');
				navigate('/Login')
			}).catch((error)=>{
				toast.error(error.message);
			})
		} catch (error) {

			console.log(error);
			
		}
		resetForm();
	}
  return (
	<div className="w-full p-10 mt-32">
		<div className="w-[95%] md:w-[40%] lg:w-[30%] mx-auto p-2">

			<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>

				<Form className="border-[#FBBC04] border-4 rounded-md shadow-md flex flex-col justify-start items-start p-2 md:p-5 gap-5 space-y-3">
					<h1 className="text-xl tracking-widest p-1 uppercase ">SignUp</h1>
					<Field type="text" className="fields" placeholder="Enter your username" name="username"/>
					<ErrorMessage className="text-red-500" component="div" name="username"/>
					<Field type="email" className="fields" placeholder="Enter your email" name="email"/>
					<ErrorMessage className="text-red-500" component="div" name="email"/>
					<div className="w-full relative space-y-2">
                    <Field type={type} className="fields" placeholder="Enter your password.." name="password"/>
                    {
                      type === 'password' ? <BiHide onClick={()=>setType('text')} size={25} className="text-black cursor-pointer inline absolute top-2 right-4" /> : <BiShow  onClick={()=>setType('password')} size={25} className="inline cursor-pointer text-black  absolute top-2 right-4"/>
                    }
                    <ErrorMessage component="div" className="text-red-500" name="password"/>
                    </div>
					<input type="file" onChange={(e)=>setFile(e.target.files[0])} />
					<button className="btn" type="submit" disabled={progress !=null && progress > 100}>Signup</button>
					<p>Already have an account <Link className="text-xl tracking-widest p-1 uppercase underline" to="/Login">Signin</Link></p>
				</Form>
			</Formik>

		</div>
	</div>
  )
}

export default Signup