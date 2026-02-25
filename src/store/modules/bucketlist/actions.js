export default {
  async getBucketListItems(context, payload) {
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const bucketListItems = [];

    for (const key in responseData) {
      const bucketListItem = {
        key: key,
        desc: responseData[key].desc,
        goalDate: responseData[key].goalDate,
        completedDate: responseData[key].completedDate,
        comments: responseData[key].comments,
      };
      bucketListItems.push(bucketListItem);
    }

    context.commit('setBucketListItems', bucketListItems);
  },
  async updateBucketListItem(context, payload) {
    console.log('async updateBucketListItem...', payload);
    console.log('token');
    console.log(localStorage.token);
    console.log('here');
    const response = await fetch(
      `${payload.firebaseProjectLink}${payload.dbName}/${payload.key}.json?auth=${localStorage.token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          desc: payload.desc,
          goalDate: payload.goalDate,
          completedDate: payload.completedDate,
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
  async createBucketListItem(context, payload) {
    console.log('async createBucketListItem...', payload);
    const link = `${payload.firebaseProjectLink}${payload.dbName}.json?auth=${localStorage.token}`;
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        desc: payload.desc,
        goalDate: payload.goalDate,
        completedDate: payload.completedDate,
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
  async deleteBucketListItem(context, payload) {
    console.log('async deleteBucketListItem...', payload, localStorage.token);
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
