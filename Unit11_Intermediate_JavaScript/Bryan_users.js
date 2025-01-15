const users = [
  { firstName: "Alice", lastName: "Johnson", points: 120 },
  { firstName: "Bob", lastName: "Smith", points: 99 },
  { firstName: "Charlie", lastName: "Brown", points: 180 },
];

//

const info = users.map(function (member) {
  const name = `${member.firstName} ${member.lastName}`;

  return {
    name,
    membershipStatus: member.points > 100 ? "Premium" : "Standard",
  };
});
