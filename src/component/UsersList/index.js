import React from 'react'

const UsersList = ({ val, idx, handleChecked, handleEdit, handleDelete }) => {

    return (
        <tr className='userrow'>
            <td className='userdata'>
                <input type="checkbox" checked={val.isChecked} onChange={(e) => handleChecked(e, idx)}></input>
                {val.id}
            </td>
            <td className='userdata'>{val.name}</td>
            <td className='userdata'>{val.age}</td>
            <td className='userdata'>{val.phone}</td>
            <td className='inner_btn'>
                <button className='i_btn' onClick={() => handleEdit(idx)}><strong>Edit</strong></button>
                <button className='i_btn' onClick={() => handleDelete(idx)}><strong>Delete</strong></button>
            </td>
        </tr>
    )
}

export default UsersList;