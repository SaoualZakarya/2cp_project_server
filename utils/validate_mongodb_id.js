import mongoose from "mongoose";

const validateMongoDbId = (id)=>{
    // True mean valide id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
} 


export default validateMongoDbId