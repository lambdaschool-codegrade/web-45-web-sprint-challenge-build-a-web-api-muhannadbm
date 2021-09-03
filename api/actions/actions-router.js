// Write your "actions" router here!
const express = require('express')
const actionRouter = express.Router()
const Action = require('./actions-model')
const {checkId, checkRequired} = require('./actions-middlware')

actionRouter.get('/', async (req,res)=>{
    let actions = await Action.get()
    res.json(actions)
})

actionRouter.get('/:id',checkId, async (req,res)=>{
    let actions = await Action.get(req.params.id)
    res.json(actions)
})



actionRouter.post('/', checkRequired, async(req,res)=>{
    if(req.body["completed"] === undefined){
        req.body.completed = false
    }
    let action = await Action.insert(req.body)
    res.status(201).json(action)
})



actionRouter.put('/:id', checkId, checkRequired,  async(req,res,next)=>{
    if(req.body["completed"] === undefined){
        next({message: "missing required fields", status: 400})
    }
    else{
    let project =await Action.update(req.params.id, req.body)
    res.status(200).json(project)
}
})

actionRouter.delete('/:id', checkId, async(req,res)=>{
    let action = await Action.remove(req.params.id)
    res.status(200).json()
})


// eslint-disable-next-line no-unused-vars
actionRouter.use((err, req, res, next)=> {
    console.log(err.message)
    res.status(err.status || 500).json({message: err.message})
})

module.exports = actionRouter