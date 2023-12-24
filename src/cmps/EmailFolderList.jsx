import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";


export function EmailFolderList({ folders, filterBy, onSetFilter }) {
   const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
   const params = useParams()
   
   useEffect(() => {
      onSetFilter(filterByToEdit)
   }, [filterByToEdit])

   function handleChange(status, field) {
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: status }));
      console.log('change folfer:' + status)
   }


   //const { status } = filterByToEdit
   return (
      <ul className="folders-list">
         {/* 
         {folders.map(folder =>
            <li key={folder.id} onClick={() => handleChange(folder.status, "status")}
               className={folder.status === filterBy.status ? 'selected' : ''}
            > 
            {folder.status}</li>)} */}
         {folders.map(folder => <li key={folder.id}> <Link  to={`/email/${folder.status}`}>{folder.title}</Link></li>
         )}

      </ul>


   )
}