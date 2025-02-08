const express = require('express');
const router = express.Router();

// Get all todos for logged-in user
router.get('/', (req, res) => {

});

// Create a new todo
router.post('/', (req, res) => {

});

// Update a todo
router.put('/:id', (req, res) => {
   const { id } = req.body;
});


// Delete a todo
router.delete('/:id', (req,res) => {
    
})

module.exports = router;