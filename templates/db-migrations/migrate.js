require('dotenv').config();
const { getDatabase, initializeDatabase } = require('./database');

// Migration runner
class MigrationRunner {
  constructor() {
    this.db = null;
  }

  async initialize() {
    this.db = await getDatabase();
    await initializeDatabase();
  }

  async getMigrations() {
    const fs = require('fs').promises;
    const path = require('path');
    
    const migrationFiles = await fs.readdir('./migrations');
    const migrations = [];
    
    for (const file of migrationFiles.sort()) {
      if (file.endsWith('.js')) {
        const migration = require(path.join('./migrations', file));
        migrations.push({
          file,
          name: file.replace('.js', ''),
          ...migration
        });
      }
    }
    
    return migrations;
  }

  async getAppliedMigrations() {
    try {
      const rows = await this.db.all('SELECT * FROM migrations ORDER BY applied_at');
      return rows.map(row => row.name);
    } catch (error) {
      // Migrations table doesn't exist yet
      return [];
    }
  }

  async applyMigration(migration) {
    console.log(`Applying migration: ${migration.name}`);
    
    try {
      await this.db.run('BEGIN TRANSACTION');
      await migration.up(this.db);
      await this.db.run(
        'INSERT INTO migrations (name, applied_at) VALUES (?, ?)',
        [migration.name, new Date().toISOString()]
      );
      await this.db.run('COMMIT');
      console.log(`✅ Applied: ${migration.name}`);
    } catch (error) {
      await this.db.run('ROLLBACK');
      console.error(`❌ Failed to apply ${migration.name}:`, error.message);
      throw error;
    }
  }

  async rollbackMigration(migration) {
    console.log(`Rolling back migration: ${migration.name}`);
    
    try {
      await this.db.run('BEGIN TRANSACTION');
      await migration.down(this.db);
      await this.db.run('DELETE FROM migrations WHERE name = ?', [migration.name]);
      await this.db.run('COMMIT');
      console.log(`✅ Rolled back: ${migration.name}`);
    } catch (error) {
      await this.db.run('ROLLBACK');
      console.error(`❌ Failed to rollback ${migration.name}:`, error.message);
      throw error;
    }
  }

  async migrate() {
    const migrations = await this.getMigrations();
    const appliedMigrations = await this.getAppliedMigrations();
    
    let appliedCount = 0;
    
    for (const migration of migrations) {
      if (!appliedMigrations.includes(migration.name)) {
        await this.applyMigration(migration);
        appliedCount++;
      }
    }
    
    if (appliedCount === 0) {
      console.log('📊 No pending migrations');
    } else {
      console.log(`📊 Applied ${appliedCount} migration(s)`);
    }
  }

  async reset() {
    console.log('🔄 Resetting database...');
    
    // Get all applied migrations in reverse order
    const migrations = await this.getMigrations();
    const appliedMigrations = await this.getAppliedMigrations();
    
    // Rollback all migrations
    for (const migration of migrations.reverse()) {
      if (appliedMigrations.includes(migration.name)) {
        await this.rollbackMigration(migration);
      }
    }
    
    console.log('✅ Database reset complete');
  }

  async status() {
    const migrations = await this.getMigrations();
    const appliedMigrations = await this.getAppliedMigrations();
    
    console.log('\n📊 Migration Status:\n');
    
    if (migrations.length === 0) {
      console.log('No migrations found');
      return;
    }
    
    for (const migration of migrations) {
      const isApplied = appliedMigrations.includes(migration.name);
      const status = isApplied ? '✅ Applied' : '⏳ Pending';
      console.log(`${status} - ${migration.name}`);
    }
    
    const pendingCount = migrations.length - appliedMigrations.length;
    console.log(`\nTotal: ${migrations.length}, Applied: ${appliedMigrations.length}, Pending: ${pendingCount}`);
  }

  async close() {
    if (this.db) {
      await this.db.close();
    }
  }
}

// CLI interface
async function main() {
  const runner = new MigrationRunner();
  
  try {
    await runner.initialize();
    
    const command = process.argv[2] || 'migrate';
    
    switch (command) {
      case '--status':
      case 'status':
        await runner.status();
        break;
        
      case '--reset':
      case 'reset':
        await runner.reset();
        break;
        
      case 'migrate':
      default:
        await runner.migrate();
        break;
    }
    
  } catch (error) {
    console.error('Migration error:', error.message);
    process.exit(1);
  } finally {
    await runner.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { MigrationRunner };