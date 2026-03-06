import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_CONFIG } from '../../../../core/api/api-config';
import { apiKeyInterceptor } from '../../../../core/api/api-key.interceptor';
import { DefenseApiService } from './defense-api.service';
import type { StrategyResult, Simulation } from '../models';

describe('DefenseApiService', () => {
  const baseUrl = 'https://localhost:7192';
  const apiKey = 'test-key';
  let service: DefenseApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefenseApiService,
        provideHttpClient(
          withInterceptors([apiKeyInterceptor])
        ),
        provideHttpClientTesting(),
        {
          provide: API_CONFIG,
          useValue: { baseUrl, apiKey },
        },
      ],
    });
    service = TestBed.inject(DefenseApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getOptimalStrategy', () => {
    const mockResult: StrategyResult = {
      totalScore: 100,
      bulletsUsed: 10,
      secondsUsed: 30,
      eliminatedZombies: [
        {
          zombieTypeId: 1,
          type: 'Runner',
          bulletsNeeded: 1,
          shootingTime: 2,
          score: 10,
          threatLevel: 'Low',
          killCount: 5,
        },
      ],
    };

    it('should call GET with bullets and secondsAvailable query params', () => {
      service.getOptimalStrategy(20, 60).subscribe((res) => {
        expect(res).toEqual(mockResult);
      });

      const req = httpMock.expectOne(
        (r) =>
          r.url.startsWith(`${baseUrl}/api/Defense/optimal-strategy`) &&
          r.params.get('bullets') === '20' &&
          r.params.get('secondsAvailable') === '60'
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('X-api-key')).toBe(apiKey);
      req.flush(mockResult);
    });

    it('should return StrategyResult from the API', () => {
      service.getOptimalStrategy(5, 15).subscribe((res) => {
        expect(res.totalScore).toBe(100);
        expect(res.bulletsUsed).toBe(10);
        expect(res.eliminatedZombies).toHaveLength(1);
        expect(res.eliminatedZombies[0].type).toBe('Runner');
      });

      const req = httpMock.expectOne(
        (r) =>
          r.url.startsWith(`${baseUrl}/api/Defense/optimal-strategy`) &&
          r.params.get('bullets') === '5' &&
          r.params.get('secondsAvailable') === '15'
      );
      req.flush(mockResult);
    });
  });

  describe('getSimulations', () => {
    const mockSimulations: Simulation[] = [
      {
        id: 1,
        date: '2025-03-05T12:00:00',
        timeAvailable: 60,
        bulletsAvailable: 20,
        totalScore: 150,
        createdAt: '2025-03-05T12:00:00',
        eliminatedZombies: [],
      },
    ];

    it('should call GET /api/Simulations and return array', () => {
      service.getSimulations().subscribe((list) => {
        expect(list).toEqual(mockSimulations);
        expect(list).toHaveLength(1);
        expect(list[0].totalScore).toBe(150);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/Simulations`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('X-api-key')).toBe(apiKey);
      req.flush(mockSimulations);
    });
  });
});
