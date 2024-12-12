import React, {useState, useEffect} from "react"

const UserRents = () => {
    const [rents, setRents] = useState([]);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [message, setMessage] = useState('');
    const userId = localStorage.getItem('userId');

    const getAllRents = () => {
        fetch(`http://localhost:555/userrents/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include"
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to fetch rents');
                    return [];
                }
            })
            .then((data) => {
                setRents(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching rents:', error);
            });
    };


    useEffect(() => {
        getAllRents();

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedin(true);
        } else {
            setIsLoggedin(false);
        }
    }, []);

    return (
        <div className="form-section">
      <h3>My Rents</h3>
      {message}
      <ul>
        {rents.map((item, idx) => (
          <li key={idx}>
            {item.TYPE} - {item.MODEL} (Quantity: {item.QUANTITY})
          </li>
        ))}
      </ul>
    </div>
    )
}

export default UserRents;