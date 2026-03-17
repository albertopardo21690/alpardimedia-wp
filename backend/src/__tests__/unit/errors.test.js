const {
  AppError, ValidationError, AuthError,
  ForbiddenError, NotFoundError, ConflictError
} = require('../../utils/errors');

describe('AppError', () => {
  test('crea error con mensaje y statusCode', () => {
    const err = new AppError('Error de prueba', 400, 'TEST_ERROR');
    expect(err.message).toBe('Error de prueba');
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('TEST_ERROR');
    expect(err.isOperational).toBe(true);
  });

  test('valores por defecto correctos', () => {
    const err = new AppError('Error');
    expect(err.statusCode).toBe(500);
    expect(err.code).toBe('INTERNAL_ERROR');
  });
});

describe('ValidationError', () => {
  test('statusCode 400 y fields', () => {
    const fields = [{ field: 'email', message: 'Email inválido' }];
    const err    = new ValidationError('Datos inválidos', fields);
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.fields).toEqual(fields);
  });
});

describe('AuthError', () => {
  test('statusCode 401', () => {
    const err = new AuthError();
    expect(err.statusCode).toBe(401);
    expect(err.code).toBe('AUTH_ERROR');
    expect(err.message).toBe('No autorizado');
  });
});

describe('NotFoundError', () => {
  test('statusCode 404 con recurso', () => {
    const err = new NotFoundError('Proyecto');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Proyecto no encontrado');
  });
});

describe('ConflictError', () => {
  test('statusCode 409', () => {
    const err = new ConflictError('Ya existe');
    expect(err.statusCode).toBe(409);
    expect(err.code).toBe('CONFLICT');
  });
});
