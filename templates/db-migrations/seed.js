require('dotenv').config();
const { getDatabase } = require('./database');

// Seeder runner
class SeederRunner {
  constructor() {
    this.db = null;
  }

  async initialize() {
    this.db = await getDatabase();
  }

  async getSeeders() {
    const fs = require('fs').promises;
    const path = require('path');
    
    try {
      const seederFiles = await fs.readdir('./seeders');
      const seeders = [];
      
      for (const file of seederFiles.sort()) {
        if (file.endsWith('.js')) {
          const seeder = require(path.join('./seeders', file));
          seeders.push({
            file,
            name: file.replace('.js', ''),
            ...seeder
          });
        }
      }
      
      return seeders;
    } catch (error) {
      console.log('No seeders directory found, skipping...');
      return [];
    }
  }

  async runSeeder(seeder) {
    console.log(`Running seeder: ${seeder.name}`);
    
    try {
      await this.db.run('BEGIN TRANSACTION');
      await seeder.seed(this.db);
      await this.db.run('COMMIT');
      console.log(`✅ Seeded: ${seeder.name}`);
    } catch (error) {
      await this.db.run('ROLLBACK');
      console.error(`❌ Failed to seed ${seeder.name}:`, error.message);
      throw error;
    }
  }

  async seed() {
    const seeders = await this.getSeeders();
    
    if (seeders.length === 0) {
      console.log('📊 No seeders found');
      return;
    }
    
    for (const seeder of seeders) {
      await this.runSeeder(seeder);
    }
    
    console.log(`📊 Ran ${seeders.length} seeder(s)`);
  }

  async close() {
    if (this.db) {
      await this.db.close();
    }
  }
}

// CLI interface
async function main() {
  const runner = new SeederRunner();
  
  try {
    await runner.initialize();
    await runner.seed();
  } catch (error) {
    console.error('Seeder error:', error.message);
    process.exit(1);
  } finally {
    await runner.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { SeederRunner };