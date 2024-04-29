import { AuthController } from './auth.controller';
import initApp from 'test/helpers/init-app';

describe('AuthController', () => {
  let authController: AuthController;
  let app;

  beforeAll(async () => {
    app = await initApp();

    authController = app.get(AuthController);
  });

  describe('register', () => {
    let authToken: string;

    it('should register user and return id and tokens', async () => {
      const response = await authController.register({ addCoins: true });

      authToken = response.authToken;

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('authToken');
      expect(response).toHaveProperty('accessToken');
    });

    describe('login', () => {
      it('should return an accessToken', async () => {
        const response = await authController.login({ authToken });

        expect(typeof response).toBe('string');
      });
    });
  });
});