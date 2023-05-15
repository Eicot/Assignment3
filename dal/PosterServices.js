// import in poster model
const { Poster, MediaProperty, Tag } = require('../models');

const getAllPosters = async() => {
    return await Poster.collection().fetch({
        withRelated: ['tags', 'mediaproperty']
        
    })
}

const searchPosters = async({title,mediapropertyId,minCost,maxCost,tags}) => {
    const q = Poster.collection();
    if (title) {
        q.where('title', 'like', '%' + title + '%')
   }

   if (mediapropertyId && mediapropertyId != "0") {
        q.where('mediaproperty_id', '=', mediapropertyId)
   }

   if (minCost) {
        q.where('cost', '>=', minCost)
   }

   if (maxCost) {
       q.where('cost', '<=', maxCost);
   }
    if(tags) {
        q
        .query("join", "posters_tags", "posters.id", "poster_id")
        .where("tag_id", "in", tags.split(","));
    }
    

    return await q.fetch({withRelated: ['tags']})
}


const getAllMediaProperties = async () => {
    return await MediaProperty.fetchAll().map((mediaproperty) => {
        return [mediaproperty.get('id'), mediaproperty.get('name')];
    })
}

const getAllTags = async () => {
    return await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')]);
}

const createPoster = async (
    title,
    cost,
    description,
    date,
    stock,
    height,
    width,
    mediapropertyId,
    tags,
    imageUrl
  ) => {
    const poster = new Poster({
      title,
      cost,
      description,
      date,
      stock,
      height,
      width,
      mediaproperty_id: mediapropertyId,
      image_url: imageUrl,
    });
  
    // remember to save the newly created poster
    await poster.save();
  
    if (tags) {
      await poster.tags().attach(tags.split(","));
    }
    return poster;
  };

const getPosterByID = async (posterId) => {
    return await Poster.where({
        'id': parseInt(posterId)
    }).fetch({
        require: true,
        withRelated: ['tags', 'mediaproperty']
    });
}


module.exports = {
    getAllPosters, 
    searchPosters, 
    getAllMediaProperties, 
    getAllTags,
    createPoster,
    getPosterByID
}