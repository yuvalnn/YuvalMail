import { useState, useEffect } from "react"



export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)

    }, [filterByToEdit])


    function handleChange(ev) {
        let { name: field, value } = ev.target
        console.log(field, value)
        // just for the isRead filter
        if (field === 'isRead' && value === '') {
            value = null
        }
        const fieldValue = value === "true" ? true : value === "false" ? false : value;

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: fieldValue }));
    }


    const { txt ,isDescending, isBySubject} = filterByToEdit
    const isReadValue = filterBy.isRead === null ? '' : filterByToEdit.isRead;
    return (

        <section className="email-filter">

            <div>
                <label htmlFor="txt">Search</label>
                <input onChange={handleChange} id="txt" value={txt} name="txt" type="text" />
            </div>

            <div className="filter-container">
                <button className={isDescending ? "is-descending" : ""} id="dateFilterButton" value={!isDescending} name = "isDescending" onClick={handleChange}>Date</button> 
                <button className={isBySubject ? "is-by-subject" : ""} id="subjectFilterButton" value={!isBySubject} name = "isBySubject" onClick={handleChange}>Subject</button> 
                <select id="isRead" name="isRead" value={isReadValue} onChange={handleChange}>
                    <option value=''>All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>

                 
            </div>

          


        </section>
    )


}