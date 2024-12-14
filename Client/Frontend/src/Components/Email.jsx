import axios from 'axios';
import React, { useState } from 'react';

function Email() {
    const [data, setData] = useState({
        email: "",
        uuid: ""
    });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://filesharingapplication-server.onrender.com/api/file/sendDownloadEmail', data);
            console.log(response);

           setMessage(response.data.message);
            setData({
                email: "",
                uuid: ""
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex justify-center items-center gap-4 flex-col bg-orange-300 w-1/2 py-4 rounded'>
            <h2 className='font-bold text-3xl text-teal-700'>Sending Email</h2>
            {message.length > 0 ? (<h4 className='font-bold text-2xl text-sky-500'>{message}</h4>) : (
            <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    className='outline-none border-none rounded w-96 bg-sky-200 px-2'
                />
                <br />
                <input
                    type="text"
                    name="uuid"
                    placeholder="Enter UUID"
                    value={data.uuid}
                    onChange={handleChange}
                     className='outline-none border-none rounded w-96 bg-sky-200 px-2'
                />
                <br />
                <button type="submit" className='p-2 rounded bg-blue-400 hover:bg-blue-600 hover:text-white'>Send</button>
            </form>
            )}
        </div>
    );
}

export default Email;
