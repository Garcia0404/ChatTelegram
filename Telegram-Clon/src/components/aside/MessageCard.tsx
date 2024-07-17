import { NavLink } from "react-router-dom"

interface Props {
  name: string
  lastMessage: string
  hour: string
  email:string
}
export const MessageCard: React.FC<Props> = ({ name, lastMessage, hour,email}) => {
  const styleActive = "flex gap-2 bg-[#3390EC] dark:bg-[#766AC8] text-white rounded-xl p-2 items-center"
  const style = "flex gap-2 hover:bg-[#F4F4F5] dark:hover:bg-[#2C2C2C] rounded-xl p-2 items-center"
  const url = btoa(email)
  return (
    <li>
      <NavLink to={`/${url}`} className={({isActive})=>isActive?styleActive:style} >
        <span>
          <svg className="rounded-full fill-white" xmlns="http://www.w3.org/2000/svg" width="56px" height="56px" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="currentColor"/><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"/></svg>
        </span>
        <div className="grid items-center flex-1 me-2 py-1 h-14 gap-1">
          <div className="flex justify-between max-h-full h-5">
            <span className="font-semibold text-base">{name}</span>
            <span className="text-white text-xs" >{hour}</span>
          </div>
          <div className="flex justify-between relative items-center h-5">
            <span className="text-[#AAAAAA] whitespace-nowrap overflow-hidden">{lastMessage}</span>
            <span className="hidden text-white before:bg-[#00C73E] dark:before:bg-[#8774E1] before:block before:absolute before:top-1/2 before:-translate-y-1/2 before:translate-x-[3.685px] before:-z-10 before:right-0 before:w-6 before:h-6 before:rounded-full h-max p-1 z-10 text-sm font-semibold">1</span>
          </div>
        </div>
      </NavLink>
    </li>
  )
}
