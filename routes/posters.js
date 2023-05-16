const express = require("express");
const router = express.Router();

const posterServices = require('../dal/PosterServices')
// #1 import in the Poster model
const {Poster, MediaProperty, Tag} = require('../models')
// import in the Forms
const { bootstrapField, createPosterForm, createSearchForm } = require('../forms');

// import in the CheckIfAuthenticated middleware
const { checkIfAuthenticated } = require('../middlewares');

router.get('/', checkIfAuthenticated, async (req,res)=>{
    // get all the mediaproperty
   
    const allMediaProperties = await posterServices.getAllMediaProperties();
    allMediaProperties.unshift([0, 'Any Media Property']);

    // Get all the tags
    const allTags = await posterServices.getAllTags();
    allTags.unshift(['', 'Any Tag']);

   // Create search form 
    let searchForm = createSearchForm(allMediaProperties, allTags);

    searchForm.handle(req, {
        'empty': async (form) => {
            let posters = await posterServices.getAllPosters({});

            
            res.render('posters/index', {
                'posters': posters.toJSON(), 
                'searchForm': form.toHTML(bootstrapField)
            })
                   },
        'error': async (form) => {
            let posters = await posterServices.searchPosters({});
            res.render('posters/index', {
                'posters': posters.toJSON(), 
                'searchForm': form.toHTML(bootstrapField)
            })
                    },
        'success': async (form) => {
//             if (form.data.title) {
//                 q.where('title', 'like', '%' +form.data.title + '%')
//            }

//            if (form.data.mediaproperty_id && form.data.mediaproperty_id != "0"
// ) {
//                 q.where('mediaproperty_id', '=', form.data.mediaproperty_id)
//            }

//            if (form.data.min_cost) {
//                 q.where('cost', '>=', form.data.min_cost)
//            }

//            if (form.data.max_cost) {
//                q = q.where('cost', '<=', form.data.max_cost);
//            }

//             if (form.data.tags) {
//                q.query('join', 'posters_tags', 'posters.id', 'poster_id')
//                .where('tag_id', 'in', form.data.tags.split(','))
//            }
           let posters = await posterServices.searchPosters({
            title: form.data.title,
            mediapropertyId: form.data.mediaproperty_id,
            minCost: form.data.min_cost,
            maxCost: form.data.max_cost,
            minHeight: form.data.min_height,
            maxHeight: form.data.max_height,
            tags: form.data.tags,
           })
        res.render('posters/index', {
            'posters': posters.toJSON(), 
            'searchForm': form.toHTML(bootstrapField)
        })
           
        }
    })
})

router.get('/create', checkIfAuthenticated, async (req, res) => {

    const allMediaProperties = await posterServices.getAllMediaProperties();

    const allTags = await posterServices.getAllTags();

    const posterForm = createPosterForm(allMediaProperties, allTags);
    res.render('posters/create',{
        'form': posterForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/create', checkIfAuthenticated, async(req,res)=>{

    const allMediaProperties = await posterServices.getAllMediaProperties();

    const allTags = await posterServices.getAllTags();

    const posterForm = createPosterForm(allMediaProperties, allTags);
    posterForm.handle(req, {
        'success': async (form) => {
            // const poster = new Poster();
            // poster.set('title', form.data.title);
            // poster.set('cost', form.data.cost);
            // poster.set('description', form.data.description);
            // poster.set('date', form.data.date);
            // poster.set('stock', form.data.stock);
            // poster.set('height', form.data.height);
            // poster.set('width', form.data.width);
            // poster.set('mediaproperty_id', form.data.mediaproperty_id)
            // poster.set('image_url', form.data.image_url);
            // await poster.save();

            // if (form.data.tags) {
            //     const tagArray = form.data.tags.split(',');
            //     await poster.tags().attach(tagArray);
            // }
            let poster = await posterServices.createPoster(
                form.data.title,
                form.data.cost,
                form.data.description,
                form.data.date,
                form.data.stock,
                form.data.height,
                form.data.width,
                form.data.mediaproperty_id,
                form.data.tags,
                form.data.image_url
            );

            req.flash("success_messages", `New Poster ${poster.get('title')} has been created`)

            res.redirect('/posters');
        },
        'error': async (form) => {

            console.log(form.data);
            res.render('posters/create', {
                'form': form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }

    })
})

router.get('/:poster_id/update', checkIfAuthenticated, async (req, res) => {
    // retrieve the poster
    const posterId = req.params.poster_id
    const poster = await posterServices.getPosterByID(posterId);

    const allMediaProperties = await posterServices.getAllMediaProperties();

    const allTags = await posterServices.getAllTags();

    const posterForm = createPosterForm(allMediaProperties, allTags);

    // fill in the existing values
    posterForm.fields.title.value = poster.get('title');
    posterForm.fields.cost.value = poster.get('cost');
    posterForm.fields.description.value = poster.get('description');
    posterForm.fields.date.value = new Date().toISOString().split('T')[0],
    posterForm.fields.stock.value = poster.get('stock');
    posterForm.fields.height.value = poster.get('height');
    posterForm.fields.width.value = poster.get('width');
    posterForm.fields.mediaproperty_id.value = poster.get('mediaproperty_id');
    // set the image url in the poster form
    posterForm.fields.image_url.value = poster.get('image_url');

    let selectedTags = await poster.related('tags').pluck('id')

    posterForm.fields.tags.value = selectedTags;

    res.render('posters/update', {
        'form': posterForm.toHTML(bootstrapField),
        'poster': poster.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })

})

router.post('/:poster_id/update', checkIfAuthenticated, async (req, res) => {
    // fetch the poster that we want to update
    const poster = await posterServices.getPosterByID(req.params.poster_id)

    const allMediaProperties = await posterServices.getAllMediaProperties();
    const allTags = await posterServices.getAllTags();

    // process the form
    const posterForm = createPosterForm(allMediaProperties, allTags);
    posterForm.handle(req, {
        'success':async(form) => {
            const {tags, ...posterData} = form.data;
            poster.set(posterData);
            poster.save();

            let tagIds = tags.split(',')
            let existingTagIDs = await poster.related('tags').pluck('id');

            let toRemove = existingTagIDs.filter( id => tagIds.includes(id) === false);

            await poster.tags().detach(toRemove);

            await poster.tags().attach(tagIds);

            req.flash("success_messages", `The Poster ${poster.get('title')} has been updated`)
            res.redirect('/posters');
            
        },
        'error':async (form) => {

            let selectedTags = await poster.related('tags').pluck('id')

            posterForm.fields.tags.value = selectedTags;

            res.render('posters/update', {
                'form':form.toHTML(bootstrapField),
                'poster': poster.toJSON(),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})

router.get('/:poster_id/delete', checkIfAuthenticated, async(req,res)=>{
    // fetch the poster that we want to delete
    const poster = await posterServices.getPosterByID(req.params.poster_id)

    res.render('posters/delete', {
        'poster': poster.toJSON()
    })

});

router.post('/:poster_id/delete', checkIfAuthenticated,async(req,res)=>{
    // fetch the poster that we want to delete
    const poster = await Poster.where({
        'id': req.params.poster_id
    }).fetch({
        require: true
    });
    await poster.destroy();
    res.redirect('/posters')
})

module.exports = router;