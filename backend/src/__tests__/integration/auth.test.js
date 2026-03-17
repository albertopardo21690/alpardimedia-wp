const request = require('supertest');
const express = require('express');
const cors    = require('cors');
require('dotenv').config();

// App de test sin rate limit
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',     require('../../routes/auth.routes'));
app.use('/api/projects', require('../../routes/projects.routes'));
const { errorHandler, notFoundHandler } = require('../../middleware/error.middleware');
app.use(notFoundHandler);
app.use(errorHandler);

const db = require('../../config/db');

// Usuario de prueba único por ejecución
const testEmail = `test_${Date.now()}@alpardimedia.com`;
let authToken = '';

afterAll(async () => {
  // Limpiar usuario de prueba
  await db.query('DELETE FROM users WHERE email = ?', [testEmail]);
  await db.end?.();
});

describe('POST /api/auth/register', () => {
  test('registra usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: testEmail, password: 'Test1234' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testEmail);
    authToken = res.body.token;
  });

  test('falla con email duplicado', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: testEmail, password: 'Test1234' });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  test('falla con datos inválidos', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: '', email: 'noemail', password: '123' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('fields');
  });

  test('falla sin body', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(res.status).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  test('login correcto devuelve token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'Test1234' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testEmail);
  });

  test('falla con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'WrongPass99' });

    expect(res.status).toBe(401);
  });

  test('falla con email inexistente', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: 'Test1234' });

    expect(res.status).toBe(401);
  });
});

describe('GET /api/projects', () => {
  test('requiere autenticación', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(401);
  });

  test('devuelve proyectos con token válido', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/projects', () => {
  let projectId = null;

  test('crea proyecto correctamente', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Proyecto Test', description: 'Descripción test' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Proyecto Test');
    projectId = res.body.id;
  });

  test('falla sin nombre', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ description: 'Sin nombre' });

    expect(res.status).toBe(400);
  });

  test('elimina proyecto correctamente', async () => {
    if (!projectId) return;
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
  });
});

describe('Rutas no existentes', () => {
  test('devuelve 404 para ruta desconocida', async () => {
    const res = await request(app).get('/api/ruta-inexistente');
    expect(res.status).toBe(404);
  });
});
