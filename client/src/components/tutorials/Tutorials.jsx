import React, { useState, useEffect } from 'react';
import './Tutorials.css';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([]);

  useEffect(() => {
    // Fetch tutorials from backend
    const fetchTutorials = async () => {
      try {
        const response = await fetch(`http://localhost:4000/exam-api/tutorials`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const allTutorials = data.flatMap(item => 
          item.tutorials.map(link => {
            const videoId = new URLSearchParams(new URL(link).search).get('v'); 
            return {
              title: item.subjectName, 
              subject: item.subjectName, 
              link: link, 
              thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null 
            };
          })
        );

        
        const uniqueTutorials = allTutorials.filter((tutorial, index, self) => 
          index === self.findIndex(t => t.link === tutorial.link)
        );

        
        const filteredTutorialsWithThumbnails = uniqueTutorials.filter(tutorial => tutorial.thumbnail);

        
        const sortedData = filteredTutorialsWithThumbnails.sort((a, b) => a.title.localeCompare(b.title));
        setTutorials(sortedData);
        setFilteredTutorials(sortedData);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTutorials();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = tutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTutorials(filtered);
  };

  return (
    <div className="tutorials-container">
      <div className="tutorials-search-container">
        <form className="tutorials-search-form" onSubmit={handleSearch}>
          <div className="tutorials-search-icon-container">
            <i className="tutorials-search-icon fas fa-search"></i>
          </div>
          <input
            type="text"
            className="tutorials-search-input"
            placeholder="Search for tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="tutorials-search-button">
            Search
          </button>
        </form>
      </div>

      
      <div className="tutorials-list">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial, index) => (
            <div key={index} className="tutorials-item">
              
              <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                <img 
                  className="tutorials-thumbnail" 
                  src={tutorial.thumbnail} 
                  alt={`Thumbnail for ${tutorial.title}`} 
                />
              </a>

              
              <a href={tutorial.link} target="_blank" rel="noopener noreferrer" className="tutorials-title">
                {tutorial.subject}
              </a>
            </div>
          ))
        ) : (
          <p className="tutorials-no-results">No tutorials found</p>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
