import { useState, useEffect } from "react"


export function EmailFolderList({ folders, filterBy, onSetFilter }) {
   const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

   useEffect(() => {
      onSetFilter(filterByToEdit)
   }, [filterByToEdit])

   function handleChange(status, field) {
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: status }));
      console.log('change folfer:' + status)
   }


   const { status } = filterByToEdit
   return (
      <ul className="folders-list">

         {folders.map(folder =>
            <li key={folder.id} onClick={() => handleChange(folder.status, "status")}
               className={folder.status === status ? 'selected' : ''}
            > 
            {folder.status}</li>)}
      </ul>


   )
}