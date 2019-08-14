const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const _port =4000;
 
const app= express();

app.use('/graphql',expressGraphQL({
    schema,
    graphiql:true
}));
//its a development tool and its only intended for development enviroment

app.get('/hi',(req,res)=>{
  return  console.log('hellofromWork23');
    
})
app.listen(_port,()=>{
    console.log('listening !!')
})