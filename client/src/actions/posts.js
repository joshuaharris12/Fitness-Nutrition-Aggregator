import { FETCH_ALL, CREATE, UPDATE, DELETE, ADD_TO_FAV, FETCH_FROM_ARRAY, FETCH } from '../constants/postsActionTypes';
import * as api from '../api/index';


export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
 
export const updatePost = (id,post) => async (dispatch) => {
  try{
     const { data} = await api.updatePost(id, post);

     dispatch({ type: UPDATE, payload: data});
  }catch(error){
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id,userId);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleFavAction = (id) => async (dispatch) =>{
  try {
    const { data } = await api.toggleFavAction(id);

    dispatch({ type: ADD_TO_FAV, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  
  try {
      const { data } = await api.getPost(id);
      
      dispatch( {type: FETCH, payload: data} );
  } catch (error) {
      console.log(error.message);
  }
};

export const getPostsFromArray = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPostsFromArray(id);
      
    dispatch( {type: FETCH_FROM_ARRAY, payload: data} );
  } catch (error) {
    console.log(error.message);
  }

};