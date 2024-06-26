import MovieServices from "../services/MovieServices.js";

class MovieController{

  movieServices = new MovieServices();

  getAllMovies = async(req, res)=>{
    try {
      const data = await this.movieServices.getAllMovies();
      res.status(201).send({
        message: data,
      });
      
    } catch (error) {
      res.status(400).send({ succces: false, message: error.message });
    }
  }

  createMovie= async (req, res)=>{
    try {
      const newMovie = {
        name : req.body.name, 
        description : req.body.description, 
        director : req.body.director, 
      };
      const data = await this.movieServices.createMovie(newMovie)

      res.status(201).send({
        message: data,
      });
      
    } catch (error) {
      res.status(400).send({ succces: false, message: error.message });
    }
    
  }

  getById = async(req, res)=>{
    try {
      const {id} = req.params;
      const data = await this.movieServices.getById(id)
      res.status(201).send({
        message: data,
      });
      
    } catch (error) {
      
    }
  }

  updateMovie = async(req, res)=>{
    try {
      const {id} = req.params;
      const newData = req.body;
      const data = await this.movieServices.updateMovie(id, newData)
      res.status(201).send({
        message: data,
      });
      
    } catch (error) {
      
    }
  }

  deleteMovie = async(req, res)=>{
    try {
      const {id} = req.params;
      const data = await this.movieServices.deleteMovie(id)
      res.status(201).send({
        message: data,
      });
      
    } catch (error) {
      
    }
  }
  

}

export default MovieController; 