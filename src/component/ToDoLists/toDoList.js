import React from "react";

const ToDoList = ({ val, idx, handleEdit, handleDelete}) => {
    return (
        <tr className="todorow">
            <td className="tododata">{val.task} {new Date(val.date) < new Date() ? <span className="expired">Expired</span> : ''}</td>
            <td className="tododata">{val.date}</td>
            <td className='iner_btn'>
                <button className='in_btn' onClick={() => handleEdit(idx)}><strong>Edit</strong></button>
                <button className='inr_btn' onClick={() => handleDelete(idx)}><strong>Delete</strong></button>
            </td>
        </tr>
    )
}
export default ToDoList;
