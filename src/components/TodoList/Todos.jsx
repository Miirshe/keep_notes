import { Link, Outlet } from "react-router-dom"

function Todos() {
  return (
	<div className='md:w-[75%] md:ml-[25%] mt-28 p-1'>
		<div className='mt-14 ml-5 md:ml-0 flex flex-row justify-start items-start gap-5'>
			<Link to='/Todos/TodoList' className='text-3xl'>Tasks</Link>
			<span className="text-3xl">||</span>
			<Link to='/Todos/Completed'  className='text-3xl'>Completed</Link>
		</div>
		<Outlet/>
	</div>
  )
}

export default Todos