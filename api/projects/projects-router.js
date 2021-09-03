// Write your "projects" router here!
const express = require("express")
const router = express.Router()
const Project = require('./projects-model')
const {checkId, checkRequired} = require('./projects-middleware')

router.get('/', async(req,res)=>{
  let projects = await Project.get()
res.json(projects)
})
router.get('/:id',checkId, async(req,res)=>{
    let projects = req.project
  res.json(projects)
  })

router.post('/', checkRequired, async(req,res)=>{
    if(req.body["completed"] === undefined){
        req.body.completed = false
    }
    let project = await Project.insert(req.body)
    res.status(201).json(project)
})

router.delete('/:id', checkId, async(req,res)=>{
    let project = await Project.remove(req.params.id)
    res.status(200).json()
})

router.put('/:id', checkId, checkRequired,  async(req,res,next)=>{
    if(req.body["completed"] === undefined){
        next({message: "missing required fields", status: 400})
    }
    else{
    let project =await Project.update(req.params.id, req.body)
    res.status(200).json(project)
}
})

router.get('/:id/actions',checkId, async (req,res)=>{
   let actions = await Project.getProjectActions(req.params.id)
   res.status(200).json(actions)
})

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next)=> {
    console.log(err.message)
    res.status(err.status || 500).json({message: err.message})
})


module.exports = router