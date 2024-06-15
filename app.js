const express=require('express')
const app=express()
const cors = require('cors'); 

const PORT=4090
app.use(express.json())
app.use(cors()); 

let indexEditar=null

let indexViewVenda=null

const computadoresAVenda=[
   
]

const users=[
    {
        nome:"Funcionario",
        senha:"1234",
        telefone:"38728347",
        email:"kdslkfn@bla.com",
        funcionario:true
    },{
        nome:"Joao",
        senha:"1234",
        telefone:"38728347",
        email:"kdslkfn@gmail.com",
        funcionario:false
    }
]

const computadoresEmManutencao=[

]

let userLogado=null


app.listen(PORT,()=>{
    console.log("O servidor está rodando em http://localhost:4090")
})

app.post('/cadastro-info-user',async (req,res)=>{
    try{
        const userInfo=req.body
        console.log(userInfo)

        users.push(userInfo)
        console.log(users)

        res.sendStatus(200)
    }catch(error){
        console.log(error)
    }
    
    
})

app.get('/',(req,res)=>{
    let userEncontrado=false
    try{
        const {nome,senha}=req.query;
        console.log(nome, senha)
        for(const user of users){
            if(nome==user.nome && senha==user.senha){
                userEncontrado=true
                console.log(user)
                userLogado=user
                res.json(user)
                break
                
            }
        }
        if(!userEncontrado){
            res.sendStatus(404)
        }
    }catch(error){
        console.log(error)
    }
        
})

app.get('/home-funcionario',(req,res)=>{
 
    try{
        console.log(userLogado)
        res.json(userLogado)
    }catch(error){
        console.log(error)
    }
})

app.post('/add-novo-computador-para-manutencao',(req,res)=>{
    try{
        const novaManutencao=req.body
        console.log(novaManutencao)
        computadoresEmManutencao.push(novaManutencao)
        res.sendStatus(200)
    }catch(error){
         console.log(error);
        res.status(400)
       
    }
})

app.get('/manutencoes-funcionario',(req,res)=>{
    if(computadoresEmManutencao){
        try{
            res.json(computadoresEmManutencao)
        }catch(error){
             console.log(error);
            res.sendStatus(404)
           
        }
    }
})

app.post('/editar-info-computador',(req,res)=>{
    try{
        const index=req.body.index
        indexEditar=index
        console.log(index)
        res.sendStatus(200)
    }catch(error){

        console.log(error);
        
    }
   
})

app.get('/editar-info-computador',(req,res)=>{
    try{    
        res.json(computadoresEmManutencao[indexEditar])

    }catch(error){
        
        console.log(error)
        res.sendStatus(404)
    }
})

app.post('/atualizar-infos',(req,res)=>{
    try{
        const computadorEditado=req.body
        console.log(computadorEditado)
        
        computadoresEmManutencao[indexEditar]=computadorEditado
     
        console.log(computadoresEmManutencao[indexEditar])
        console.log(computadoresEmManutencao)
        res.sendStatus(200)
    }catch{
        console.log(error)
        res.sendStatus(400)
    }
})

app.delete('/deletar-computador/:index',(req,res)=>{
    const index=parseInt(req.params.index,10)
    
    computadoresEmManutencao.splice(index,1)
    res.sendStatus(200)
})
app.get('/perfil-info', (req,res)=>{
    try{
        console.log(userLogado)
        res.json(userLogado)
    }catch{
        console.log(error)
        res.sendStatus(400)
    }
})
app.get('/listagem-computadoresAVenda',(req,res)=>{
    try{
        res.json(computadoresAVenda)
        console.log(computadoresAVenda)
    }catch{
        console.log(error)
        res.sendStatus(404)
    }
})
app.post('/add-nova-venda',(req,res)=>{
    try {
        const novaVenda=req.body
        console.log(novaVenda)
        computadoresAVenda.push(novaVenda)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})
app.post('/atualizar-index-computador-info/:id', (req,res)=>{
    try {
        const index=parseInt(req.params.id)
        console.log(index)
        indexViewVenda=index
        console.log(indexViewVenda)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})
app.get('/pegar-infos-venda',(req,res)=>{
    const infoVenda=computadoresAVenda[indexViewVenda]
    try {
        res.json(infoVenda)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})
app.delete('/excluir-venda',(req,res)=>{
    
    try {
        console.log("oi")
        computadoresAVenda.splice(indexViewVenda,1)
        console.log(computadoresAVenda)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})
app.get('/pegar-info-para-editar',(req,res)=>{
    console.log(indexViewVenda)
    try {
        
        res.json(computadoresAVenda[indexViewVenda])
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})
app.post('/computador-editado',(req,res)=>{
    try {
        const computadorEditado=req.body
        console.log(req.body)
        computadoresAVenda[indexViewVenda]=computadorEditado
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})
app.post('/mudar-cargo/:id',(req,res)=>{
    try {
        const index=req.params.id
        if(users[index].funcionario){
            users[index].funcionario=false
        }else{
            users[index].funcionario=true
        }
        console.log(users[index].funcionario)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})
app.get('/contas-cadastradas',(req,res)=>{
    try {
        res.json(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})