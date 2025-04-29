// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UptimeService } from './uptime.service';

@Controller('health')
export class AppController {
  constructor(private readonly uptimeService: UptimeService) {}

  @Get()
  checkHealth() {
    return this.uptimeService.getCurrentHealthStatus();
  }
}
