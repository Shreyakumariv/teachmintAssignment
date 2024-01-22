import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Directory.css';

function Directory() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Fetch post data
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const getUserPostsCount = (userId) => {
    return posts.filter((post) => post.userId === userId).length;
  };

  const handleUserClick = (id) => {
    // Navigate to the ProfilePage with the user's id
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <section>
        <div className="container DivOfContainer">
          <div className='textofheader'>
            <h1>Directory</h1>
          </div>
          <div className='DivofDirectory'>
            {users.map((user) => (
              <div key={user.id} className="row Divofdirectoryrow" onClick={() => handleUserClick(user.id)}>
                <div className="col-md MainDivofDirectory">
                  <div className='Divofname'>Name: {user.name}</div>
                  <div className='Divofpost'>Post: {getUserPostsCount(user.id)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Directory;
