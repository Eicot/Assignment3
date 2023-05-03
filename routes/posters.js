const express = require("express");
const router = express.Router();

// #1 import in the Product model
const {Poster} = require('../models')
// import in the Forms
const { bootstrapField, createPosterForm } = require('../forms');

router.get('/', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let posters = await Poster.collection().fetch();
    res.render('posters/index', {
        'posters': posters.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/create', async (req, res) => {
    const posterForm = createPosterForm();
    res.render('posters/create',{
        'form': posterForm.toHTML(bootstrapField)
    })
})

router.post('/create', async(req,res)=>{
    const posterForm = createPosterForm();
    posterForm.handle(req, {
        'success': async (form) => {
            const poster = new Poster();
            poster.set('title', form.data.title);
            poster.set('cost', form.data.cost);
            poster.set('description', form.data.description);
            poster.set('date', form.data.date);
            poster.set('stock', form.data.stock);
            poster.set('height', form.data.height);
            poster.set('width', form.data.width);
            await poster.save();
            res.redirect('/posters');
        },
        'error': async (form) => {
            res.render('posters/create', {
                'form': form.toHTML(bootstrapField)
            })
        }

    })
})

module.exports = router;