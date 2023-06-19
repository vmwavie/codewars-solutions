function getAttendees(peopleInvited, responses){
  let acceptedUsers = [];
  let noIncludeUsers = [];
  
  peopleInvited.forEach((people) => {
    const data = responses.find((x) => x.name === people);
   
    if(data){
      if(data.response === 'accepted') {
        acceptedUsers.push(people)
      }
    }else{
      noIncludeUsers.push(people);
    }
  });
  
  return acceptedUsers.concat(noIncludeUsers)
}