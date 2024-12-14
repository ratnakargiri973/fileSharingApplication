import axios from 'axios';
import React, { useState } from 'react';

function Email() {
    const [data, setData] = useState({
        email: "",
        uuid: ""
    });

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
            const response = await axios.post('http://localhost:2001/api/file/sendDownloadEmail', data);
            console.log(response);

           
            setData({
                email: "",
                uuid: ""
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Sending Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="uuid"
                    placeholder="Enter UUID"
                    value={data.uuid}
                    onChange={handleChange}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Email;
