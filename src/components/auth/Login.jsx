import { signInWithEmailAndPassword } from "firebase/auth"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { auth } from "../lib/Firebase"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
const Login = () => {

	const navigate = useNavigate();

	const [ users , setUsers ] = useState([]);

	useEffect(()=>{

		auth.onAuthStateChanged((authUser)=>{

			if(authUser){
				setUsers(authUser);
			}else{
				setUsers(null);
			}
		})

	},[])
	const initialValues = {
		email :'',
		password : ''
	}

	const validationSchema = Yup.object({
		email : Yup.string().required("Please enter a valid email"),
		password : Yup.string().required("Please enter a valid password"),
	})
	const handleSubmit = async ( values , { resetForm }) => {
		try {
			const { email, password } = values;
			const userCredentials = await signInWithEmailAndPassword(auth , email, password);
			console.log(userCredentials);
			Cookies.set('accessToken',users.accessToken);
			navigate('/');

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
					<h1 className="text-xl tracking-widest p-1 uppercase ">Login</h1>
					<Field type="email" className="fields" placeholder="Enter your email" name="email"/>
					<ErrorMessage className="text-red-500" component="div" name="email"/>
					<div className="w-full space-y-4">
					<Field type="password" className="fields" placeholder="Enter your email" name="password"/>
					<ErrorMessage className="text-red-500" component="div" name="password"/>
					</div>
					<button className="btn" type="submit">Login</button>
					<p>Have to register <Link className="text-xl tracking-widest p-1 uppercase underline" to="/Signup">Signup</Link></p>
				</Form>
			</Formik>

		</div>
	</div>
  )
}

export default Login