import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=30`);
    
    // Map products to simplified course objects
    const courses = response.data.products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.thumbnail,
      rating: product.rating,
      category: product.category,
    }));
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
