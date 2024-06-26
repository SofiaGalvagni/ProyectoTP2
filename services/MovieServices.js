import Movie from "../models/Movie.js";
import BookingService from "./BookingService.js";

const bookingService = new BookingService();


class MovieServices{

getAllMovies = async()=>{
  try {
    return await Movie.findAll()
  } catch (error) {
    
  }
}
getById = async(id)=>{
  try {
    return await Movie.findByPk(id)
  } catch (error) {
    throw error
  }
}
createMovie = async (newMovie)=>{
  try {
      return await Movie.create(newMovie);
  } catch (error) {
    throw error
  }
}
updateMovie = async(id, newData)=>{
  try {
    const movie = await this.getById(id)
    
    movie.set({...newData})

    return await movie.save()
  } catch (error) {
    
  }
}
deleteMovie = async(id)=>{
  try {
    const movie = await this.getById(id)
    return await movie.destroy()
  } catch (error) {
    
  }
}





bookMovie = async (userId, movieId) =>{
   try {
   
  //traer y verificar existencia de pelicula deseada
  const movie = await this.getById(movieId);
  if (!movie) throw new Error("Movie not found"); 

  //verificar si hay stock disponible de la pelicula deseada. CREAR
  if(movie.stockDisponible <= 0) throw new Error("No hay stock de pelicula deseada");

  //al final de todo
  const reserva =  await bookingService.createBooking(userId, movie);
  if(!reserva) throw new Error("No fué posible crear Reserva");

  let newStockAlquilado = movie.stockAlquilado + 1;
  let newStockDisponible = movie.stockDisponible - 1;
  movie.set({ stockAlquilado: newStockAlquilado, stockDisponible: newStockDisponible});
  await movie.save();

  return reserva;
 
} catch (error) {
    throw error
}  
}



returnMovie = async (userId, movieId) =>{
try {
  const laReserva =  await bookingService.findOne({ 
    where: { 
      userId: userId,
      movieId: movieId,
      devuelto: false
    } 
  });
  if(!laReserva) throw new Error("No se encontró la reserva");

  const movie = await this.getById(movieId);
  let newStockAlquilado = movie.stockAlquilado - 1;
  let newStockDisponible = movie.stockDisponible + 1;
  movie.set({ stockAlquilado: newStockAlquilado, stockDisponible: newStockDisponible});
  await movie.save();

  const reservaFinalizada = await bookingService.finishBooking(laReserva.id)

  return reservaFinalizada
  
} catch (error) {
  throw error
}
}

}

export default MovieServices;