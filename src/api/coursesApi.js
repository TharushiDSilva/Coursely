import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const fetchCourses = async () => {
  try {
    // Fetch trending/popular books using the subjects endpoint
    const response = await axios.get(`${API_URL}/subjects/programming.json?limit=30`);
    
    // Map books to simplified course objects
    const courses = response.data.works.map((book, index) => ({
      id: book.key || index,
      title: book.title,
      description: book.subject ? book.subject.slice(0, 3).join(', ') : 'A comprehensive guide to programming and software development.',
      image: book.cover_id 
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
        : 'https://via.placeholder.com/300x400?text=No+Cover',
      rating: book.has_fulltext ? 4.5 : 4.0, // Mock rating based on availability
      category: book.authors && book.authors[0] ? book.authors[0].name : 'Programming',
      author: book.authors && book.authors[0] ? book.authors[0].name : 'Unknown Author',
      publishYear: book.first_publish_year || 'N/A',
    }));
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
