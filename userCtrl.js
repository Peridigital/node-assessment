var usersMod = require('./users.js')

module.exports = {
  logIt: function() {
    console.log('Yo yo yo');

  },
  readAll: function() {
    var users = usersMod.find()
    return users

  },
  findUserById: function(id) {
    id = parseInt(id)
    var user = usersMod.findOne('id', id )
    if (!user) {
      user = null
    }

    return user

  },
  getAdmins: function() {
    var users = usersMod.find('type', 'admin')
    if (!users) {
      users = null
    }
    return users


  },
  getNonAdmins: function() {
    var users = usersMod.find('type', 'user')
    if (!users) {
      users = null
    }
    return users


  },
  getUsersByFavorite: function(favorite) {
    var allUsers = usersMod.find()
    var users = [];
    for (var i = 0; i < allUsers.length; i++) {
      for (var j = 0; j < allUsers[i].favorites.length; j++) {
        if (allUsers[i].favorites[j] === favorite) {
          users.push(allUsers[i])
        }
      }
    }

    if (users.length == 0) {
      users = null
    }
    return users


  },
  getUsersByAgeLimit: function(age) {
    var allUsers = usersMod.find()
    var users = [];

    for (var i = 0; i < allUsers.length; i++) {

        if (allUsers[i].age <= age) {
          users.push(allUsers[i])
        }

    }

    if (users.length == 0) {
      users = null
    }
    return users


  },
  findUserByQuery: function(query, value) {
    if (query == 'last_name') {
      var users = usersMod.find('last_name', value)
      if (!users) {
        users = null
      }
      return users
    } else if (query == 'email') {
      console.log('inside email');
      var users = usersMod.find('email', value)
      if (!users) {
        return null
      }
      return users
    } else if (query == 'state') {
      var users = usersMod.find('state', value)
      if (!users) {
        users = null
      }
      return users
    }


  },
  createUser: function (user) {
    var user = usersMod.add(user)
    return user

  },
  updateUser: function (id, updates) {
    usersMod.update('id', id, updates)
    user = usersMod.find('id', id)
    console.log(user);
    return user
  },



  removeUser: function (id) {
    user = usersMod.find('id', id)
    usersMod.remove('id', id)
    return user
  }




}
