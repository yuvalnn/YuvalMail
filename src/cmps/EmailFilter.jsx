import { useState , useEffect} from "react"
 


export function EmailFilter({filterBy, onSetFilter}) {
const [filterByToEdit, setFilterByToEdit] = useState(filterBy)




       useEffect(() => {
        onSetFilter(filterByToEdit)    
       
       }, [filterByToEdit])


       function handleChange(ev)
       {
        let { name: field, value } = ev.target
       
       const fieldValue = value === "true" ? true : value === "false" ? false : value;

       setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: fieldValue }));
}

    
       
     const {txt,isRead} = filterByToEdit   
     const isReadValue = isRead === null ? '' : isRead;         
    return (
        
        <section className="email-Filter">
           
            <div>
           <label htmlFor="txt">Search</label>
            <input onChange={handleChange} id="txt" value={txt} name="txt" type="text" />
            </div>
            
            <div>
            <select id="isRead" name="isRead" value={isReadValue} onChange={handleChange}>
               <option value=''>All</option>
               <option value="true">Read</option>
               <option value="false">Unread</option> 
            </select>
            </div>


        </section>
    )


}