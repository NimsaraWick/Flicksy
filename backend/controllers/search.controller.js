import { response } from "express";
import { fetchfromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.js";

export async function searchPerson(req,res){
    const { query } = req.params;
    try{
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/person?query=${query} &language=en-US&page=1`);
        
        if(response.results.length === 0){
            // return res.status(404).json({success:false, message: "No results found"});
            return res.status(404).send(null);
        }
    
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date(),
                }
            }
        })
        res.json({success:true, content: response.results});
    }catch(error){
        console.log("Error in the searchPerson controller", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}
export async function searchMovie(req,res){
    const { query } = req.params;
    try{
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query} &language=en-US&page=1`);
        
        if(response.results.length === 0){
            // return res.status(404).json({success:false, message: "No results found"});
            return res.status(404).send(null);
        }
   
        await User.findByIdAndUpdate(req.user._id, {    
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt:new Date(),
                }
            }
        })
        res.json({success:true, content: response.results});
    }catch(error){
        console.log("Error in the searchMovie controller", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}
export async function searchTv(req,res){
    const { query } = req.params;
    try{
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query} &language=en-US&page=1`);
        
        if(response.results.length === 0){
            // return res.status(404).json({success:false, message: "No results found"});
            return res.status(404).send(null);
        }
    
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt:new Date(),
                }
            }
        })
        res.json({success:true, content: response.results});
    }catch(error){
        console.log("Error in the searchTV controller", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}
export async function getSearchHistory(req,res){

    try{
        res.status(200).json({ success:true, content: req.user.searchHistory });
    }catch(error){
        console.log("Error in the search controller", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}
export async function removeItemFromSearchHistory(req,res){
    let {id} = req.params;
    // console.log(typeof id);
    id = parseInt(id);
    try{
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory: {id:id},
            },
        });
        res.status(200).json({ success:true, content: req.user.searchHistory });
    }catch(error){
        console.log("Error in the search controller", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

 
