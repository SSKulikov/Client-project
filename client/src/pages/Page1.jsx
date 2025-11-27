import React from "react";

function Page1({ properties, user }) {
  console.log(properties);
  const filteredProperties = properties.filter((el) => user.id === el.userId);
  console.log(user);
  
  console.log(filteredProperties);
  
  return <div>Page1</div>;
}

export default Page1;
