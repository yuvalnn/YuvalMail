import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom";


export function EmailFolderList({ folders}) {   
   const [searchParams,setSearchParams] = useSearchParams()
   
   return (
      <ul className="folders-list">          
         {folders.map(folder => 
         <li key={folder.id}> <Link  
         to={`/email/${folder.status}?${searchParams}`}>{folder.title}
         </Link></li>
         )}
      </ul>
   )
}