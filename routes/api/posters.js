const express = require('express')
const router = express.Router();

const posterServices = require('../../dal/PosterServices')

const { Poster } = require('../../models');
const { createPosterForm } = require('../../forms');

router.get('/', async(req,res)=>{
    res.send(await posterServices.getAllPosters())
})


router.post('/', async (req, res) => {

    const allMediaProperties = await posterServices.getAllMediaProperties();

    const allTags = await posterServices.getAllTags();
    const posterForm = createPosterForm(allMediaProperties, allTags);

    posterForm.handle(req, {
        'success': async (form) => {                    
            let { tags, ...posterData } = form.data;
            const poster = new Product(posterData);
            await poster.save();
    
            // save the many to many relationship
            if (tags) {
                await poster.tags().attach(tags.split(","));
            }
            res.send(poster);
        },
        'error': async (form) => {
           let errors = {};
           for (let key in form.fields) {
               if (form.fields[key].error) {
                   errors[key] = form.fields[key].error;
               }
           }
           res.send(JSON.stringify(errors));
        }
    })

})

module.exports = router;