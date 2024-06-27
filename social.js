// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    const userID = ++this.currentID;
    this.users[userID] = { "id": userID, "name": name };
    this.follows[userID] = new Set();
    return userID;
  }

  getUser(userID) {
    // Your code here
    if (this.users[userID]) return this.users[userID];
    return null;
  }

  follow(userID1, userID2) {
    // Your code here
    const follower = this.getUser(userID1);
    const followee = this.getUser(userID2);

    if (!follower || !followee) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    const rv = new Set();
    for (const userKey in this.users) {
      const user = this.users[userKey];
      if (this.follows[user.id].has(userID)) rv.add(user.id)
    }
    return rv;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    const queue = [[userID]];
    const visited = new Set([userID]);
    const toFollow = [];

    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.length - 1 > degrees) break;
      const last = curr[curr.length - 1];

      for (const id of this.follows[last]) {
        if (!visited.has(id)) {
          queue.push(curr.concat(id));
          visited.add(id);
          if (!this.follows[userID].has(id)) toFollow.push(id);
        }
      }
    }
    return toFollow;
  }
}

module.exports = SocialNetwork;
