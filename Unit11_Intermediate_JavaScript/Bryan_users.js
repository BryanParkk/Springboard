const users = [
  { firstName: "Alice", lastName: "Johnson", points: 120 },
  { firstName: "Bob", lastName: "Smith", points: 99 },
  { firstName: "Charlie", lastName: "Brown", points: 180 },
];

//

const info = users.map(function (member, idx) {
  const name = `${member.firstName} ${member.lastName}`;
  const points = member.points;

  for (let i = 0; i < member.length; i++) {
    if (points >= 100) {
      users.forEach((users) => {
        users.membershipStatus = "Premium";
      });
    } else {
      users.forEach((users) => {
        users.membershipStatus = "Standard";
      });
    }
  }
  return console.log(name, points, membershipStatus);
});
