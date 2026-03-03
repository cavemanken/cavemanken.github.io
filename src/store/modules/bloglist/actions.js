export default {
  async getBlogListItems(context, payload) {
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const blogListItems = [];

    for (const key in responseData) {
      const blogListItem = {
        key: key,
        title: responseData[key].title,
        date: responseData[key].date,
        comments: responseData[key].comments,
      };
      blogListItems.push(blogListItem);
    }

    context.commit('setBlogListItems', blogListItems);
  },
  async updateBlogListItem(context, payload) {
    console.log('async updateBlogListItem...', payload);
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}/${payload.key}.json?auth=${context.rootGetters.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: payload.title,
          date: payload.date,
          comments: payload.comments,
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
  async createBlogListItem(context, payload) {
    console.log('async createBlogListItem...', payload);
    const link = `${payload.firebaseProjectLink}${payload.dbName}.json?auth=${context.rootGetters.token}`;
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: payload.title,
        date: payload.date,
        comments: payload.comments,
      }),
    });
    const responseData = await response.json();
    console.log('response.ok', response.ok);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to create!');
      throw error;
    }
  },
  async deleteBlogListItem(context, payload) {
    console.log(
      'async deleteBlogListItem...',
      payload,
      context.rootGetters.token
    );
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}/${payload.key}.json?auth=${context.rootGetters.token}`,
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
