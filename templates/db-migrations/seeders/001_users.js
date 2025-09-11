// Seed users table with sample data
module.exports = {
  seed: async (db) => {
    console.log('🌱 Seeding users...');
    
    const users = [
      {
        email: 'admin@example.com',
        name: 'Admin User',
        password_hash: '$2b$10$example.hash.for.password123' // bcrypt hash
      },
      {
        email: 'john@example.com', 
        name: 'John Doe',
        password_hash: '$2b$10$example.hash.for.password456'
      },
      {
        email: 'jane@example.com',
        name: 'Jane Smith', 
        password_hash: '$2b$10$example.hash.for.password789'
      }
    ];
    
    for (const user of users) {
      await db.run(
        'INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)',
        [user.email, user.name, user.password_hash]
      );
    }
    
    console.log(`✅ Seeded ${users.length} users`);
  }
};