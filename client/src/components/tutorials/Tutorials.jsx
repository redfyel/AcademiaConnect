import React, { useState, useEffect } from 'react';
import './Tutorials.css';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(''); // State for selected semester
  const [semesters, setSemesters] = useState([]); // State for semesters

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
              thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null,
              semno: item.semno // Add semester number to each tutorial
            };
          })
        );

        const uniqueTutorials = allTutorials.filter((tutorial, index, self) => 
          index === self.findIndex(t => t.link === tutorial.link)
        );

        const filteredTutorialsWithThumbnails = uniqueTutorials.filter(tutorial => tutorial.thumbnail);

        // Get unique semester numbers for dropdown
        const uniqueSemesters = [...new Set(data.map(item => item.semno))];
        setSemesters(uniqueSemesters);

        // Sort the tutorials by semester number first, then by title
        const sortedData = filteredTutorialsWithThumbnails.sort((a, b) => {
          if (a.semno !== b.semno) {
            return a.semno - b.semno; // Sort by semester number
          }
          return a.title.localeCompare(b.title); // Then sort by title
        });

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

  const handleSemesterChange = (event) => {
    const selected = event.target.value;
    setSelectedSemester(selected);
    // Filter tutorials based on the selected semester
    const filtered = tutorials.filter(tutorial => tutorial.semno.toString() === selected);
    setFilteredTutorials(filtered);
  };

  return (
    <div className="tutorials-container">
      <h1 className="tutorials-header">Master any subject with clear, step-by-step lecture tutorials!</h1>
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
        <select className="tutorials-semester-select" value={selectedSemester} onChange={handleSemesterChange}>
          <option value="">Select Semester</option>
          {semesters.map((sem, index) => (
            <option key={index} value={sem}>{`Semester ${sem}`}</option>
          ))}
        </select>
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
