import { useState , useEffect} from "react"
 

export function EmailFolderList({folders, filterBy, onSetFilter}) {
const [filterByToEdit, setFilterByToEdit]  = useState(filterBy)

      useEffect(()=>{
        onSetFilter(filterByToEdit)
      }, [filterByToEdit] )
      
   function handleChange(folder,field) {


      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: folder.status }));
      console.log('change folfer:' + folder.status )
   }
 
   
   return (
    <ul className="folders-list">

    {folders.map(folder=> 
       <li  key={folder.id} onClick={()=> handleChange(folder, "status")}> {folder.status}</li>)}
    </ul>
        
 
   )
}