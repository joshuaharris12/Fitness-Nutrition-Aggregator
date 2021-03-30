import React,{useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import { getPosts, updatePost } from '../../actions/posts';
import {newArray} from '../Navbar/Searchbox';
var newPosts=[];
const Posts = ({setCurrentId,updatedPosts,setUpdatedPosts}) => {
    if(updatedPosts.length>0)
    {
        newPosts=[];
    for(var i=0; i<updatedPosts.length;i++)
    {
        newPosts.push(updatedPosts[i]._id);
    }
    }
    else{
        newPosts=[];
        for(var i=0; i<newArray.length;i++)
        {
            newPosts.push(newArray[i]._id);
        }
    }
    const posts = useSelector((state) => state.posts.filter((post) => newPosts.includes(post._id)));
    const classes = useStyles();
    const dispatch = useDispatch();
  
    return (
            <Grid className={classes.mainContainer} container spacing={3}> 
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                    </Grid> 
                ))}
            </Grid>
    );
}

export default Posts;



// professional -> has post -> visible

// search -> profile -> not found -> "The user you are looking for might not have an account or has not posted anything yet."
