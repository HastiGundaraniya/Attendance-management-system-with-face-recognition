import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import StuSidebar from './StuSidebar'

function StuObjection() {
    const [date, setDate] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useAuthContext();

    return (
        <div className="container-fluid">
            <div className="row content d-flex">
                <StuSidebar />
                <div className='col-sm-10'>
                    <div className="nav d-flex justify-content-between">
                        <div>
                            <h4>Dashboard</h4>
                            <p>Hello {user.name}</p>
                        </div>
                    </div>
                    <div className="m-5">
                        <form>
                            <div className="form-group">
                                <label>Select Date:</label>
                                <input type="date" className='form-control'
                                value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Select Subject:</label>
                                <select className='form-control' 
                                onChange={(e) => setSubject(e.target.value)} value={subject}>
                                    <option value="">--select--</option>
                                    <option value="AI">AI</option>
                                    <option value="ML">ML</option>
                                    <option value="SE">SE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Add Descrption:</label>
                                <textarea  className='form-control'
                                value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <button className='btn btn-primary'>Send Request</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuObjection
