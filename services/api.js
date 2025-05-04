import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 5000,
});

export async function fetchRecipesByIngredient(ingredient) {
  const response = await api.get('/filter.php', {
    params: { i: ingredient }
  });
  return response.data.meals || [];
}
