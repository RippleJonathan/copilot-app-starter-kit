const { MigrationRunner } = require('../migrate');
const { SeederRunner } = require('../seed');
const { closeDatabase } = require('../database');

// Mock environment for testing
process.env.DB_TYPE = 'sqlite';
process.env.DB_PATH = ':memory:'; // In-memory database for tests

describe('Database Migrations', () => {
  let runner;

  beforeEach(async () => {
    runner = new MigrationRunner();
    await runner.initialize();
  });

  afterEach(async () => {
    await runner.close();
    await closeDatabase();
  });

  describe('Migration System', () => {
    test('should initialize migrations table', async () => {
      const migrations = await runner.db.all('SELECT name FROM sqlite_master WHERE type="table" AND name="migrations"');
      expect(migrations).toHaveLength(1);
    });

    test('should run migrations', async () => {
      await runner.migrate();
      
      // Check that users table exists
      const tables = await runner.db.all('SELECT name FROM sqlite_master WHERE type="table" AND name="users"');
      expect(tables).toHaveLength(1);
    });

    test('should track applied migrations', async () => {
      await runner.migrate();
      
      const appliedMigrations = await runner.getAppliedMigrations();
      expect(appliedMigrations).toContain('001_create_users_table');
    });

    test('should not re-run applied migrations', async () => {
      await runner.migrate();
      const firstRun = await runner.getAppliedMigrations();
      
      await runner.migrate();
      const secondRun = await runner.getAppliedMigrations();
      
      expect(firstRun).toEqual(secondRun);
    });
  });

  describe('Database Schema', () => {
    beforeEach(async () => {
      await runner.migrate();
    });

    test('should create users table with correct structure', async () => {
      const tableInfo = await runner.db.all('PRAGMA table_info(users)');
      const columnNames = tableInfo.map(col => col.name);
      
      expect(columnNames).toContain('id');
      expect(columnNames).toContain('email');
      expect(columnNames).toContain('name');
      expect(columnNames).toContain('created_at');
    });

    test('should create posts table with foreign key', async () => {
      const tableInfo = await runner.db.all('PRAGMA table_info(posts)');
      const columnNames = tableInfo.map(col => col.name);
      
      expect(columnNames).toContain('id');
      expect(columnNames).toContain('user_id');
      expect(columnNames).toContain('title');
      expect(columnNames).toContain('content');
    });
  });

  describe('Data Seeding', () => {
    beforeEach(async () => {
      await runner.migrate();
    });

    test('should seed users table', async () => {
      const seeder = new SeederRunner();
      await seeder.initialize();
      await seeder.seed();
      
      const users = await seeder.db.all('SELECT * FROM users');
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('email');
      expect(users[0]).toHaveProperty('name');
      
      await seeder.close();
    });

    test('should seed posts table with user relationships', async () => {
      const seeder = new SeederRunner();
      await seeder.initialize();
      await seeder.seed();
      
      const posts = await seeder.db.all('SELECT * FROM posts');
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('user_id');
      expect(posts[0]).toHaveProperty('title');
      
      await seeder.close();
    });
  });
});