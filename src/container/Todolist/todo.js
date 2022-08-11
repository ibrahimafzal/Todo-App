import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import ToDoList from '../../component/ToDoLists/toDoList';
import { orderBy } from 'lodash'



const Todo = () => {
    const [toDoList, setToDoList] = useState([
        { id: 1, task: "Meeting", date: new Date().toLocaleString(), description: "I am going to DC office" },
        { id: 2, task: "Go to Lahore", date: new Date().toLocaleString(), description: "For attending marriage ceremony" },
        { id: 3, task: "Send an email", date: new Date().toLocaleString(), description: "Apply for new job" },
        { id: 4, task: "Birthday Party", date: new Date().toLocaleString(), description: "Abdul Hadi birthday party" }
    ]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [listIndex, setListIndex] = useState('');
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [sortDate, SetSortDate] = useState(false);
    const [inputText, SetInputText] = useState([])

    const handleAddTodo = () => {
        setModalIsOpen(true);
        setEdit(false);
        setTask('');
        setDate('');
        setDescription('');
    }
    const handleEdit = (idx) => {
        setModalIsOpen(true);
        setEdit(true);
        setListIndex(idx);
        setTask(toDoList[idx].task);
        setDate(new Date(toDoList[idx].date).toISOString());
        setDescription(toDoList[idx].description)

    }
    const handleCancel = () => {
        setModalIsOpen(false);
    }
    const handleDelete = (idx) => {
        toDoList.splice(idx, 1);
        setToDoList([...toDoList]);
    }
    const handleSave = (e) => {
        e.preventDefault();
        toDoList.push({ task, date: new Date(date).toLocaleString(), description });
        setToDoList([...toDoList]);
        setModalIsOpen(false);
    }
    const handleUpdate = () => {
        const targets = {
            task: task,
            date: new Date(date).toLocaleString(),
            description: description
        }
        toDoList[listIndex] = targets
        setToDoList([...toDoList]);
        setTask('');
        setDate('');
        setEdit(false);
        setModalIsOpen(false);
    }
    const handleSortDate = () => {
        SetSortDate(!sortDate)
        if (!sortDate) {
            const sorting = orderBy(toDoList, ['date'], ['asc'])
            console.log(sorting)
            setToDoList([...sorting])
        }
    }

    return (
        <div className='main_div2'>
            <h2>Todo List</h2>
            <div className='out_btn'>
                <button className='ot_btn' onClick={handleAddTodo}><strong>Add Todo</strong></button> {' '}
                <input className='searchinpt' type="search" placeholder="Search.." value={inputText} onChange={(e)=> SetInputText(e.target.value).toLowerCase()} />
                <button type="submit"><i className="fa fa-search"></i></button>

            </div>
            <br />
            <table className='todolisttable'>
                <tr className='upper_tr'>
                    <th className='table_th'>Task</th>
                    <th onClick={handleSortDate} className='table_th'>Date</th>
                    <th className='table_th'>Action</th>
                </tr>
                {toDoList.filter((item)=>{
                    if(inputText === ""){
                        return item
                    }else if(item.task.toLowerCase().includes(inputText)){
                        return item
                    }
                }).map((val, idx) => {
                    return (
                        <ToDoList
                            key={idx}
                            idx={idx}
                            val={val}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )
                })}

            </table>
            <div className='todomodal'>
                <Modal isOpen={modalIsOpen}>
                    <h1>Please type your tasks here...</h1>
                    <div className='todo_container'>
                        <div className='abc'>
                            <label htmlFor="name" className='dolabel'><strong>Task:</strong></label>
                            <input type="text" value={task} placeholder='Your task...' className='doinpt' onChange={(e) => setTask(e.target.value)} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="date" className='dolabel' ><strong>Date:</strong></label>
                            <input type="datetime-local" value={date} className='doinpt' onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="description" className='dolabel'><strong>Description:</strong></label>
                            <textarea name="text" rows="5" cols="60" placeholder='Write description...' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <br />
                    </div>
                    <div className='todoform_btn'>
                        <button className='form_btn' onClick={handleCancel}><strong>Cancel</strong></button>
                        {
                            !edit ?
                                <button className='form_btn2' onClick={handleSave}><strong>Save</strong></button> :
                                <button className='form_btn2' onClick={handleUpdate}><strong>Update</strong></button>
                        }
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Todo;


