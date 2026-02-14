const users = [
  { id: 1, name: "Anna", age: 22, city: "Moscow", isActive: true },
  { id: 2, name: "Oleg", age: 17, city: "Kazan", isActive: false },
  { id: 3, name: "Ivan", age: 30, city: "Moscow", isActive: true },
  { id: 4, name: "Maria", age: 25, city: "Sochi", isActive: false }
];

function getActiveUsers(usersArray) {
  return usersArray.filter(user => user.isActive === true);
}

const getUserNames = (usersArray) => {
  return usersArray.map(user => user.name);
};

function findUserById(usersArray, id) {
  const foundUser = usersArray.find(user => user.id === id);
  return foundUser !== undefined ? foundUser : null;
}

function getUsersStatistics(usersArray) {
  const active = usersArray.filter(user => user.isActive === true).length;
  
  return {
    total: usersArray.length,
    active: active,
    inactive: usersArray.length - active
  };
}

function getAverageAge(usersArray) {
  const totalAge = usersArray.reduce((sum, user) => sum + user.age, 0);
  return totalAge / usersArray.length;
}


function groupUsersByCity(usersArray) {
  return usersArray.reduce((result, user) => {

    if (!result[user.city]) {
      result[user.city] = [];
    }

    result[user.city].push(user);
    return result;
  }, {});
}


console.log('Активные пользователи:', getActiveUsers(users));
console.log('Имена пользователей:', getUserNames(users));
console.log('Пользователь с id 3:', findUserById(users, 3));
console.log('Пользователь с id 10:', findUserById(users, 10)); // null
console.log('Статистика:', getUsersStatistics(users));
console.log('Средний возраст:', getAverageAge(users));
console.log('Группировка по городам:', groupUsersByCity(users));