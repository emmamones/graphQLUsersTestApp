const express = require('express');
const expressGraphQL = require('express-graphql');
const _port =4000;


const app= express();

app.use('/graphql',expressGraphQL({
    graphiql:true
}));
//its a development tool and its only intended for development enviroment

app.get('/hi',(req,res)=>{
  return  console.log('hellows');
    
})
app.listen(_port,()=>{
    console.log('listening')
})