import { useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks";

export const SignInPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  const socket = useSocket()
  const {setOk} = useContext(Context) as {setOk:React.Dispatch<React.SetStateAction<boolean>>}
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result:{message:string,error:boolean} = await response.json()
      setOk(!result.error)
      socket?.emit('register',`${data.email}`)
      localStorage.setItem('email',`${data.email}`)
      localStorage.setItem('password',`${data.password}`)
      setValue('email', '');
      setValue('password', '');
      return navigate('/')
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      console.log(data)
    }
  }
  return (
    <main className="bg-gray-33 h-max">
      <div className="max-w-[330px] mx-auto grid py-5">
        <div className="mx-auto h-max w-max">
          <svg xmlns="http://www.w3.org/2000/svg" width="145" height="145" viewBox="0 0 24 24"><path fill="#766ac8" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024q-.159.037-5.061 3.345q-.72.495-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789q.04-.324.893-.663q5.247-2.286 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635" /></svg>
        </div>
        <h1 className="text-3xl text-center font-medium mt-10">Sign in to Telegram</h1>
        <p className="text-center mt-3 text-sm">Please confirm your country code<br />and enter your phone number.</p>
        <form className="grid mt-11 px-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-4" htmlFor="email">
            <input id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} className="bg-gray-33 w-full outline-none border hover:outline-purple-main p-3.5 rounded-lg transition-all" type="email" placeholder="Ingrese su email" />
          </label>
          <label htmlFor="password">
            <input id="password" {...register("password", { required: true })} className="bg-gray-33 w-full outline-none border hover:outline-purple-main p-3.5 rounded-lg transition-all" type="password" placeholder="Ingrese su contraseña" />
          </label>
          <label htmlFor="checkbox" className="hover:bg-[#2C2C2C] p-4 mt-2 mb-6 rounded-lg">
            <input id="checkbox" {...register("keepSignedIn")} className="scale-150 me-8 ms-1" type="checkbox" />
            <span>Keep me signed in</span>
          </label>
          <button type="submit" className="bg-purple-main p-3 rounded-xl">NEXT</button>
        </form>
      </div>
    </main>
  )
}
