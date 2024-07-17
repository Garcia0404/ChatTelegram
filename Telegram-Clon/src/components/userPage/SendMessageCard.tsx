
export const SendMessageCard: React.FC<{ children: string }> = ({ children }) => {
  return (
    <li className="bg-green-main dark:bg-purple-main rounded-s-2xl rounded-e-lg py-1 ps-3 pe-2 max-w-96 break-words flex ms-auto text-black dark:text-white">
      <p className="break-all">
        {children}
      </p>
    </li>
  )
}
