import { isEditable } from '@testing-library/user-event/dist/utils';
import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import UsersList from '../../component/UsersList';
import { orderBy } from 'lodash'

const Home = () => {

    const [users, setUsers] = useState([
        { id: 1, name: "M.Ali", age: 25, phone: "03457896543", isChecked: false },
        { id: 2, name: "M.Waqas Samor", age: 28, phone: "03404562341", isChecked: false },
        { id: 3, name: "Hafiz Farooq", age: 29, phone: "03140986547", isChecked: false },
        { id: 4, name: "M.Quddus", age: 35, phone: "03335602573", isChecked: false }
    ]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedIndex, setSelectedIndex] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [checkedIdx, setCheckedIdx] = useState([]);
    const [sortOrder, setSortOrder] = useState(false)


    const handleAddUser = () => {
        setModalIsOpen(true);
        setIsEdit(false);
        setName('');
        setAge('');
        setPhone('');
    }
    const handleSave = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
        users.push({ id: users.length + 1, name, age, phone });
        setUsers([...users]);
        setSelectedIndex(true)
        console.log(users);
    }
    const handleEdit = (idx) => {
        setModalIsOpen(true);
        setSelectedIndex(idx);
        setIsEdit(true);
        setName(users[idx].name);
        setAge(users[idx].age);
        setPhone(users[idx].phone);
    }
    const handleDelete = (key) => {
        users.splice(key, 1)
        setUsers([...users])
        console.log(users);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }
    const handleEditSave = () => {
        const user = {
            id: users[selectedIndex].id,
            name: name,
            age: age,
            phone: phone
        }
        users[selectedIndex] = user;
        setUsers([...users]);
        setModalIsOpen(false);
        setIsEdit(false);
        setName('');
        setAge('');
        setPhone('');
        console.log(users)
    }
    const handleChecked = (e, idx) => {

        // console.log('111 ', e.target.checked)
        users[idx].isChecked = e.target.checked;
        // console.log('2222', users)
        setUsers([...users])
    }
    const handleAllDelete = () => {
        const myArr = users.filter((item) => !item.isChecked)
        console.log(myArr)
        setUsers([...myArr])
        setCheckedIdx([]);
    }
    const handleSort = () => {
        setSortOrder(!sortOrder);
        if (!sortOrder)
        {
            const data = orderBy(users, ['name'], ['asc']);
            console.log('ascending', data)
            setUsers([...data])
        } else
        {
            const data = orderBy(users, ['name'], ['desc'])
            setUsers([...data])
            console.log('descending', data)
        };
    }

    return (
        <div className='main_div'>
            <div className='outer_btn'>
                <button className='o_btn' onClick={handleAddUser} ><strong>Add User</strong></button> <br /><br />
                <button className='o_btn' onClick={handleAllDelete}><strong>Delete all</strong></button> <br /><br />
                <button className='o_btn' onClick={handleSort}><strong>Asc | Desc</strong></button>
            </div>
            <table className='userlisttable'>
                <tr className='upper_tr'>
                    <th className='tablehead'>ID</th>
                    <th className='tablehead'>Name</th>
                    <th className='tablehead'>Age</th>
                    <th className='tablehead'>Phone</th>
                    <th className='tablehead'>Action</th>                
                </tr>
                {users.map((val, idx) => {
                    return (
                        <UsersList
                            key={idx}
                            idx={idx}
                            val={val}
                            handleChecked={handleChecked}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )
                })}
            </table>

            <div className='modal'>
                <Modal isOpen={modalIsOpen}>
                    <h2 className='heading'>Type your information</h2>
                    <div className='container'>
                        <div>
                            <label htmlFor="name" className='user_label'><strong>Name:</strong></label>
                            <input className='inpt' type="text" placeholder='Your Name..' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="age" className='user_label'><strong>Age:</strong></label>
                            <input className='inpt' type="text" placeholder='Your Age..' value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="phone" className='user_label'><strong>Phone:</strong></label>
                            <input className='inpt' type="number" placeholder='Your Phone Number..' value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <br></br>
                    <div className='form_btn'>
                        <button className='f_btn' onClick={handleCloseModal}><strong>Cancel</strong></button> | {' '}
                        {
                            !isEdit ?
                                <button className='f_btn' onClick={handleSave}>
                                    <strong>Save</strong>
                                </button> :
                                <button className='f_btn' onClick={handleEditSave}>
                                    <strong>Update</strong>
                                </button>
                        }
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default Home;



