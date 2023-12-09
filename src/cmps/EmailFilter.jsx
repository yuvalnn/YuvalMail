import { useState , useEffect} from "react"
 


export function EmailFilter({filterBy, onSetFilter}) {
const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

      
       function handleChange(ev)
       {
        let { name: field, value } = ev.target
        
        setFilterByToEdit(prevfilter=>( {...prevfilter,[field]:value}))
       }


       useEffect(() => {
        onSetFilter(filterByToEdit)    
       
       }, [filterByToEdit])
       



    
       
     const {txt} = filterByToEdit
      
       
    return (
        
        <section className="Email-Filter">
           
           <label htmlFor="txt">Search</label>
            <input onChange={handleChange} id="txt" value={txt} name="txt" type="text" />

        </section>
    )


}