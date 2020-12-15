import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return the API info', () => {
      const response = {
        name: 'Oyster API',
        version: '1.0.0',
      };
      jest.spyOn(appService, 'getInfo').mockImplementation(() => response);
      expect(appController.getInfo()).toEqual(response);
    });
  });
});
