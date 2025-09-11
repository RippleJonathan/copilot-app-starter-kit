// Seed posts table with sample data
module.exports = {
  seed: async (db) => {
    console.log('🌱 Seeding posts...');
    
    // Get user IDs first
    const users = await db.all('SELECT id FROM users');
    
    if (users.length === 0) {
      console.log('⚠️ No users found, skipping posts seeding');
      return;
    }
    
    const posts = [
      {
        user_id: users[0].id,
        title: 'Welcome to {{PROJECT_NAME}}',
        content: 'This is the first post in our database! 🎉',
        status: 'published'
      },
      {
        user_id: users[1]?.id || users[0].id,
        title: 'Database Migrations Made Easy',
        content: 'With this migration system, managing your database schema is simple and reliable.',
        status: 'published'
      },
      {
        user_id: users[2]?.id || users[0].id,
        title: 'Draft Post Example',
        content: 'This post is still in draft status and not visible to public.',
        status: 'draft'
      }
    ];
    
    for (const post of posts) {
      await db.run(
        'INSERT INTO posts (user_id, title, content, status) VALUES (?, ?, ?, ?)',
        [post.user_id, post.title, post.content, post.status]
      );
    }
    
    console.log(`✅ Seeded ${posts.length} posts`);
  }
};