import React, { useState, useEffect } from 'react';
import '../CSS/ProfilePage.css';
import { useParams, NavLink } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [time, setTime] = useState(new Date(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [timezoneData, setTimezoneData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data based on the id parameter
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userData = await userResponse.json();
        setUser(userData);
        console.log('User Data:', userData);

        // Fetch posts data based on the user's id
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const postsData = await postsResponse.json();
        setPosts(postsData);
        console.log('Posts Data:', postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchData();
    
    return () => {
      clearInterval(intervalId);
    };
  }, [id]);
  const openPopup = (postId) => {
    setSelectedPost(postId);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup();
    }
  };
  useEffect(() => {
    // Fetch timezones from the API
    fetch('https://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(data => setTimezones(data));

    // Clear the timer when the component unmounts
    return () => clearInterval(timerId);
  }, [timerId]);
  useEffect(() => {
    if (selectedTimezone) {
      // Fetch timezone data from the API based on the selected timezone
      fetch(`https://worldtimeapi.org/api/timezone/${selectedTimezone}`)
        .then(response => response.json())
        .then(data => {
          setTimezoneData(data);
          setTime(new Date(data.utc_datetime));
          setIsPlaying(true);
        })
        .catch(error => console.error('Error fetching timezone data:', error));
    }
  }, [selectedTimezone]);
  useEffect(() => {
    if (isPlaying) {
      setTimerId(setInterval(() => {
        setTime(prevTime => new Date(prevTime.getTime() + 1000));
      }, 1000));
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isPlaying]);

  const handlePlayPauseClick = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };


  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section>
        <div className="container MainDivOfProfilePage">
          <div>
            <div className="row RowofClock">
              <div className="col-md-5">
                <NavLink to='/' >
                  <button type="button" className="BackButton">Back</button>
                </NavLink>
              </div>
              <div className="col-md-2">
                <div>
                  <select className='DivOfselect' value={selectedTimezone} onChange={handleTimezoneChange}>
                    {timezones.map((timezone, index) => (
                      <option key={index} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-5 ClockDIGI">
                <div className="digital-clock-container">
                  <div className="digital-clock">{time.toISOString().substr(11, 8)}</div>
                </div>
                <button className='PausePlay' onClick={handlePlayPauseClick}>{isPlaying ? 'Pause' : 'Play'}</button>
              </div>
            </div>
          </div>
          <div>
            <h1 className='ProfilePage'>Profile Page</h1>
          </div>
          <div className='MainDivOfUserinfo'>
            <div className="row">
              <div className="col-md ColumnofProfilePage ">
                <div>
                  <div>Name: {user.name}</div>
                  <div className='DivofUserInfo'>
                    <div>Username: {user.username}</div>
                    <div className="vr Line"></div>
                    <div>Catch phrase: {user.company.catchPhrase}</div>
                  </div>
                </div>
                <div className='SecondDivofProfile'>
                  <div>Address:{user.address.street}, {user.address.suite}, {user.address.zipcode}  </div>
                  <div className='DivofUserInfo'>
                    <div>Email:{user.email}</div>
                    <div className="vr Line"></div>
                    <div>Phone: {user.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="DivOfpost">
            {posts.map((post) => (
              <div key={post.id} className="post" onClick={() => openPopup(post.id)}>
                <h3 className='TitleOfPost'>{post.title}</h3>
                <p className='ParaOfCard'>{post.body}</p>
              </div>
            ))}
          </div>
          {selectedPost && (
            <div className="popup" onClick={handleOverlayClick}>
              <div className="popup-content">
                <h3 className="TitleOfPost">{posts.find((post) => post.id === selectedPost)?.title}</h3>
                <p className='ParaOfCard'>{posts.find((post) => post.id === selectedPost)?.body}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
