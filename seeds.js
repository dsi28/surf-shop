const faker = require('faker'),
Post = require('./models/post');

async function seedPosts(){
    await Post.remove({});
    for (const i of new Array(40)) {
        const post = {
            title: faker.lorem.text(),
            desc: faker.lorem.text(),
            coordinates: [-122.0842499, 37.4224764],
            author: {
                '_id' : '5cba0db661e67e39887cb3e9',
                'username' : '1',
            }
        }
        await Post.create(post);
    }
    console.log(`40 new post created`);
}
module.exports = seedPosts;