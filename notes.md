# Notes

* Naming Queries and data structures

```javascript

 query fetchCompanies{
  apple:company(id:"1")
  {...companyDetails,
    users {
      firstName
    }
  }
  google:company(id:"2")
  {name,
    users {
      firstName
    }
  }
  user(id:"23") {
    firstName
  }
}
```
* query Fragments
define fragment and then use it
reduce the amounts of values we set on th equery , stop repeating.

fragment companyDetails on Company{

}
** Mutations 
this helps to delete or update or Data.

mutation{
  addUser(firstName:"emmanuel",age:22){
     id,firstName,age
  }
}

mutation addCompany {
  addCompany(userId: "23", companyId: "1") {
    company {
      name
    }
  }
}
