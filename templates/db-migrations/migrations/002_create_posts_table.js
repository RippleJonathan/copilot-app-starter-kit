// Create posts table migration (example of related table)
module.exports = {
  up: async (db) => {
    const dbType = process.env.DB_TYPE || '{{DB_TYPE}}';
    
    let sql;
    if (dbType === 'postgres') {
      sql = `
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          content TEXT,
          status VARCHAR(50) DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } else if (dbType === 'mysql') {
      sql = `
        CREATE TABLE posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          title VARCHAR(255) NOT NULL,
          content TEXT,
          status VARCHAR(50) DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `;
    } else { // sqlite
      sql = `
        CREATE TABLE posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          title TEXT NOT NULL,
          content TEXT,
          status TEXT DEFAULT 'draft',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `;
    }
    
    await db.execute(sql);
    console.log('✅ Created posts table');
  },
  
  down: async (db) => {
    await db.execute('DROP TABLE posts');
    console.log('✅ Dropped posts table');
  }
};