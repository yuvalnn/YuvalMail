
export function EmailAction({email , onUpdateEmail}){
    
  
    function onToggleStar() {          
        const updateEmail = {...email,isStarred : email.isStarred ? false : true}   
       onUpdateEmail(updateEmail)
      } 
    
    const isSelected  = email.isStarred ? '' : 'selected'         
    return (
        <div className={`star-preview fa fa-star ${isSelected}`}
         onClick={() => { onToggleStar() }}>
                 
        </div>                    
    )
}