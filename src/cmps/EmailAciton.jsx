import { useEffect, useState } from "react"

export function EmailAction({email , onUpdateEmail}){
    const [isStarred, setIsStarred] = useState(email.isStarred)
    

    function onToggleStar() { 
         setIsStarred((prevStar)=>(!prevStar))    
         const updateEmail = {...email,isStarred : !isStarred}   
         onUpdateEmail(updateEmail)             
      }       

    const isSelected  = isStarred ? 'selected' : ''         
    return (
        <div className={`star-preview fa fa-star ${isSelected}`}
         onClick={() => { onToggleStar() }}>
                 
        </div>                    
    )
}