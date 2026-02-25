export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
  async getMenuItems(context, payload) {
    // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //   console.log('returning...');
    //   return;
    // }
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const menuItems = [];

    for (const key in responseData) {
      const menuItem = {
        key: key,
        link: responseData[key].link,
        linkDesc: responseData[key].linkDesc,
        target: responseData[key].target,
      };
      menuItems.push(menuItem);
    }

    context.commit('setMenuItems', menuItems);
    context.commit('setFetchTimestamp');
  },
  async updateMenuItem(context, payload) {
    console.log('async updateMenuItem...', payload);
    console.log('token');
    console.log(localStorage.token);
    // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //   console.log('returning...');
    //   return;
    // }
    console.log('here');
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}/${payload.key}.json?auth=${localStorage.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: payload.link,
          linkDesc: payload.linkDesc,
          target: payload.target,
        }),
      }
    );
    const responseData = await response.json();
    console.log('response.ok', response.ok);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update!');
      throw error;
    }
  },
  async createMenuItem(context, payload) {
    console.log('async createMenuItem...', payload);
    // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //   console.log('returning...');
    //   return;
    // }
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}.json?auth=${localStorage.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: payload.link,
          linkDesc: payload.linkDesc,
          target: payload.target,
        }),
      }
    );
    const responseData = await response.json();
    console.log('response.ok', response.ok);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to create!');
      throw error;
    }
  },
  async deleteMenuItem(context, payload) {
    console.log('async deleteMenuItem...', payload);
    // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //   console.log('returning...');
    //   return;
    // }
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}/${payload.key}.json?auth=${localStorage.token}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseData = await response.json();
    console.log('response.ok', response.ok);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to delete!');
      throw error;
    }
  },
};
